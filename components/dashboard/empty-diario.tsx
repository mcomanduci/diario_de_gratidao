export default function EmptyDiario() {
  return (
    <div className="border-muted bg-muted/10 flex h-48 w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed">
      <h2 className="text-muted-foreground text-lg font-medium">
        Nenhum diário encontrado
      </h2>
      <p className="text-muted-foreground text-sm">
        Crie um novo diário para começar a registrar sua gratidão!
      </p>
    </div>
  );
}
