import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MARKET_PLAYERS, CLUB } from "../constants/mockData";
import { PlayerCard } from "../components/UI/PlayerCard";
import { GlassCard } from "../components/UI/GlassCard";
import { RatingBadge } from "../components/UI/RatingBadge";
import { fmt } from "../utils/format";
import { Search, ArrowUpRight, ArrowDownLeft, ArrowUpDown, X, Activity, Award, AlertTriangle, ShieldAlert } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export function Transfers({ squad, setSquad, bench, setBench, budget, setBudget, toast }) {
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("ALL");
  const [modal, setModal] = useState(null);
  const [market, setMarket] = useState(MARKET_PLAYERS);
  const [tab, setTab] = useState("buy"); // buy | sell
  const [sortBy, setSortBy] = useState(null); // null | 'value' | 'rating'
  const [sortDir, setSortDir] = useState("desc"); // 'desc' | 'asc'

  const POS_OPTIONS = ["ALL", "GK", "CB", "LB", "RB", "CM", "DM", "AM", "LW", "RW", "ST"];

  const filteredMarket = market.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                        p.club.toLowerCase().includes(search.toLowerCase());
    const matchPos = posFilter === "ALL" || p.pos === posFilter;
    return matchSearch && matchPos;
  });

  const sortedMarket = sortBy === null
    ? filteredMarket
    : [...filteredMarket].sort((a, b) => {
        const fieldA = sortBy === "value" ? a.value : a.rating;
        const fieldB = sortBy === "value" ? b.value : b.rating;
        return sortDir === "desc" ? fieldB - fieldA : fieldA - fieldB;
      });

  const toggleSort = (field) => {
    if (sortBy === field) {
      if (field === "value") {
        if (sortDir === "asc") {
          setSortDir("desc");
        } else {
          setSortBy(null);
        }
      } else {
        if (sortDir === "desc") {
          setSortDir("asc");
        } else {
          setSortBy(null);
        }
      }
    } else {
      setSortBy(field);
      setSortDir(field === "value" ? "asc" : "desc");
    }
  };

  const buyPlayer = (player) => {
    if (budget < player.value) { 
      toast("¡Presupuesto insuficiente!", "error"); 
      return; 
    }
    setBudget(b => b - player.value);
    setMarket(m => m.filter(p => p.id !== player.id));
    setBench(b => [...b, { ...player, club: CLUB.shortName }]);
    toast(`✅ ${player.name} fichado por ${fmt(player.value)} y agregado al banquillo`, "success");
    setModal(null);
  };

  const sellPlayer = (player) => {
    const sellPrice = Math.floor(player.value * 0.85);
    setBudget(b => b + sellPrice);
    setSquad(s => s.filter(p => p.id !== player.id));
    setBench(b => b.filter(p => p.id !== player.id));
    setMarket(m => [...m, { ...player, club: CLUB.shortName }]);
    toast(`💰 ${player.name} vendido por ${fmt(sellPrice)}`, "success");
    setModal(null);
  };

  const getPlayerForm = (player) => {
    if (player.form) return player.form;
    const base = Math.max(5, Math.min(9, Math.round(player.rating / 10)));
    return [base, base - 1, base, base + 1, base].map(v => Math.max(4, Math.min(10, v)));
  };

  const getPlayerYellowCards = (player) => {
    if (player.yellowCards !== undefined) return player.yellowCards;
    return Math.floor((player.id * 7) % 5);
  };

  const getPlayerRedCards = (player) => {
    if (player.redCards !== undefined) return player.redCards;
    return player.id % 13 === 0 ? 1 : 0;
  };

  return (
    <div className="p-6 space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Mercado de Fichajes
          </h1>
          <p className="text-sm text-white/40 mt-0.5">
            Presupuesto disponible: <span style={{ color: "#10b981" }} className="font-extrabold">{fmt(budget)}</span>
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-white/5">
          <button onClick={() => setTab("buy")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 uppercase ${tab === "buy" ? "bg-blue-600/20 border border-blue-500 text-blue-400" : "text-white/40"}`}>
            <ArrowUpRight className="w-4 h-4" /> Comprar
          </button>
          <button onClick={() => setTab("sell")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 uppercase ${tab === "sell" ? "bg-amber-600/20 border border-amber-500 text-amber-400" : "text-white/40"}`}>
            <ArrowDownLeft className="w-4 h-4" /> Vender
          </button>
        </div>
      </div>

      {tab === "buy" && (
        <>
          {/* Filters Panel */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por jugador o club..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:border-white/20"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }} />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                <Search className="w-4 h-4" />
              </span>
            </div>
            
            <div className="flex gap-1 flex-wrap">
              {POS_OPTIONS.map(p => (
                <button key={p} onClick={() => setPosFilter(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: posFilter === p ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.03)",
                    color: posFilter === p ? "#60a5fa" : "rgba(255,255,255,0.35)",
                    border: `1px solid ${posFilter === p ? "#3b82f680" : "transparent"}`,
                  }}>{p}</button>
              ))}
            </div>

            {/* Sort by value */}
            <button onClick={() => toggleSort("value")}
              className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
              style={{
                background: sortBy === "value" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
                color: sortBy === "value" ? "#34d399" : "rgba(255,255,255,0.35)",
                border: `1px solid ${sortBy === "value" ? "#10b98180" : "transparent"}`,
              }}>
              <ArrowUpDown className="w-3.5 h-3.5" />
              Precio {sortBy === "value" ? (sortDir === "asc" ? "↓" : "↑") : ""}
            </button>

            {/* Sort by rating */}
            <button onClick={() => toggleSort("rating")}
              className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
              style={{
                background: sortBy === "rating" ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.03)",
                color: sortBy === "rating" ? "#fbbf24" : "rgba(255,255,255,0.35)",
                border: `1px solid ${sortBy === "rating" ? "#f59e0b80" : "transparent"}`,
              }}>
              <ArrowUpDown className="w-3.5 h-3.5" />
              Valoración {sortBy === "rating" ? (sortDir === "desc" ? "↑" : "↓") : ""}
            </button>
          </div>

          {/* FUT Grid */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          >
            <AnimatePresence mode="popLayout">
              {sortedMarket.map((p, idx) => (
                <motion.div
                  key={`${p.id}-${sortBy}-${sortDir}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                >
                  <PlayerCard 
                    player={p} 
                    onClick={() => setModal(p)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {tab === "sell" && (
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
        >
          <AnimatePresence>
            {[...squad, ...bench].filter(p => p.image).map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
              >
                <PlayerCard 
                  player={p} 
                  onClick={() => setModal({ ...p, action: "sell" })}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal(null)}
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
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1.5 rounded-lg bg-white/5 border border-white/5 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column FUT card */}
              <PlayerCard player={modal} showStats={true} className="flex-shrink-0" />

              {/* Right Column details */}
              <div className="flex-1 flex flex-col justify-between w-full text-left">
                <div>
                  <span className="text-[9px] bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                    {modal.action === "sell" ? "Oferta Recibida" : "Detalle de Contrato"}
                  </span>
                  
                  <h2 className="text-2xl font-black text-white mt-2 uppercase">{modal.name}</h2>
                  <p className="text-xs text-white/40 mt-1">{modal.club || CLUB.shortName} · {modal.age} años · {modal.pos}</p>
                  
                  {/* Detailed season stats */}
                  <div className="grid grid-cols-4 gap-2.5 mt-5">
                    {[
                      { l: "Goles", v: modal.goals || 0, color: "#10b981", icon: Award },
                      { l: "Asistencias", v: modal.assists || 0, color: "#3b82f6", icon: Activity },
                      { l: "T. Amarillas", v: getPlayerYellowCards(modal), color: "#fbbf24", icon: AlertTriangle },
                      { l: "T. Rojas", v: getPlayerRedCards(modal), color: "#ef4444", icon: ShieldAlert },
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
                    <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-3 h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={getPlayerForm(modal).map((f, idx) => ({
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
                <div className="mt-4 flex gap-3 text-[10px] text-white/40 justify-between items-center border-t border-white/5 pt-3">
                  <span>Valor: <strong className="text-emerald-400 font-extrabold">{fmt(modal.action === "sell" ? Math.floor(modal.value * 0.85) : modal.value)}</strong></span>
                  <span>Sueldo: <strong className="text-blue-400 font-extrabold">{fmt(modal.wage || 180000)}/sem</strong></span>
                </div>

                {/* Confirm / Cancel buttons */}
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => setModal(null)} 
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/5 hover:bg-white/10 text-white/50 hover:text-white uppercase transition-all"
                  >
                    Volver
                  </button>
                  {modal.action === "sell" ? (
                    <button 
                      onClick={() => sellPlayer(modal)} 
                      className="flex-1 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white uppercase transition-all"
                    >
                      Confirmar Venta
                    </button>
                  ) : (
                    <button 
                      onClick={() => buyPlayer(modal)} 
                      className="flex-1 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white uppercase transition-all"
                    >
                      Confirmar Fichaje
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
