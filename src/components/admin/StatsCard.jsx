"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}) {
  const isPositiveTrend = trend === "up" || (trendValue && trendValue > 0);
  const isNegativeTrend = trend === "down" || (trendValue && trendValue < 0);

  return (
    <Card
      className={cn("border border-gray-200 shadow-sm", className)}
      style={{ backgroundColor: "#efece3" }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4" style={{ color: "#736c5f" }} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {(description || trendValue !== undefined) && (
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            {trendValue !== undefined && (
              <div
                className={cn(
                  "flex items-center",
                  isPositiveTrend && "text-green-600",
                  isNegativeTrend && "text-red-600"
                )}
              >
                {isPositiveTrend && <TrendingUp className="h-3 w-3 mr-1" />}
                {isNegativeTrend && <TrendingDown className="h-3 w-3 mr-1" />}
                <span>{Math.abs(trendValue)}%</span>
              </div>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
