"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUsername(name: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: false,
      error: "Não autenticado",
    };
  }

  try {
    await db
      .update(user)
      .set({
        name,
      })
      .where(eq(user.id, session.user.id));

    revalidatePath("/configuracoes");

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Erro ao atualizar nome",
    };
  }
}
