"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ForgotPasswordDialog from "./forgot-password-dialog";

export default function LoginForm() {
  const [login, setLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleLogin = () => {
    setLogin(!login);
    form.reset();
  };

  const formSchema = z.object({
    name: login
      ? z.string().optional()
      : z.string().min(2, {
          message: "O nome de usuário deve ter pelo menos 2 caracteres.",
        }),
    email: z.email({
      message: "Insira um e-mail válido.",
    }),
    password: z.string().min(6, {
      message: "A senha deve ter no mínimo 6 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (login) {
        // Login
        const result = await authClient.signIn.email({
          email: values.email,
          password: values.password,
        });

        if (result.error) {
          toast.error("Erro ao fazer login");
          return;
        }

        toast.success("Login realizado com sucesso!");
        router.push("/dashboard");
      } else {
        // Registro
        const result = await authClient.signUp.email({
          email: values.email,
          password: values.password,
          name: values.name || "",
        });

        if (result.error) {
          toast.error("Erro ao criar conta");
          return;
        }

        toast.success("Conta criada com sucesso!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          {!login && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel className="text-xs font-normal">
                    Seu nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome"
                      {...field}
                      className="h-10 placeholder:text-gray-300"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel className="text-xs font-normal">E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu e-mail"
                    {...field}
                    className="h-10 placeholder:text-gray-300"
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel className="text-xs font-normal">Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*******"
                    {...field}
                    className="h-10 placeholder:text-gray-300"
                    type="password"
                    autoComplete={login ? "current-password" : "new-password"}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
                <FormDescription className="flex justify-end">
                  {" "}
                  {login && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="hover:text-primary-blue cursor-pointer text-xs text-[#0c29ab]">
                          Esqueci minha senha
                        </span>
                      </DialogTrigger>
                      <ForgotPasswordDialog />
                    </Dialog>
                  )}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-6 space-y-6 p-0">
          <p className="text-center text-xs">
            {login ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
            <button
              type="button"
              className="text-primary-blue cursor-pointer border-0 bg-transparent p-0 font-bold"
              onClick={toggleLogin}
            >
              {login ? "Crie sua conta" : "Faça login"}
            </button>
          </p>

          <Button
            type="submit"
            disabled={isLoading}
            className="hover:bg-primary-blue h-10 w-full rounded-md bg-[#0c29ab] text-sm disabled:opacity-50"
          >
            <LogInIcon className="size-6" />
            {isLoading ? "Carregando..." : login ? "Entrar" : "Criar Conta"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
