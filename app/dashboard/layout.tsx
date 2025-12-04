import type { Metadata } from "next";
import { PrivacyProvider } from "@/components/dashboard/privacy-provider";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivacyProvider>{children}</PrivacyProvider>;
}
