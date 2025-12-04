"use client";

import { ShuffleIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRandomPrompt, prompts } from "@/lib/prompts";

export default function DailyPrompt() {
  const [prompt, setPrompt] = useState(prompts[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleShuffle = () => {
    setIsAnimating(true);
    // Simple animation effect
    setTimeout(() => {
      setPrompt(getRandomPrompt());
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Card className="bg-secondary/30 border-secondary mb-6 overflow-hidden">
      <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 rounded-full p-3">
            <SparklesIcon className="text-primary size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-primary font-serif text-lg font-medium">
              Reflexão do Dia
            </h3>
            <p
              className={`text-muted-foreground transition-opacity duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              "{prompt}"
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShuffle}
          className="text-muted-foreground hover:text-primary shrink-0"
        >
          <ShuffleIcon className="mr-2 size-4" />
          Nova Pergunta
        </Button>
      </CardContent>
    </Card>
  );
}
