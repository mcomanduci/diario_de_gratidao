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

export default function DiarioItem({ diario }: { diario: Diario }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden p-0">
        <CardContent className="flex gap-4 p-4">
          <Image
            src={diario.image}
            alt={`Imagem do diário: ${diario.title}`}
            width={100}
            height={100}
            className="size-[100px] rounded-md object-cover"
            priority
          />
          <div className="flex w-full flex-col">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold">{diario.title}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-md">
                  {diario.type}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
            </div>
            <p className="text-muted-foreground text-sm">
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
