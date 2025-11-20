"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
        },
      },
    });
  }

  return (
    <Button
      variant="outline"
      className="min-h-10 w-full cursor-pointer font-normal hover:border-[#fdeae7] hover:bg-[#fdeae7] hover:text-[#ef2f15]"
      onClick={handleLogout}
    >
      Sair
    </Button>
  );
}
