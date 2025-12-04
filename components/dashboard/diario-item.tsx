"use client";

import { MenuIcon, SquarePenIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Diario } from "@/types/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import DeleteDiarioContent from "./delete-diario-content";
import EditDiarioContent from "./edit-diario-content";
import { usePrivacy } from "./privacy-provider";
import { cn } from "@/lib/utils";

export default function DiarioItem({ diario }: { diario: Diario }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { isPrivateMode } = usePrivacy();

  return (
    <>
      <Card className="group border-secondary/50 bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
          <div className="relative shrink-0 overflow-hidden rounded-md">
            <Image
              src={diario.image}
              alt={`Imagem do diário: ${diario.title}`}
              width={120}
              height={120}
              className={cn(
                "size-[100px] object-cover transition-transform duration-500 group-hover:scale-105 sm:size-[120px]",
                isPrivateMode && "blur-md",
              )}
              priority
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                    {new Date(diario.createdAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2 py-0 text-[10px] font-normal"
                  >
                    {diario.type}
                  </Badge>
                </div>
                <h2
                  className={cn(
                    "text-primary font-serif text-xl font-bold",
                    isPrivateMode && "blur-sm select-none",
                  )}
                >
                  {diario.title}
                </h2>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary h-8 w-8"
                  >
                    <MenuIcon className="size-4" />
                    <span className="sr-only">Opções</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
                    <SquarePenIcon className="mr-2 size-4" />
                    Editar
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2Icon className="text-destructive mr-2 size-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p
              className={cn(
                "text-muted-foreground line-clamp-3 text-sm leading-relaxed",
                isPrivateMode && "blur-sm select-none",
              )}
            >
              {diario.description}
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <EditDiarioContent diario={diario} isOpen={editDialogOpen} />
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DeleteDiarioContent diarioId={diario.id} />
      </Dialog>
    </>
  );
}
