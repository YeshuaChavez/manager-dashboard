import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { MONTHLY_PERF, CLUB } from "../constants/mockData";
import { Target, BarChart2, Trophy, TrendingUp, Crown, Zap, Handshake } from "lucide-react";
import { GlassCard } from "../components/UI/GlassCard";
import { StatBar } from "../components/UI/StatBar";

export function Stats({ squad, stats }) {
  const topScorers = [...squad].sort((a, b) => b.goals - a.goals).slice(0, 8);
  const scorerData = topScorers.map(p => ({ name: p.name.split(" ").pop(), goals: p.goals, assists: p.assists }));

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
      <motion.div variants={itemVariants} className="flex justify-between items-end flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Estadísticas de Temporada
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Desglose de rendimiento del club en {CLUB.season}</p>
        </div>
        <div className="text-xs text-white/40 font-bold uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          {stats.played} Partidos Jugados
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Goles Totales", value: stats.goalsFor, color: "#10b981", icon: Target },
          { label: "Media Goles / Partido", value: (stats.goalsFor / (stats.played || 1)).toFixed(1), color: "#3b82f6", icon: BarChart2 },
          { label: "% Efectividad", value: Math.round((stats.wins / (stats.played || 1)) * 100) + "%", color: "#f59e0b", icon: Trophy },
          { label: "Diferencia de Goles", value: `+${stats.goalsFor - stats.goalsAgainst}`, color: "#8b5cf6", icon: TrendingUp },
        ].map((c, i) => (
          <GlassCard key={i} className="p-4 relative overflow-hidden group hover:scale-[1.03]" glow={c.color}>
            <div className="mb-2">
              {React.createElement(c.icon, { className: "w-6 h-6", style: { color: c.color } })}
            </div>
            <div className="text-3xl font-black tracking-tight" style={{ color: c.color }}>{c.value}</div>
            <div className="text-xs text-white/40 mt-1 uppercase font-bold tracking-wider">{c.label}</div>
          </GlassCard>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Goals by player */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5">
            <h3 className="text-xs font-bold mb-4 text-white/50 uppercase tracking-widest">
              Goles y Asistencias
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={scorerData} layout="vertical" margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={65} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#090d16", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }} />
                <Bar dataKey="goals" name="Goles" fill="#10b981" radius={[0, 4, 4, 0]} />
                <Bar dataKey="assists" name="Asistencias" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Monthly performance trend */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5">
            <h3 className="text-xs font-bold mb-4 text-white/50 uppercase tracking-widest">
              Rendimiento Mensual
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MONTHLY_PERF}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#090d16", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }} />
                <Line type="monotone" dataKey="rating" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 4 }} name="Valoración" />
                <Line type="monotone" dataKey="goals" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: "#f59e0b", strokeWidth: 0, r: 4 }} name="Goles" />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
        
      </div>

      {/* Leaderboard Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5">
            <h3 className="text-xs font-bold mb-4 text-white/50 uppercase tracking-widest flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-500" /> Máximos Anotadores
            </h3>
            <div className="space-y-1">
              {topScorers.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-white/5 border border-white/0 hover:border-white/5">
                  <div className="w-6 text-center font-black text-sm"
                    style={{ color: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#b45309" : "rgba(255,255,255,0.3)" }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">{p.name}</div>
                    <div className="text-[10px] text-white/40">{p.pos} · {p.nat}</div>
                  </div>
                  <div className="flex gap-4 text-xs font-black">
                    <span className="flex items-center gap-1" style={{ color: "#10b981" }}>
                      <Target className="w-3.5 h-3.5" /> {p.goals} G
                    </span>
                    <span className="flex items-center gap-1" style={{ color: "#3b82f6" }}>
                      <Handshake className="w-3.5 h-3.5" /> {p.assists} A
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="p-5">
            <h3 className="text-xs font-bold mb-4 text-white/50 uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-400" /> Racha y Efectividad
            </h3>
            <div className="space-y-4">
              <StatBar label="Victorias Totales" value={stats.wins} max={stats.played || 1} color="#10b981" />
              <StatBar label="Goles Marcados" value={stats.goalsFor} max={100} color="#3b82f6" />
              <StatBar label="Puntos Logrados" value={stats.points} max={84} color="#f59e0b" />
              <StatBar label="Efectividad General (%)" value={Math.round((stats.wins / (stats.played || 1)) * 100)} color="#8b5cf6" />
            </div>
          </GlassCard>
        </motion.div>
        
      </div>
    </motion.div>
  );
}
