"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";

export async function checkUserExists(email: string) {
  try {
    const existingUser = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return { exists: existingUser.length > 0 };
  } catch (error) {
    console.error("Error checking user:", error);
    return { exists: false };
  }
}
