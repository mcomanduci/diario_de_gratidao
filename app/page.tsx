import { LaughIcon } from "lucide-react";
import LoginForm from "@/components/login/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="bg-muted flex min-h-screen items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="bg-primary/10 rounded-full p-3">
            <LaughIcon className="text-primary size-8" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">Bem-vindo</CardTitle>
            <CardDescription className="text-base">
              Diário de Gratidão
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
