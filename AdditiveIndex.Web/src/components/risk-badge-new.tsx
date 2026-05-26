import { cn } from "@/lib/utils";

type RiskLevel = "safe" | "low" | "moderate" | "high" | "banned";

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: "sm" | "md";
}

const riskConfig = {
  safe: {
    label: "Güvenli",
    bgColor: "bg-[#00855d]",
    textColor: "text-white",
    icon: "check",
  },
  low: {
    label: "Düşük Risk",
    bgColor: "bg-[#006948]",
    textColor: "text-white",
    icon: "check_circle",
  },
  moderate: {
    label: "Dikkat",
    bgColor: "bg-[#fe932c]",
    textColor: "text-[#663500]",
    icon: "warning",
  },
  high: {
    label: "Yüksek Risk",
    bgColor: "bg-[#e02928]",
    textColor: "text-white",
    icon: "error",
  },
  banned: {
    label: "Zararlı",
    bgColor: "bg-[#bb0112]",
    textColor: "text-white",
    icon: "close",
  },
};

export function RiskBadge({ level, showIcon = true, size = "md" }: RiskBadgeProps) {
  const config = riskConfig[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
        config.bgColor,
        config.textColor
      )}
    >
      {showIcon && (
        <span className="material-symbols-outlined text-[16px]">
          {config.icon}
        </span>
      )}
      {config.label}
    </span>
  );
}

export function RiskDot({ level }: { level: RiskLevel }) {
  const dotColors = {
    safe: "bg-[#00855d]",
    low: "bg-[#006948]",
    moderate: "bg-[#fe932c]",
    high: "bg-[#e02928]",
    banned: "bg-[#bb0112]",
  };

  return (
    <span className={cn("w-3 h-3 rounded-full", dotColors[level])} />
  );
}
