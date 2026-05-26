import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { CLUB, LEAGUE_TABLE, OPPONENTS, INITIAL_STATS } from "../constants/mockData";
import { GlassCard } from "../components/UI/GlassCard";
import { FormDots } from "../components/UI/FormDots";

export function League() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 space-y-6"
    >
      {/* Title */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          Clasificación La Liga
        </h1>
        <p className="text-sm text-white/40 mt-0.5">Clasificación general de la temporada · Jornada 28</p>
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants}>
        <GlassCard className="overflow-hidden p-4 border border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-2">
                {["#", "Equipo", "PJ", "V", "E", "D", "DG", "Pts", "Forma"].map((h, i) => (
                  <th key={i} className={`py-3 px-4 font-bold ${i < 2 ? "text-left" : "text-center"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEAGUE_TABLE.map((t, i) => (
                <tr key={i} className={`border-b border-white/[0.02] transition-colors hover:bg-white/[0.02] ${t.team === "Barcelona" ? "border-l-2 border-l-blue-500 bg-blue-500/[0.02]" : ""}`}>
                  <td className="py-3 px-4 font-black text-center w-8 text-xs"
                    style={{ color: i === 0 ? "#f59e0b" : i <= 3 ? "#10b981" : "rgba(255,255,255,0.4)" }}>
                    {t.pos}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-bold text-xs ${t.team === "Barcelona" ? "text-blue-400" : "text-white/80"}`}>{t.team}</span>
                  </td>
                  {[t.pl, t.w, t.d, t.l, t.gd > 0 ? `+${t.gd}` : t.gd].map((v, j) => (
                    <td key={j} className="py-3 px-4 text-center text-white/50 font-semibold text-xs">{v}</td>
                  ))}
                  <td className="py-3 px-4 text-center font-black text-xs" style={{ color: "#f59e0b" }}>{t.pts}</td>
                  <td className="py-3 px-4 text-center flex justify-center">
                    <FormDots form={t.form} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </motion.div>

      {/* Row columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Next Opponents */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full">
            <h3 className="text-xs font-bold mb-4 text-white/50 uppercase tracking-widest">
              Próximos Rivales
            </h3>
            <div className="space-y-3">
              {OPPONENTS.map((o, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{o.badge}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">{o.name}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Dificultad de Partido</div>
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="w-2.5 h-2.5 rounded-full"
                        style={{ 
                          background: j < Math.round(o.rating / 20) ? "#ef4444" : "rgba(255,255,255,0.06)",
                          boxShadow: j < Math.round(o.rating / 20) ? "0 0 6px rgba(239, 68, 68, 0.6)" : "none"
                        }} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Results Distribution */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full">
            <h3 className="text-xs font-bold mb-4 text-white/50 uppercase tracking-widest">
              Distribución de Resultados
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart 
                layout="vertical"
                data={[
                  { name: "Victorias (V)", value: INITIAL_STATS.wins }, 
                  { name: "Empates (E)", value: INITIAL_STATS.draws }, 
                  { name: "Derrotas (D)", value: INITIAL_STATS.losses }
                ]}
                margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={true} horizontal={false} />
                <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={80} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ background: "#090d16", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} 
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                  {[
                    { fill: "#10b981" }, 
                    { fill: "#f59e0b" }, 
                    { fill: "#ef4444" }
                  ].map((c, i) => (
                    <Cell key={i} fill={c.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
        
      </div>
    </motion.div>
  );
}
