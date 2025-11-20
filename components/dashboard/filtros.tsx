"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  diarios: Diario[];
  searchParams: { search?: string; type?: string };
}

export default function Filtros({ diarios, searchParams }: FiltrosProps) {
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.search || "");
  const [type, setType] = useState(searchParams.type || "Todos");

  const updateURL = (newSearch: string, newType: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newType && newType !== "Todos") params.set("type", newType);

    const query = params.toString();
    router.push(query ? `/dashboard?${query}` : "/dashboard");
  };

  const handleSearch = () => {
    updateURL(search, type);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    updateURL(search, newType);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    updateURL("", type);
  };

  const hasActiveFilters =
    searchParams.search || (searchParams.type && searchParams.type !== "Todos");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Input
              className="pr-8"
              placeholder="Pesquise por nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full px-2 hover:bg-transparent"
                onClick={handleClearSearch}
              >
                <XIcon className="text-muted-foreground size-4" />
                <span className="sr-only">Limpar busca</span>
              </Button>
            )}
          </div>
          <Button onClick={handleSearch}>
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

      {hasActiveFilters && (
        <p className="text-muted-foreground text-sm">
          {diarios.length} resultado(s) encontrado(s)
        </p>
      )}

      {diarios.length > 0 ? (
        <div className="flex flex-col gap-4">
          {diarios.map((diario) => (
            <DiarioItem key={diario.id} diario={diario} />
          ))}
        </div>
      ) : (
        <div>
          {hasActiveFilters ? (
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
