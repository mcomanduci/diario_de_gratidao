import { LaughIcon } from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userName = session?.user?.name || "Usuário";

  return (
    <header className="flex h-20 items-center justify-between gap-3 bg-[#d8d8f9] px-6 py-5">
      <div className="flex items-center gap-3">
        <LaughIcon className="text-primary-blue" size="30" />
        <p className="text-primary-blue font-semibold">Diário de Gratidão</p>
      </div>
      <div className="text-sm">{userName}</div>
    </header>
  );
}
