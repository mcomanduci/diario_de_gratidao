"use server";

import { and, desc, eq, gte, ilike, lte } from "drizzle-orm";
import { differenceInCalendarDays } from "date-fns";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { diario, user } from "@/db/schema";
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

    const [currentUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!currentUser) {
      return { error: "User not found" };
    }

    const now = new Date();
    let newStreak = currentUser.streak;
    const lastLog = currentUser.lastLogDate;

    if (lastLog) {
      const daysDiff = differenceInCalendarDays(now, lastLog);

      if (daysDiff === 1) {
        // Consecutive day: increment streak
        newStreak += 1;
      } else if (daysDiff > 1) {
        // Missed a day (or more): reset streak to 1
        newStreak = 1;
      }
      // If daysDiff === 0 (same day), keep streak as is
    } else {
      // First ever log
      newStreak = 1;
    }

    const id = crypto.randomUUID();

    await db.transaction(async (tx) => {
      await tx.insert(diario).values({
        id,
        userId: session.user.id,
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        image: validatedData.image,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Update user streak and lastLogDate only if it's a new day
      if (!lastLog || differenceInCalendarDays(now, lastLog) > 0) {
        await tx
          .update(user)
          .set({
            streak: newStreak,
            lastLogDate: now,
          })
          .where(eq(user.id, session.user.id));
      }
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

export async function getMonthlyStats() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Não autenticado" };
    }

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const monthlyEntries = await db
      .select()
      .from(diario)
      .where(
        and(
          eq(diario.userId, session.user.id),
          gte(diario.createdAt, start),
          lte(diario.createdAt, end),
        ),
      );

    // 1. Total Entries
    const totalEntries = monthlyEntries.length;

    // 2. Entries by Day (for Bar Chart)
    const entriesByDayMap = new Map<number, number>();
    // Initialize all days in month with 0
    const daysInMonth = end.getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      entriesByDayMap.set(i, 0);
    }

    monthlyEntries.forEach((entry) => {
      const day = entry.createdAt.getDate();
      entriesByDayMap.set(day, (entriesByDayMap.get(day) || 0) + 1);
    });

    const chartData = Array.from(entriesByDayMap.entries()).map(
      ([day, count]) => ({
        day: day.toString(),
        entries: count,
      }),
    );

    // 3. Top Category
    const categoryMap = new Map<string, number>();
    monthlyEntries.forEach((entry) => {
      categoryMap.set(entry.type, (categoryMap.get(entry.type) || 0) + 1);
    });

    let topCategory = "Nenhuma";
    let maxCount = 0;
    categoryMap.forEach((count, category) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = category;
      }
    });

    const categoryData = Array.from(categoryMap.entries()).map(
      ([name, value]) => ({
        name,
        value,
      }),
    );

    return {
      success: true,
      stats: {
        totalEntries,
        topCategory,
        chartData,
        categoryData,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return { success: false, error: "Erro ao buscar estatísticas" };
  }
}

export async function exportUserData() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Não autenticado" };
    }

    const allEntries = await db
      .select()
      .from(diario)
      .where(eq(diario.userId, session.user.id))
      .orderBy(desc(diario.createdAt));

    return { success: true, data: allEntries };
  } catch (error) {
    console.error("Erro ao exportar dados:", error);
    return { success: false, error: "Erro ao exportar dados" };
  }
}
