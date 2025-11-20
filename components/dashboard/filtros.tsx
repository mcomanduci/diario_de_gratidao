"use client";

import { SearchIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { getDiarios } from "@/actions/diarios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Diario } from "@/types/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DiarioItem from "./diario-item";
import EmptyDiario from "./empty-diario";

interface FiltrosProps {
  initialDiarios: Diario[];
}

export default function Filtros({ initialDiarios }: FiltrosProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Todos");
  const [diarios, setDiarios] = useState<Diario[]>(initialDiarios);
  const [isPending, startTransition] = useTransition();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    startTransition(async () => {
      const result = await getDiarios({ search, type });
      if (result.success) {
        setDiarios(result.diarios);
      }
    });
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    if (newType !== "Todos") {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
    startTransition(async () => {
      const result = await getDiarios({ search, type: newType });
      if (result.success) {
        setDiarios(result.diarios);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 gap-2">
          <Input
            className="flex-1"
            placeholder="Pesquise por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSearch} disabled={isPending}>
            <SearchIcon className="size-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
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

      {hasSearched ? (
        <p className="text-muted-foreground text-sm">
          {isPending
            ? "Buscando..."
            : `${diarios.length} resultado(s) encontrado(s)`}
        </p>
      ) : null}

      {isPending ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      ) : diarios.length > 0 ? (
        <div className="flex flex-col gap-4">
          {diarios.map((diario) => (
            <DiarioItem key={diario.id} diario={diario} />
          ))}
        </div>
      ) : (
        <div>
          {search || type !== "Todos" ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                Nenhum diário encontrado com os filtros aplicados.
              </p>
            </div>
          ) : (
            <EmptyDiario />
          )}
        </div>
      )}
    </div>
  );
}
