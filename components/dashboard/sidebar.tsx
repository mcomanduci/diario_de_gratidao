import LogoutButton from "../login/logout-button";
import ButtonLink from "./button-link";

export default function Sidebar() {
  return (
    <aside className="bg-background hidden w-64 flex-col gap-2 border-r px-4 py-6 md:flex">
      <nav className="flex flex-1 flex-col gap-2">
        <ButtonLink linkToPage="/dashboard" pageName="Dashboard" />
        <ButtonLink linkToPage="/configuracoes" pageName="Configurações" />
      </nav>
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}
