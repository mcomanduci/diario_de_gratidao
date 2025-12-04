"use client";

import { useEffect, useState } from "react";
import { getMonthlyStats } from "@/actions/diarios";
import StatsCards from "./stats-cards";
import MonthlyChart from "./monthly-chart";
import { Loader2 } from "lucide-react";

interface StatsData {
  totalEntries: number;
  topCategory: string;
  chartData: { day: string; entries: number }[];
  categoryData: { name: string; value: number }[];
}

export default function InsightsView() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const result = await getMonthlyStats();
        if (result.success && result.stats) {
          setStats(result.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <div>Não foi possível carregar as estatísticas.</div>;
  }

  return (
    <div className="space-y-4">
      <StatsCards
        totalEntries={stats.totalEntries}
        topCategory={stats.topCategory}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <MonthlyChart data={stats.chartData} />
        </div>
        {/* Future: Add Pie Chart for Categories here */}
      </div>
    </div>
  );
}
