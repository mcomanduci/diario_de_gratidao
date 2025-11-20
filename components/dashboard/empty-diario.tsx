export default function EmptyDiario() {
  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300">
      <h2 className="text-lg font-medium text-gray-500">
        Nenhum diário encontrado
      </h2>
      <p className="text-sm text-gray-400">
        Crie um novo diário para começar a registrar sua gratidão!
      </p>
    </div>
  );
}
