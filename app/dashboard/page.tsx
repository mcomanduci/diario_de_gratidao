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

export default function Dashboard() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-20 items-center justify-between gap-3 bg-[#d8d8f9] px-6 py-5" />
        }
      >
        <Header />
      </Suspense>
      <main className="grid min-h-full grid-cols-[150px_1fr] p-2">
        <Sidebar />
        <Suspense fallback={<ContentLoading />}>
          <Content />
        </Suspense>
      </main>
    </>
  );
}
