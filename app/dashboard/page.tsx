import type { Metadata } from "next";
import { Suspense } from "react";
import Content from "@/components/dashboard/content";
import ContentLoading from "@/components/dashboard/content-loading";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

export const metadata: Metadata = {
  title: "Dashboard - Diário de Gratidão",
  description: "Gerencie seus registros de gratidão",
};

export default async function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense
        fallback={
          <div className="bg-background flex h-16 items-center justify-between border-b px-6" />
        }
      >
        <Header />
      </Suspense>
      <div className="flex flex-1">
        <Sidebar />
        <main className="bg-muted/30 flex-1 p-6">
          <Suspense fallback={<ContentLoading />}>
            <Content />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
