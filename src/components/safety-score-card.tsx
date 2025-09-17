
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck } from "lucide-react";

interface SafetyScoreCardProps {
  score: number;
  showHeatmap: boolean;
  onHeatmapToggle: (show: boolean) => void;
}

export function SafetyScoreCard({ score, showHeatmap, onHeatmapToggle }: SafetyScoreCardProps) {
  const getScoreColor = () => {
    if (score > 85) return "text-green-500";
    if (score > 60) return "text-yellow-500";
    return "text-red-500";
  };

  const circumference = 2 * Math.PI * 18; // 2 * pi * r
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Avg. Safety Score
        </CardTitle>
        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
           <div className="relative h-20 w-20">
             <svg className="h-full w-full" viewBox="0 0 40 40">
                <circle
                    className="text-muted/40"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="18"
                    cx="20"
                    cy="20"
                />
                <circle
                    className={`${getScoreColor()} transition-all duration-500`}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="18"
                    cx="20"
                    cy="20"
                    transform="rotate(-90 20 20)"
                />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-bold ${getScoreColor()}`}>{score}</span>
             </div>
           </div>
           <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="heatmap-toggle" className="text-xs text-muted-foreground">High-Risk Zones</Label>
              <Switch id="heatmap-toggle" checked={showHeatmap} onCheckedChange={onHeatmapToggle} />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
