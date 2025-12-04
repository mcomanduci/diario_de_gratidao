"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Flower2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Diario } from "@/types/types";

interface CalendarViewProps {
  diarios: Diario[];
}

export default function CalendarView({ diarios }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(firstDayOfMonth);
  const endDate = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <Card className="border-secondary/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-primary font-serif text-xl font-bold capitalize">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Hoje
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-sm">
          {weekDays.map((day) => (
            <div key={day} className="text-muted-foreground py-2 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day: Date, dayIdx: number) => {
            const isCurrentMonth = isSameMonth(day, firstDayOfMonth);
            const isToday = isSameDay(day, new Date());
            const dayDiarios = diarios.filter((d) =>
              isSameDay(new Date(d.createdAt), day),
            );
            const hasEntry = dayDiarios.length > 0;

            return (
              <div
                key={day.toString()}
                className={`relative flex h-14 flex-col items-center justify-start rounded-md border p-1 transition-colors ${
                  isCurrentMonth
                    ? "bg-card text-card-foreground"
                    : "bg-muted/20 text-muted-foreground border-transparent"
                } ${isToday ? "bg-primary/5 border-primary/30 font-bold" : "border-border/50"} ${hasEntry ? "hover:bg-secondary/20 cursor-pointer" : ""} `}
              >
                <span className={`text-xs ${!isCurrentMonth && "opacity-50"}`}>
                  {format(day, "d")}
                </span>

                {hasEntry && (
                  <div className="mt-1 flex items-center justify-center">
                    <Flower2 className="text-accent fill-accent/20 animate-in zoom-in size-4 duration-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
