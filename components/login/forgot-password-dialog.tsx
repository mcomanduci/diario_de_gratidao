"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { checkUserExists } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordDialog() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user exists first
      const { exists } = await checkUserExists(email);

      if (!exists) {
        toast.error("Nenhuma conta encontrada com este email.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          redirectTo: "/reset-password", // Where user goes after clicking email link
        }),
      });

      if (response.ok) {
        toast.success("Email enviado! Verifique sua caixa de entrada.");
        setEmail("");
        closeButtonRef.current?.click();
      } else {
        toast.error("Erro ao enviar email. Tente novamente.");
      }
    } catch (_error) {
      toast.error("Erro ao enviar email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-sm">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className="text-primary-blue">
            Redefinir Senha
          </DialogTitle>
          <DialogDescription>
            Digite seu email para receber o link para redefinir sua senha.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 py-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>
        <DialogFooter className="flex w-full gap-2 sm:justify-start">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary-blue hover:bg-primary-blue/90 h-11 flex-1 cursor-pointer"
          >
            {loading ? "Enviando..." : "Resetar senha"}
          </Button>
          <DialogClose asChild>
            <Button
              ref={closeButtonRef}
              type="button"
              variant="outline"
              className="h-11 flex-1 cursor-pointer"
            >
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
