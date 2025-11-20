"use client";

import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  value?: string | File;
  onChange?: (file: File | string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(() => {
    if (typeof value === "string") return value;
    if (value instanceof File) return URL.createObjectURL(value);
    return null;
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Atualiza preview quando value muda
  useEffect(() => {
    if (typeof value === "string" && value) {
      setPreview(value);
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  // Cleanup de preview local
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validação de tamanho (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    // Validação de tipo
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Por favor, selecione apenas imagens");
      return;
    }

    // Revoga preview anterior se for blob
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    // Cria preview local
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Passa o File para o form (não a URL)
    onChange?.(selectedFile);
  };

  const handleClear = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange?.("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto">
      <Label
        htmlFor="picture-upload"
        className="border-muted-foreground/25 hover:bg-muted/50 bg-muted/10 relative flex h-40 w-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed transition-colors"
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
              width={150}
              height={150}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={(e) => {
                e.preventDefault();
                handleClear();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center p-2 text-center">
            <ImagePlus className="mb-2 h-8 w-8 opacity-50" />
            <span className="text-xs font-normal">
              Selecione uma imagem para o diário
            </span>
          </div>
        )}
      </Label>

      <Input
        ref={inputRef}
        id="picture-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
