"use server";

import { cache } from "react";
import { and, desc, eq, ilike } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db/drizzle";
import { diario } from "@/db/schema";
import { auth } from "@/lib/auth";
import type { Diario } from "@/types/types";

// Cached database query - will deduplicate within the same request
export const getCachedDiarios = cache(
  async (
    userId: string,
    filters?: {
      search?: string;
      type?: string;
    },
  ): Promise<Diario[]> => {
    const conditions = [eq(diario.userId, userId)];

    // Filter by search (title) - case insensitive
    if (filters?.search?.trim()) {
      conditions.push(ilike(diario.title, `%${filters.search}%`));
    }

    // Filter by type
    if (filters?.type && filters.type !== "Todos") {
      conditions.push(
        eq(
          diario.type,
          filters.type as "Família" | "Trabalho" | "Religioso" | "Outros",
        ),
      );
    }

    const diarios = await db
      .select()
      .from(diario)
      .where(and(...conditions))
      .orderBy(desc(diario.createdAt));

    return diarios;
  },
);

// Get current user session
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}
