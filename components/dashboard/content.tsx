"use client";

import {
  BarChart3Icon,
  CalendarIcon,
  LayoutListIcon,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { Diario } from "@/types/types";
import CalendarView from "./calendar-view";
import DailyPrompt from "./daily-prompt";
import DashboardControls from "./dashboard-controls";
import InsightsView from "./insights-view";
import NewDiarioContent from "./new-diario-content";
import PrivacyToggle from "./privacy-toggle";
import TimelineView from "./timeline-view";

interface ContentProps {
  diarios: Diario[];
  searchParams: { search?: string; type?: string };
}

export default function Content({ diarios, searchParams }: ContentProps) {
  const [viewMode, setViewMode] = useState<
    "timeline" | "calendar" | "insights"
  >("timeline");

  const hasActiveFilters =
    !!searchParams.search ||
    (!!searchParams.type && searchParams.type !== "Todos");

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-primary text-2xl font-bold tracking-tight capitalize">
          Meus diários de gratidão
        </h1>
        <div className="flex items-center gap-2">
          <div className="bg-card flex items-center rounded-lg border p-1 shadow-sm">
            <Button
              variant={viewMode === "timeline" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("timeline")}
            >
              <LayoutListIcon className="size-4" />
            </Button>
            <Button
              variant={viewMode === "calendar" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("calendar")}
            >
              <CalendarIcon className="size-4" />
            </Button>
            <Button
              variant={viewMode === "insights" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-2"
              onClick={() => setViewMode("insights")}
            >
              <BarChart3Icon className="size-4" />
            </Button>
          </div>

          <PrivacyToggle />

          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10 px-5" aria-label="Criar novo diário">
                <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                <span>Novo diário</span>
              </Button>
            </DialogTrigger>
            <NewDiarioContent />
          </Dialog>
        </div>
      </div>

      <DailyPrompt />

      {viewMode !== "insights" && (
        <DashboardControls searchParams={searchParams} count={diarios.length} />
      )}

      {viewMode === "timeline" ? (
        <TimelineView diarios={diarios} hasActiveFilters={hasActiveFilters} />
      ) : viewMode === "calendar" ? (
        <CalendarView diarios={diarios} />
      ) : (
        <InsightsView />
      )}
    </section>
  );
}
