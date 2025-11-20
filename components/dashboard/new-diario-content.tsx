"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createDiario } from "@/actions/diarios";
import { uploadImage } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./image-upload";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Título é obrigatório" })
    .max(100, { message: "Título muito longo" }),
  description: z
    .string()
    .min(1, { message: "Descrição é obrigatória" })
    .max(500, { message: "Descrição muito longa" }),
  type: z.enum(["Família", "Trabalho", "Religioso", "Outros"], {
    message: "Selecione um tipo",
  }),
  image: z.union([
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "A imagem deve ter no máximo 5MB",
      )
      .refine(
        (file) =>
          [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/avif",
          ].includes(file.type),
        "Apenas imagens JPEG, PNG, WebP ou AVIF são permitidas",
      ),
    z.string().url("URL de imagem inválida"),
  ]),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewDiarioContent() {
  const [isLoading, setIsLoading] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      let imageUrl = "";

      // Se é um File, faz upload para Cloudinary
      if (values.image instanceof File) {
        const formData = new FormData();
        formData.append("file", values.image);

        const uploadResult = await uploadImage(formData);

        if (!uploadResult.success || !uploadResult.url) {
          toast.error(uploadResult.error || "Erro ao fazer upload da imagem");
          setIsLoading(false);
          return;
        }

        imageUrl = uploadResult.url;
      } else if (typeof values.image === "string") {
        imageUrl = values.image;
      }

      // Cria o diário com a URL da imagem
      const result = await createDiario({
        ...values,
        image: imageUrl,
      });

      if (!result.success) {
        toast.error(result.error || "Erro ao criar diário");
        return;
      }

      toast.success("Diário criado com sucesso!");
      form.reset();
      closeButtonRef.current?.click();
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogTitle>Criar novo diário</DialogTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a descrição" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Trabalho">Trabalho</SelectItem>
                    <SelectItem value="Religioso">Religioso</SelectItem>
                    <SelectItem value="Família">Família</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <DialogFooter className="gap-2 sm:justify-between">
            <DialogClose asChild>
              <Button
                ref={closeButtonRef}
                type="button"
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Criando..." : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
