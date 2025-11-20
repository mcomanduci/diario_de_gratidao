import type { Diario } from "@/types/types";
import DiarioItem from "./diario-item";
import EmptyDiario from "./empty-diario";

interface DiariosListProps {
  diarios: Diario[];
  isPending?: boolean;
}

export default async function DiariosList({
  diarios,
  isPending = false,
}: DiariosListProps) {
  "use cache";

  if (isPending) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (diarios.length === 0) {
    return <EmptyDiario />;
  }

  return (
    <div className="flex flex-col gap-4">
      {diarios.map((diario) => (
        <DiarioItem key={diario.id} diario={diario} />
      ))}
    </div>
  );
}
