import React from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle2, Target, Calendar, Handshake, XCircle } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { CLUB, OPPONENTS, MONTHLY_PERF, RADAR_DATA } from "../constants/mockData";
import { GlassCard } from "../components/UI/GlassCard";
import { AnimNum } from "../components/UI/AnimNum";
import { StatBar } from "../components/UI/StatBar";
import { GoalTarget } from "../components/UI/GoalTarget";
import { Heatmap } from "../components/UI/Heatmap";

export function Dashboard({ stats, budget }) {
  const nextOpponent = OPPONENTS[0]; // FC Barcelona

  const CARDS = [
    { label: "Puntos", value: stats.points, icon: Trophy, color: "#f59e0b", suffix: "pts" },
    { label: "Victorias", value: stats.wins, icon: CheckCircle2, color: "#10b981" },
    { label: "Goles Marcados", value: stats.goalsFor, icon: Target, color: "#3b82f6" },
    { label: "Partidos Jugados", value: stats.played, icon: Calendar, color: "#8b5cf6" },
    { label: "Empates", value: stats.draws, icon: Handshake, color: "#6b7280" },
    { label: "Derrotas", value: stats.losses, icon: XCircle, color: "#ef4444" },
  ];

  // Radar data for the AI-Assisted Player Report (Pedri)
  const pedriRadarData = [
    { attr: "Ataque", value: 80 },
    { attr: "Defensa", value: 68 },
    { attr: "Pase", value: 89 },
    { attr: "Regate", value: 90 },
    { attr: "Físico", value: 72 },
    { attr: "Velocidad", value: 78 },
  ];

  // Container variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
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
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
            Manager's Dashboard
          </h1>
          <p className="text-sm text-white/40 mt-0.5">{CLUB.name} · Temporada {CLUB.season}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Liga</div>
          <div className="text-4xl font-black" style={{ color: "#f59e0b" }}>#{stats.position || 1}</div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {CARDS.map((c, i) => (
          <GlassCard key={i} className="p-4 relative overflow-hidden group hover:scale-[1.03]" glow={c.color}>
            <div className="mb-2">
              {React.createElement(c.icon, { className: "w-6 h-6", style: { color: c.color } })}
            </div>
            <div className="text-3xl font-black tracking-tight" style={{ color: c.color }}>
              <AnimNum value={c.value} suffix={c.suffix ? ` ${c.suffix}` : ""} />
            </div>
            <div className="text-xs text-white/40 mt-1 uppercase font-bold tracking-wider">{c.label}</div>
            {/* Subtle light effect on hover */}
            <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </GlassCard>
        ))}
      </motion.div>

      {/* Main dashboard columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Monthly performance, Morale, Next Match */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Performance chart */}
          <GlassCard className="p-5">
            <h3 className="text-sm font-bold mb-4 text-white/70 uppercase tracking-wider">Rendimiento mensual</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={MONTHLY_PERF}>
                <defs>
                  <linearGradient id="gW" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#090d16", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }} />
                <Area type="monotone" dataKey="wins" stroke="#10b981" fill="url(#gW)" strokeWidth={2.5} name="Victorias" />
                <Area type="monotone" dataKey="goals" stroke="#3b82f6" fill="url(#gG)" strokeWidth={2.5} name="Goles" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Next Match Card */}
          <GlassCard className="p-5 relative overflow-hidden" glow="#8b5cf6">
            <div className="text-xs text-white/40 mb-3 uppercase font-bold tracking-wider">Próximo Partido</div>
            <div className="flex items-center justify-between relative z-10">
              <div className="text-center">
                <div className="text-4xl mb-1 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{CLUB.badge}</div>
                <div className="text-xs font-black text-white">{CLUB.shortName}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-[10px] text-white/40 mb-1 font-bold">VS</div>
                <div className="text-2xl font-black text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20">LIGA</div>
                <div className="text-[9px] text-white/30 mt-1.5 uppercase font-bold">Jornada 29</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-1 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{nextOpponent.badge}</div>
                <div className="text-xs font-black text-white truncate max-w-[70px]">{nextOpponent.name.split(" ")[0]}</div>
              </div>
            </div>
            {/* Field graphic overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0" />
          </GlassCard>

          {/* Morale and status */}
          <GlassCard className="p-5">
            <div className="text-xs text-white/40 mb-4 uppercase font-bold tracking-wider">Estado del Plantel</div>
            <div className="space-y-3.5">
              <StatBar label="Moral General" value={stats.morale} color="#10b981" />
              <StatBar label="Condición Física" value={85} color="#3b82f6" />
              <StatBar label="Confianza de Directiva" value={82} color="#f59e0b" />
            </div>
          </GlassCard>
        </motion.div>

        {/* Center Column: AI-Assisted Player Report (FUT Details & Radar) */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full flex flex-col justify-between relative overflow-hidden" glow="#3b82f6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div>
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2">
                AI-Assisted Player Report
              </h3>
              <p className="text-xs text-white/40 mb-4">Análisis detallado de rendimiento individual (Estrella Destacada)</p>
            </div>

            {/* Pedri Avatar render */}
            <div className="flex-1 flex flex-col items-center justify-center my-4 relative">
              <div className="relative w-48 h-48 flex items-center justify-center rounded-full bg-slate-900/40 border border-white/5 overflow-hidden shadow-2xl">
                <img 
                  src="/players/pedri.png" 
                  alt="Pedri" 
                  className="w-full h-full object-cover object-top scale-105 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                />
              </div>
              <div className="text-center mt-3">
                <h4 className="text-base font-extrabold text-white">Pedri</h4>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Centrocampista (CM) · FCB</p>
              </div>
            </div>

            {/* Player attributes Radar chart */}
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={170}>
                <RadarChart data={pedriRadarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="attr" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: "bold" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Pedri" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40">
              <span>Habilidad Promedio: <strong className="text-white">88</strong></span>
              <span className="text-blue-400 font-bold uppercase">Estado: Excelente</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Right Column: Goal shooting target, Activity Heatmap & Budget */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Goal target accuracy */}
          <GoalTarget />

          {/* Activity Heatmap */}
          <Heatmap />

          {/* Budget Breakdown */}
          <GlassCard className="p-5">
            <div className="text-xs text-white/40 mb-2 uppercase font-bold tracking-wider">PRESUPUESTO DISPONIBLE</div>
            <div className="text-3xl font-black mb-3 text-emerald-400 tracking-tight">
              <AnimNum value={budget} prefix="€" />
            </div>
            <div className="space-y-2">
              {[
                { label: "Presupuesto Fichajes", pct: 65, color: "#10b981" },
                { label: "Fondo de Emergencia", pct: 20, color: "#3b82f6" },
                { label: "Mantenimiento Estadio", pct: 15, color: "#8b5cf6" },
              ].map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-0.5 font-bold">
                    <span className="text-white/40">{b.label}</span>
                    <span style={{ color: b.color }}>{b.pct}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${b.pct}%`, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </motion.div>
  );
}
