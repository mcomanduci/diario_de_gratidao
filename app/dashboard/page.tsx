import type { Metadata } from "next";
import Content from "@/components/dashboard/content";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { getCachedDiarios, getCurrentUser } from "@/lib/data";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Diário de Gratidão",
  description: "Gerencie seus registros de gratidão",
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const params = await searchParams;
  const diarios = await getCachedDiarios(user.id, {
    search: params.search,
    type: params.type,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="bg-muted/30 flex-1 p-6">
          <Content diarios={diarios} searchParams={params} />
        </main>
      </div>
    </div>
  );
}
