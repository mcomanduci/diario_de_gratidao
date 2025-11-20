"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start font-normal",
        isActive && "bg-secondary text-secondary-foreground font-medium",
      )}
      asChild
    >
      <Link href={linkToPage}>{pageName}</Link>
    </Button>
  );
}
