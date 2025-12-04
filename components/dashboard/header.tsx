import { LaughIcon } from "lucide-react";
import { Suspense } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AmbientSoundPlayer from "./ambient-sound-player";
import UserInfo from "./user-info";

export default function Header() {
  return (
    <header className="bg-background flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-2">
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
          <LaughIcon size={20} />
        </div>
        <span className="text-foreground text-primary font-semibold">
          Diário de Gratidão
        </span>
      </div>
      <div className="flex items-center gap-4">
        <AmbientSoundPlayer />
        <Suspense
          fallback={
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm font-medium">
                ...
              </span>
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          }
        >
          <UserInfo />
        </Suspense>
      </div>
    </header>
  );
}
