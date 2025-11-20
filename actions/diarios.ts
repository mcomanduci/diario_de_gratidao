"use server";

import { and, desc, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { diario } from "@/db/schema";
import { auth } from "@/lib/auth";

const diarioSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título muito longo"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição muito longa"),
  type: z.enum(["Família", "Trabalho", "Religioso", "Outros"]),
  image: z.string().url("URL de imagem inválida"),
});

export async function getDiarios(filters?: {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  try {
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
