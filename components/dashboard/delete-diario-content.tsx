"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { deleteDiario } from "@/actions/diarios";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteDiarioContent({
  diarioId,
}: {
  diarioId: string;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  async function onDelete(id: string) {
    try {
      await deleteDiario(id);
      toast.success("Diário excluído com sucesso!");
      closeButtonRef.current?.click();
    } catch (_error) {
      toast.error("Erro ao excluir diário.");
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Tem certeza que deseja excluir este diário?</DialogTitle>
        <DialogDescription>
          Esta ação não pode ser desfeita. Todas as entradas associadas a este
          diário também serão excluídas.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="gap-2 sm:justify-between">
        <DialogClose asChild>
          <Button ref={closeButtonRef} variant="outline" className="flex-1">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          variant="destructive"
          onClick={() => onDelete(diarioId)}
          className="flex-1"
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
