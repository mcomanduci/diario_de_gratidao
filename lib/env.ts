import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().min(1, "DATABASE_URL é obrigatória"),

  // Auth
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET deve ter no mínimo 32 caracteres"),
  BETTER_AUTH_URL: z.string().url().min(1, "BETTER_AUTH_URL é obrigatória"),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z
    .string()
    .min(1, "CLOUDINARY_CLOUD_NAME é obrigatória"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY é obrigatória"),
  CLOUDINARY_API_SECRET: z
    .string()
    .min(1, "CLOUDINARY_API_SECRET é obrigatória"),

  // Resend
  RESEND_API_KEY: z
    .string()
    .min(1, "RESEND_API_KEY é obrigatória")
    .startsWith("re_", "RESEND_API_KEY deve começar com 're_'"),

  // Public
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .min(1, "NEXT_PUBLIC_APP_URL é obrigatória"),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(
        (e) => `${e.path.join(".")}: ${e.message}`,
      );
      throw new Error(
        `❌ Variáveis de ambiente inválidas:\n${missingVars.join("\n")}`,
      );
    }
    throw error;
  }
}

// Valida no startup (apenas no servidor)
if (typeof window === "undefined") {
  validateEnv();
}
