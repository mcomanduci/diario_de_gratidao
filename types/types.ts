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
