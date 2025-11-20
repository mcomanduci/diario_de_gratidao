import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";

export default async function UserInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userName = session?.user?.name || "Usuário";
  const userImage = session?.user?.image || "";

  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground text-sm font-medium">
        {userName}
      </span>
      <Avatar>
        <AvatarImage src={userImage} alt={userName} />
        <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
}
