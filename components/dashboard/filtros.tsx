"use client";

import { useEffect, useState, useTransition } from "react";
import { getDiarios } from "@/actions/diarios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Diario } from "@/types/types";
import { Input } from "../ui/input";
import DiarioItem from "./diario-item";
import EmptyDiario from "./empty-diario";

interface FiltrosProps {
  initialDiarios: Diario[];
  initialSearch?: string;
  initialType?: string;
}

export default function Filtros({
  initialDiarios,
  initialSearch = "",
  initialType = "Todos",
}: FiltrosProps) {
  const [search, setSearch] = useState(initialSearch);
  const [type, setType] = useState(initialType);
  const [diarios, setDiarios] = useState<Diario[]>(initialDiarios);
  const [isPending, startTransition] = useTransition();

  // Debounce da busca
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(async () => {
        const result = await getDiarios({ search, type });
        if (result.success) {
          setDiarios(result.diarios);
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, type]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Input
          className="h-10 ring-0 placeholder:text-gray-300"
          placeholder="Pesquise por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Trabalho">Trabalho</SelectItem>
            <SelectItem value="Religioso">Religioso</SelectItem>
            <SelectItem value="Família">Família</SelectItem>
            <SelectItem value="Outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {search || type !== "Todos" ? (
        <p className="text-sm text-gray-600">
          {isPending
            ? "Buscando..."
            : `${diarios.length} resultado(s) encontrado(s)`}
        </p>
      ) : null}

      {isPending ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">Carregando...</p>
        </div>
      ) : diarios.length > 0 ? (
        <div className="space-y-2">
          {diarios.map((diario) => (
            <DiarioItem key={diario.id} diario={diario} />
          ))}
        </div>
      ) : (
        <div>
          {search || type !== "Todos" ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">
                Nenhum diário encontrado com os filtros aplicados.
              </p>
            </div>
          ) : (
            <EmptyDiario />
          )}
        </div>
      )}
    </>
  );
}
