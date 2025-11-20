import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import UserInfoClient from "./user-info-client";

export default async function UserInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userName = session?.user?.name || "Usuário";
  const userImage = session?.user?.image || "";

  return <UserInfoClient userName={userName} userImage={userImage} />;
}
