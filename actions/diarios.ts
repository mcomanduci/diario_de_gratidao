"use server";

import { and, desc, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { diario } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  CLOUDINARY_URL_PREFIX,
  MAX_DESCRIPTION_LENGTH,
  MAX_SEARCH_LENGTH,
  MAX_TITLE_LENGTH,
  UUID_REGEX,
} from "@/lib/constants";

const diarioSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Título é obrigatório")
    .max(MAX_TITLE_LENGTH, "Título muito longo")
    .refine((val) => val.length > 0, "Título não pode ser apenas espaços"),
  description: z
    .string()
    .trim()
    .min(1, "Descrição é obrigatória")
    .max(MAX_DESCRIPTION_LENGTH, "Descrição muito longa")
    .refine((val) => val.length > 0, "Descrição não pode ser apenas espaços"),
  type: z.enum(["Família", "Trabalho", "Religioso", "Outros"]),
  image: z
    .string()
    .url("URL de imagem inválida")
    .refine(
      (url) => url.startsWith(CLOUDINARY_URL_PREFIX),
      "URL de imagem deve ser do Cloudinary",
    ),
});

export async function getDiarios(filters?: {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  try {
    // Valida filtros de entrada
    if (filters?.search && filters.search.length > MAX_SEARCH_LENGTH) {
      return {
        success: false,
        error: "Busca muito longa",
        diarios: [],
        total: 0,
      };
    }

    if (filters?.limit && (filters.limit < 1 || filters.limit > 100)) {
      return {
        success: false,
        error: "Limite inválido",
        diarios: [],
        total: 0,
      };
    }

    if (filters?.page && filters.page < 1) {
      return {
        success: false,
        error: "Página inválida",
        diarios: [],
        total: 0,
      };
    }

    // Pega usuário autenticado
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Não autenticado",
        diarios: [],
        total: 0,
      };
    }

    const conditions = [eq(diario.userId, session.user.id)];

    // Filtro por busca (título) - case insensitive
    if (filters?.search?.trim()) {
      conditions.push(ilike(diario.title, `%${filters.search}%`));
    }

    // Filtro por tipo
    if (filters?.type && filters.type !== "Todos") {
      conditions.push(
        eq(
          diario.type,
          filters.type as "Família" | "Trabalho" | "Religioso" | "Outros",
        ),
      );
    }

    // Busca diários do usuário ordenados por data de criação (mais recentes primeiro)
    const query = db
      .select()
      .from(diario)
      .where(and(...conditions))
      .orderBy(desc(diario.createdAt));

    // Adiciona paginação se especificado
    if (filters?.limit) {
      const offset = ((filters.page || 1) - 1) * filters.limit;
      query.limit(filters.limit).offset(offset);
    }

    const diarios = await query;

    // Conta total para paginação
    const totalResult = await db
      .select({ count: diario.id })
      .from(diario)
      .where(and(...conditions));

    return { success: true, diarios, total: totalResult.length };
  } catch (error) {
    console.error("Erro ao buscar diários:", error);
    return {
      success: false,
      error: "Erro ao buscar diários",
      diarios: [],
      total: 0,
    };
  }
}

export async function getDiarioById(id: string) {
  try {
    // Valida formato do ID (UUID)
    if (!UUID_REGEX.test(id)) {
      return { success: false, error: "ID inválido", diario: null };
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return { success: false, error: "Não autenticado", diario: null };
    }
    const diarioItem = await db
      .select()
      .from(diario)
      .where(and(eq(diario.id, id), eq(diario.userId, session.user.id)))
      .limit(1);

    return { success: true, diario: diarioItem };
  } catch (error) {
    console.error("Erro ao buscar diário:", error);
    return { success: false, error: "Erro ao buscar diário", diario: null };
  }
}

export async function createDiario(data: {
  title: string;
  description: string;
  type: "Família" | "Trabalho" | "Religioso" | "Outros";
  image: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Não autenticado" };
    }

    // Valida os dados de entrada
    const validatedData = diarioSchema.parse(data);

    const id = crypto.randomUUID();

    await db.insert(diario).values({
      id,
      title: validatedData.title,
      description: validatedData.description,
      type: validatedData.type,
      image: validatedData.image,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath("/dashboard");
    return { success: true, id };
  } catch (error) {
    console.error("Erro ao criar diário:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Erro ao criar diário" };
  }
}

export async function updateDiario(
  id: string,
  data: {
    title: string;
    description: string;
    type: "Família" | "Trabalho" | "Religioso" | "Outros";
    image: string;
  },
) {
  try {
    // Valida formato do ID (UUID)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return { success: false, error: "ID inválido" };
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Não autenticado" };
    }

    // Valida os dados de entrada
    const validatedData = diarioSchema.parse(data);

    // Verifica se o diário pertence ao usuário antes de atualizar
    await db
      .update(diario)
      .set({
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        image: validatedData.image,
        updatedAt: new Date(),
      })
      .where(and(eq(diario.id, id), eq(diario.userId, session.user.id)));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar diário:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Erro ao atualizar diário" };
  }
}

export async function deleteDiario(id: string) {
  try {
    // Valida formato do ID (UUID)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return { success: false, error: "ID inválido" };
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Não autenticado" };
    }

    // Verifica se o diário pertence ao usuário antes de deletar
    await db
      .delete(diario)
      .where(and(eq(diario.id, id), eq(diario.userId, session.user.id)));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar diário:", error);
    return { success: false, error: "Erro ao deletar diário" };
  }
}
