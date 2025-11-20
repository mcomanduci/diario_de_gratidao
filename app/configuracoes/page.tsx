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
    <>
      <Header />
      <main className="grid min-h-full grid-cols-[150px_1fr] p-2">
        <Sidebar />
        <div className="space-y-6 p-4">
          <div>
            <h1 className="text-primary-blue text-2xl font-bold">
              Configurações
            </h1>
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
    </>
  );
}
