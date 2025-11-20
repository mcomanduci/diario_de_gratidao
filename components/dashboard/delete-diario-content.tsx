"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { deleteDiario } from "@/actions/diarios";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
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
      <div className="py-4 text-center">
        <DialogTitle className="mb-2 text-lg font-semibold text-gray-900">
          Tem certeza que deseja excluir este diário?
        </DialogTitle>
        <p className="text-sm text-gray-500">
          Esta ação não pode ser desfeita. Todas as entradas associadas a este
          diário também serão excluídas.
        </p>
      </div>
      <DialogFooter className="sm:justify-between">
        <DialogClose asChild>
          <Button
            ref={closeButtonRef}
            variant="outline"
            className="hover:text-primary-blue hover:border-primary-blue h-11 flex-1 border-[#0c29ab] text-[#0c29ab] hover:bg-transparent"
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          onClick={() => onDelete(diarioId)}
          className="hover:bg-primary-blue h-11 flex-1 bg-[#b0200c]"
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
