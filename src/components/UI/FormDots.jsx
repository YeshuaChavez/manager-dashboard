import React from "react";

export function FormDots({ form }) {
  const c = { W: "#10b981", D: "#f59e0b", L: "#ef4444" };
  return (
    <div className="flex gap-1">
      {form.map((r, i) => (
        <span key={i} className="w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center"
          style={{ background: `${c[r]}22`, border: `1px solid ${c[r]}`, color: c[r] }}>{r}</span>
      ))}
    </div>
  );
}
