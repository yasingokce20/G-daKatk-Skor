import { Badge } from "@/components/ui/badge";

type RiskLevel = "safe" | "low" | "moderate" | "high" | "banned";

interface RiskBadgeProps {
  level: RiskLevel;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const config = {
    safe: { label: "Safe", className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" },
    low: { label: "Low Risk", className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800" },
    moderate: { label: "Moderate", className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800" },
    high: { label: "High Risk", className: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800" },
    banned: { label: "Banned", className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800" },
  };

  const { label, className } = config[level] || config.safe;

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}
