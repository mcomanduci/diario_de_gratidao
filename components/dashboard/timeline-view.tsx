"use client";

import type { Diario } from "@/types/types";
import DiarioItem from "./diario-item";
import EmptyDiario from "./empty-diario";

interface TimelineViewProps {
  diarios: Diario[];
  hasActiveFilters: boolean;
}

export default function TimelineView({
  diarios,
  hasActiveFilters,
}: TimelineViewProps) {
  if (diarios.length === 0) {
    return (
      <div>
        {hasActiveFilters ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">
              Nenhum diário encontrado com os filtros aplicados.
            </p>
          </div>
        ) : (
          <EmptyDiario />
        )}
      </div>
    );
  }

  return (
    <div className="border-primary/20 relative ml-4 space-y-8 border-l-2 pb-8">
      {diarios.map((diario) => (
        <div key={diario.id} className="relative pl-8">
          {/* Timeline Dot */}
          <div className="bg-background border-primary ring-background absolute top-4 -left-[9px] size-4 rounded-full border-2 ring-4" />

          <DiarioItem diario={diario} />
        </div>
      ))}
    </div>
  );
}
