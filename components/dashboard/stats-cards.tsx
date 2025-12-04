import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy } from "lucide-react";

interface StatsCardsProps {
  totalEntries: number;
  topCategory: string;
}

export default function StatsCards({
  totalEntries,
  topCategory,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Entradas este Mês
          </CardTitle>
          <BookOpen className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEntries}</div>
          <p className="text-muted-foreground text-xs">momentos de gratidão</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Categoria Principal
          </CardTitle>
          <Trophy className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topCategory}</div>
          <p className="text-muted-foreground text-xs">
            sua maior fonte de gratidão
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
