"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function ButtonLink({
  linkToPage,
  pageName,
}: {
  linkToPage: string;
  pageName: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === linkToPage;
  return (
    <Button
      variant="outline"
      className={`min-h-10 w-full cursor-pointer font-normal ${isActive && "border-[#afcef8] bg-[#afcef8] text-[#1e6df6] hover:bg-[#afcef8] hover:text-[#1e6df6]"}`}
      asChild
    >
      <Link href={linkToPage}>{pageName}</Link>
    </Button>
  );
}
