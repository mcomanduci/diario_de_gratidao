import { Suspense } from "react";
import ChangePasswordForm from "@/components/configuracoes/change-password-form";
import ChangeUsernameForm from "@/components/configuracoes/change-username-form";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ConfiguracoesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={
        <header className="bg-background flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
              <span>📔</span>
            </div>
            <span className="text-foreground font-semibold">Diário de Gratidão</span>
          </div>
        </header>
      }>
        <Header />
      </Suspense>
      <div className="flex flex-1">
        <Sidebar />
        <main className="bg-muted/30 flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Configurações</h1>
              <p className="text-muted-foreground text-sm">
                Gerencie as configurações da sua conta e preferências.
              </p>
            </div>
            <Separator />
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações públicas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChangeUsernameForm />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>
                    Gerencie sua senha e segurança da conta.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChangePasswordForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
