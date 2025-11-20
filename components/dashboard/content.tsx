import { PlusIcon } from "lucide-react";
import { getDiarios } from "@/actions/diarios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Filtros from "./filtros";
import NewDiarioContent from "./new-diario-content";

export default async function Content() {
  const { diarios } = await getDiarios();

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <h1 className="text-primary-blue text-2xl font-bold">
          Meus diários de gratidão
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="rouded-md h-10 bg-[#0c29ab] p-0 px-5"
              aria-label="Criar novo diário"
            >
              <PlusIcon className="size-6" aria-hidden="true" />
              <span>Novo diário</span>
            </Button>
          </DialogTrigger>
          <NewDiarioContent />
        </Dialog>
      </div>

      <Filtros initialDiarios={diarios} />
    </section>
  );
}
