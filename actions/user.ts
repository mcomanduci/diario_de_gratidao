"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function updateUsername(name: string) {
  try {
    const session = await auth.api.getSession({
      headers: await import("next/headers").then((m) => m.headers()),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Não autenticado" };
    }

    if (!name || name.trim().length === 0) {
      return { success: false, error: "Nome não pode ser vazio" };
    }

    if (name.trim().length > 100) {
      return {
        success: false,
        error: "Nome muito longo (máximo 100 caracteres)",
      };
    }

    await db
      .update(user)
      .set({
        name: name.trim(),
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id));

    revalidatePath("/configuracoes");

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar nome:", error);
    return { success: false, error: "Erro ao atualizar nome" };
  }
}
