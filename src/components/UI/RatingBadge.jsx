import React from "react";

export function RatingBadge({ r }) {
  const color = r >= 90 ? "#f59e0b" : r >= 85 ? "#10b981" : r >= 80 ? "#3b82f6" : "#6b7280";
  return (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold"
      style={{ background: `${color}22`, border: `1px solid ${color}`, color }}>
      {r}
    </span>
  );
}
