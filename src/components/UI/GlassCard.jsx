import React from "react";

export function GlassCard({ children, className = "", glow, onClick }) {
  return (
    <div onClick={onClick}
      className={`rounded-2xl border border-white/[0.07] backdrop-blur-xl transition-all duration-300 ${onClick ? "cursor-pointer hover:border-white/20" : ""} ${className}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        boxShadow: glow ? `0 0 40px ${glow}22, 0 4px 24px #00000040` : "0 4px 24px #00000040",
      }}>
      {children}
    </div>
  );
}
