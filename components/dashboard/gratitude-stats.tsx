"use client";

import { Flame, Flower2, Sprout, Trees } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GratitudeStatsProps {
  streak: number;
}

export default function GratitudeStats({ streak }: GratitudeStatsProps) {
  // Determine Garden Stage
  let StageIcon = Sprout;
  let stageName = "Semente";
  let stageColor = "text-green-500";
  let nextStage = 3;

  if (streak >= 14) {
    StageIcon = Trees;
    stageName = "Floresta";
    stageColor = "text-emerald-700";
    nextStage = 100; // Max level for now
  } else if (streak >= 7) {
    StageIcon = Flower2;
    stageName = "Jardim";
    stageColor = "text-pink-500";
    nextStage = 14;
  } else if (streak >= 3) {
    StageIcon = Sprout;
    stageName = "Broto";
    stageColor = "text-green-600";
    nextStage = 7;
  } else {
    StageIcon = Sprout; // Seedling icon not available in all sets, using Sprout as base
    stageName = "Semente";
    stageColor = "text-stone-500";
    nextStage = 3;
  }

  return (
    <div className="bg-card/50 flex items-center justify-between rounded-xl border p-3 shadow-sm backdrop-blur-sm">
      {/* Streak Counter */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <div className="relative flex size-8 items-center justify-center rounded-full bg-orange-100">
                <Flame className="size-5 animate-pulse fill-orange-500 text-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-sm leading-none font-bold">
                  {streak}
                </span>
                <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                  Dias
                </span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sua ofensiva de gratidão!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Divider */}
      <div className="bg-border/50 h-8 w-px" />

      {/* Garden Status */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-foreground text-xs leading-none font-bold">
                  {stageName}
                </span>
                <span className="text-muted-foreground text-[10px]">
                  {nextStage - streak} para evoluir
                </span>
              </div>
              <div
                className={`bg-secondary/30 flex size-8 items-center justify-center rounded-full ${stageColor}`}
              >
                <StageIcon className="size-5" />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Seu Jardim de Gratidão</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
