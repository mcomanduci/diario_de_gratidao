import LogoutButton from "../login/logout-button";
import ButtonLink from "./button-link";

export default function Sidebar() {
  return (
    <aside className="space-y-2 border-r px-3 py-6">
      <ButtonLink linkToPage="/dashboard" pageName="Dashboard" />
      <ButtonLink linkToPage="/configuracoes" pageName="Configurações" />
      <LogoutButton />
    </aside>
  );
}
