export interface Diario {
  id: string;
  title: string;
  description: string;
  type: "Família" | "Trabalho" | "Religioso" | "Outros";
  image: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  streak: number;
  lastLogDate?: Date | null;
}
