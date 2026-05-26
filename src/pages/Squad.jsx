import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RatingBadge } from "../components/UI/RatingBadge";
import { fmt } from "../utils/format";

export function Squad({ squad, bench, toast }) {
  const [sortBy, setSortBy] = useState("rating");
  const sorted = [...squad, ...bench].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
  const posColors = { GK: "#f59e0b", CB: "#3b82f6", RB: "#3b82f6", LB: "#3b82f6", CM: "#10b981", DM: "#10b981", AM: "#10b981", ST: "#ef4444", LW: "#8b5cf6", RW: "#8b5cf6" };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 space-y-6"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Plantilla del Club
          </h1>
          <p className="text-sm text-white/40 mt-0.5">
            {sorted.length} Jugadores · Valor del plantel: <strong className="text-emerald-400">{fmt(sorted.reduce((s, p) => s + (p.value || 0), 0))}</strong>
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-white/5">
          {["rating", "goals", "assists", "age"].map(s => (
            <button key={s} onClick={() => setSortBy(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all"
              style={{
                background: sortBy === s ? "rgba(59,130,246,0.15)" : "transparent",
                color: sortBy === s ? "#60a5fa" : "rgba(255,255,255,0.4)",
              }}>
              {s === "rating" ? "Media" : s === "goals" ? "Goles" : s === "assists" ? "Asistencias" : "Edad"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Roster Table */}
      <motion.div variants={itemVariants} className="overflow-x-auto bg-slate-950/40 rounded-2xl border border-white/5 p-4 backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5">
              <th className="text-left pb-3 font-bold pl-2">#</th>
              <th className="text-left pb-3 font-bold">Jugador</th>
              <th className="text-center pb-3 font-bold">Posición</th>
              <th className="text-center pb-3 font-bold">Media</th>
              <th className="text-center pb-3 font-bold">Edad</th>
              <th className="text-center pb-3 font-bold">Goles</th>
              <th className="text-center pb-3 font-bold">Asistencias</th>
              <th className="text-center pb-3 font-bold">Valor</th>
              <th className="text-center pb-3 font-bold pr-2">Forma</th>
            </tr>
          </thead>
          
          <motion.tbody layout>
            <AnimatePresence>
              {sorted.map((p, i) => {
                const col = posColors[p.pos] || "#6b7280";
                return (
                  <motion.tr 
                    key={p.id} 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer group"
                    onClick={() => toast(`${p.name} · ${p.rating} media`, "info")}
                  >
                    <td className="py-3.5 text-white/30 pl-2 text-xs font-bold">{i + 1}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="text-lg filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{p.nat}</span>
                        <div>
                          <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{p.name}</div>
                          {p.contract && <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider mt-0.5">Contrato hasta {p.contract}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-current/25" style={{ background: `${col}12`, color: col }}>
                        {p.pos}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <RatingBadge r={p.rating} />
                    </td>
                    <td className="py-3.5 text-center text-white/60 font-bold text-xs">{p.age}</td>
                    <td className="py-3.5 text-center font-black text-emerald-400 text-xs">{p.goals || 0}</td>
                    <td className="py-3.5 text-center font-black text-blue-400 text-xs">{p.assists || 0}</td>
                    <td className="py-3.5 text-center text-white/50 text-xs font-semibold">{p.value ? fmt(p.value) : "—"}</td>
                    <td className="py-3.5 text-center pr-2">
                      {p.form ? (
                        <div className="flex justify-center gap-0.5">
                          {p.form.map((f, fi) => (
                            <div key={fi} className="w-1 h-4 rounded-full" style={{ background: `hsl(${(f/10)*120},70%,50%)` }} />
                          ))}
                        </div>
                      ) : <span className="text-white/20 text-xs font-bold">—</span>}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
