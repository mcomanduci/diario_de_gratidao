"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateDiario } from "@/actions/diarios";
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
import type { Diario } from "@/types/types";
import { ImageUpload } from "./image-upload";

const formSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  type: z.enum(["Família", "Trabalho", "Religioso", "Outros"], {
    message: "Selecione um tipo",
  }),
  image: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditDiarioContent({
  diario,
  isOpen,
}: {
  diario: Diario;
  isOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: diario.title,
      description: diario.description,
      type: diario.type,
      image: diario.image,
    },
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: diario.title,
        description: diario.description,
        type: diario.type,
        image: diario.image,
      });
    }
  }, [isOpen, diario, form]);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      const result = await updateDiario(diario.id, values);

      if (!result.success) {
        toast.error(result.error || "Erro ao atualizar diário");
        return;
      }

      toast.success("Diário atualizado com sucesso!");
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
      <DialogTitle className="sr-only">Editar diário</DialogTitle>
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
                <FormLabel className="text-xs font-normal">Título</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o título"
                    className="h-10"
                    {...field}
                  />
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
                <FormLabel className="text-xs font-normal">Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a descrição"
                    className="h-10"
                    {...field}
                  />
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
                <FormLabel className="text-xs font-normal">Tipo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button
                ref={closeButtonRef}
                type="button"
                variant="outline"
                className="hover:text-primary-blue hover:border-primary-blue h-11 flex-1 border-[#0c29ab] text-[#0c29ab] hover:bg-transparent"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading}
              className="hover:bg-primary-blue h-11 flex-1 bg-[#0c29ab] disabled:opacity-50"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
