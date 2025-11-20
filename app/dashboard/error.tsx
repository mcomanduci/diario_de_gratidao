"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log para serviço de monitoramento (ex: Sentry)
    console.error("Erro capturado:", error);
  }, [error]);

  const handleGoHome = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Algo deu errado!</h2>
        <p className="text-gray-600">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>
        {error.digest && (
          <p className="text-sm text-gray-400">
            Código do erro: {error.digest}
          </p>
        )}
        <div className="flex justify-center gap-2">
          <Button onClick={reset} variant="default">
            Tentar novamente
          </Button>
          <Button onClick={handleGoHome} variant="outline">
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
}
