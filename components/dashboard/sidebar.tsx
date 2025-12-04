import { getCurrentUser } from "@/lib/data";
import LogoutButton from "../login/logout-button";
import ButtonLink from "./button-link";
import ExportData from "./export-data";
import GratitudeStats from "./gratitude-stats";

export default async function Sidebar() {
  const user = await getCurrentUser();

  return (
    <aside className="bg-background hidden w-64 flex-col gap-6 border-r px-4 py-6 md:flex">
      {user && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
          <GratitudeStats streak={user.streak || 0} />
        </div>
      )}

      <nav className="flex flex-1 flex-col gap-2">
        <ButtonLink linkToPage="/dashboard" pageName="Dashboard" />
        <ButtonLink linkToPage="/configuracoes" pageName="Configurações" />
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm font-medium">Dados</span>
          <ExportData />
        </div>
      </nav>

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}
