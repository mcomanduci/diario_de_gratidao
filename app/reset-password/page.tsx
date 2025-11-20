import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/reset-password/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-muted-foreground">Carregando...</div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
