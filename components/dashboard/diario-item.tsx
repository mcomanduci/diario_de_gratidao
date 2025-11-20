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
import { Dialog } from "../ui/dialog";
import DeleteDiarioContent from "./delete-diario-content";
import EditDiarioContent from "./edit-diario-content";

export default function DiarioItem({ diario }: { diario: Diario }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card className="rounded-md bg-[#ebf3ff] p-0">
        <CardContent className="flex gap-4 p-3">
          <Image
            src={diario.image}
            alt={`Imagem do diário: ${diario.title}`}
            width={100}
            height={100}
            className="size-[100px] rounded-md object-cover"
            priority
          />
          <div className="w-full space-y-2">
            <div className="flex justify-between">
              <h2 className="font-semibold">{diario.title}</h2>
              <div className="flex items-center gap-2">
                <Badge className="rounded-md bg-white text-xs text-gray-700">
                  {diario.type}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger aria-label="Opções do diário">
                    <MenuIcon className="text-primary-blue size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="p-2">
                    <DropdownMenuItem
                      className="text-primary-blue flex h-10 items-center justify-center text-base"
                      onSelect={() => setEditDialogOpen(true)}
                    >
                      <SquarePenIcon className="text-primary-blue size-5" />{" "}
                      Editar
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex h-10 items-center justify-center text-base text-red-600"
                      onSelect={() => setDeleteDialogOpen(true)}
                    >
                      <Trash2Icon className="size-5 text-red-600" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="max-w-100 text-xs">{diario.description}</p>
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
