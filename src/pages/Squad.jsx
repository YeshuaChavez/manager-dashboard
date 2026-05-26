import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RatingBadge } from "../components/UI/RatingBadge";
import { PlayerCard } from "../components/UI/PlayerCard";
import { fmt } from "../utils/format";
import { X, Activity, Award, AlertTriangle, ShieldAlert } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export function Squad({ squad, bench, toast }) {
  const [sortBy, setSortBy] = useState("rating");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
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
                    onClick={() => setSelectedPlayer(p)}
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Modal Dialog */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-3xl rounded-3xl border border-white/10 p-6 flex flex-col md:flex-row gap-6 shadow-2xl items-center" 
              style={{ background: "#060a10", transformPerspective: 1000 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPlayer(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1.5 rounded-lg bg-white/5 border border-white/5 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Player Card */}
              <PlayerCard player={selectedPlayer} showStats={true} className="flex-shrink-0" />

              {/* Right Column: Player Details & Performance */}
              <div className="flex-1 flex flex-col justify-between w-full text-left">
                <div>
                  <span className="text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                    Historial del Jugador
                  </span>
                  
                  <h2 className="text-2xl font-black text-white mt-2 uppercase">{selectedPlayer.name}</h2>
                  <p className="text-xs text-white/40 mt-1">
                    {selectedPlayer.pos} · {selectedPlayer.age} años · {selectedPlayer.nat} Nacional
                  </p>
                  
                  {/* Detailed season stats */}
                  <div className="grid grid-cols-4 gap-2.5 mt-5">
                    {[
                      { l: "Goles", v: selectedPlayer.goals || 0, color: "#10b981", icon: Award },
                      { l: "Asistencias", v: selectedPlayer.assists || 0, color: "#3b82f6", icon: Activity },
                      { l: "T. Amarillas", v: selectedPlayer.yellowCards ?? Math.floor((selectedPlayer.id * 7) % 5), color: "#fbbf24", icon: AlertTriangle },
                      { l: "T. Rojas", v: selectedPlayer.redCards ?? (selectedPlayer.id % 7 === 0 ? 1 : 0), color: "#ef4444", icon: ShieldAlert },
                    ].map((s, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="flex justify-center mb-1">
                          <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                        </div>
                        <div className="text-[9px] text-white/30 mb-0.5 font-bold uppercase truncate">{s.l}</div>
                        <div className="text-sm font-extrabold" style={{ color: s.color }}>{s.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Form Chart */}
                  <div className="mt-5">
                    <h4 className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-2.5">
                      Rendimiento en los Últimos 5 Partidos (Forma)
                    </h4>
                    <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-3 h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={(selectedPlayer.form || [7, 7, 7, 7, 7]).map((f, idx) => ({
                            partido: `P${idx + 1}`,
                            rendimiento: f
                          }))}
                          margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                          <XAxis dataKey="partido" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
                          <YAxis domain={[0, 10]} ticks={[2, 4, 6, 8, 10]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ background: "#090d16", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 10 }}
                            labelStyle={{ color: "#fff" }}
                            itemStyle={{ color: "#60a5fa" }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="rendimiento" 
                            name="Calificación"
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            dot={{ fill: "#3b82f6", strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Additional Info / Actions */}
                <div className="mt-5 flex gap-3 text-[10px] text-white/40 border-t border-white/5 pt-3 justify-between items-center">
                  <span>Valor de Mercado: <strong className="text-white">{selectedPlayer.value ? fmt(selectedPlayer.value) : "—"}</strong></span>
                  <span>Sueldo semanal: <strong className="text-white">{selectedPlayer.wage ? fmt(selectedPlayer.wage || 150000) : "—"}/sem</strong></span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
