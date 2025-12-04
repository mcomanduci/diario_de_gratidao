"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePrivacy } from "./privacy-provider";

export default function PrivacyToggle() {
  const { isPrivateMode, togglePrivateMode } = usePrivacy();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePrivateMode}
            className={isPrivateMode ? "text-primary" : "text-muted-foreground"}
          >
            {isPrivateMode ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
            <span className="sr-only">
              {isPrivateMode ? "Desativar modo privado" : "Ativar modo privado"}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isPrivateMode ? "Modo Privado Ativo" : "Ativar Modo Privado"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
