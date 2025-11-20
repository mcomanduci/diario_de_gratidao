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
    <main className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <Card className="w-full max-w-sm min-w-[400px] space-y-6 border-[rgba(235,243,255,1)] p-6 shadow-[0_0_2px_2px_rgba(235,243,255,1)]">
        <CardHeader className="m-0 flex flex-col items-center justify-center gap-0 p-0">
          <CardTitle className="p-1">
            <LaughIcon className="text-primary-blue" size={50} />
          </CardTitle>
          <CardDescription className="text-primary-blue text-sm font-semibold">
            Diário de Gratidão
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-0 space-y-6 p-0">
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
