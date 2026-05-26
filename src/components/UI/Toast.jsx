import React from "react";

export function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className="pointer-events-auto px-5 py-3 rounded-xl border text-sm font-medium backdrop-blur-xl shadow-2xl animate-slide-in"
          style={{
            background: t.type === "success" ? "rgba(16,185,129,0.18)" : t.type === "error" ? "rgba(239,68,68,0.18)" : "rgba(59,130,246,0.18)",
            borderColor: t.type === "success" ? "#10b981" : t.type === "error" ? "#ef4444" : "#3b82f6",
            color: t.type === "success" ? "#6ee7b7" : t.type === "error" ? "#fca5a5" : "#93c5fd",
          }}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
