"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUsername } from "@/actions/user";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
});

export default function ChangeUsernameForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const result = await updateUsername(values.name);

      if (!result.success) {
        toast.error(result.error || "Erro ao alterar nome");
        return;
      }

      toast.success("Nome alterado com sucesso!");
      // Opcional: atualizar a sessão no cliente se necessário, ou deixar o revalidatePath cuidar disso
      // router.refresh();
    } catch (error) {
      console.error("Erro ao alterar nome:", error);
      toast.error("Ocorreu um erro ao alterar o nome");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu nome"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="hover:bg-primary-blue h-11 flex-1 bg-[#0c29ab] disabled:opacity-50"
        >
          {isLoading ? "Alterando..." : "Alterar Nome"}
        </Button>
      </form>
    </Form>
  );
}
