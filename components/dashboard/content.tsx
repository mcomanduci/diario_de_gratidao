import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getCachedDiarios, getCurrentUser } from "@/lib/data";
import Filtros from "./filtros";
import NewDiarioContent from "./new-diario-content";

export default async function Content({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  const params = await searchParams;
  const diarios = await getCachedDiarios(user.id, {
    search: params.search,
    type: params.type,
  });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Meus diários de gratidão
        </h1>
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

      <Filtros diarios={diarios} searchParams={params} />
    </section>
  );
}
