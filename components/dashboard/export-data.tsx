"use client";

import { DownloadIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { exportUserData } from "@/actions/diarios";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ExportData() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const result = await exportUserData();
      if (result.success && result.data) {
        const jsonString = JSON.stringify(result.data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `diario-gratidao-backup-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Failed to export data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExport}
            disabled={loading}
            className="text-muted-foreground"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <DownloadIcon className="size-5" />
            )}
            <span className="sr-only">Exportar dados</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Exportar meus dados (JSON)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
