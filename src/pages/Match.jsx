import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OPPONENTS, CLUB } from "../constants/mockData";
import { GlassCard } from "../components/UI/GlassCard";
import { GoalTarget } from "../components/UI/GoalTarget";
import { Heatmap } from "../components/UI/Heatmap";
import { Gamepad2, Activity, Target } from "lucide-react";

export function Match({ squad, bench, stats, setStats, toast }) {
  const [phase, setPhase] = useState("pre"); // pre | live | end
  const [minute, setMinute] = useState(0);
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [events, setEvents] = useState([]);
  const [possession, setPossession] = useState({ home: 50, away: 50 });
  const [matchStats, setMatchStats] = useState({ shots: [0, 0], fouls: [0, 0], corners: [0, 0], yellows: [0, 0] });
  const [opponent] = useState(() => OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)]);
  
  // Real-time visual data updated during simulation
  const [shotLocations, setShotLocations] = useState([]);
  const [heatmapPoints, setHeatmapPoints] = useState([]);

  const intervalRef = useRef(null);
  const homeNames = squad.map(p => p.name.split(" ").pop());

  const addEvent = useCallback((min) => {
    const rand = Math.random();
    let ev = null;
    let newShot = null;
    let newHeat = null;

    if (rand < 0.09) {
      // Goal
      const isHome = Math.random() < 0.58;
      const scorer = homeNames[Math.floor(Math.random() * homeNames.length)];
      ev = { 
        min, 
        icon: "⚽", 
        text: isHome ? `¡GOOOOOL! ${scorer} anota un golazo para Barcelona!` : `Gol de cabeza para ${opponent.name}`, 
        type: "goal", 
        team: isHome ? "home" : "away" 
      };
      
      // Update score and stats
      setScore(s => isHome ? { ...s, home: s.home + 1 } : { ...s, away: s.away + 1 });
      setMatchStats(p => ({ ...p, shots: [p.shots[0] + (isHome ? 1 : 0), p.shots[1] + (isHome ? 0 : 1)] }));
      
      // Add shot visual target in top corners or random net zone
      newShot = { 
        id: Date.now(), 
        x: isHome ? Math.floor(Math.random() * 30) + (Math.random() > 0.5 ? 60 : 10) : Math.floor(Math.random() * 80) + 10, 
        y: Math.floor(Math.random() * 35) + 5, 
        isGoal: true 
      };

      // Heatpoint in the attack zone
      newHeat = { x: isHome ? 80 : 20, y: Math.floor(Math.random() * 50) + 25, r: 35, val: 0.95 };

    } else if (rand < 0.16) {
      // Yellow Card / Foul
      const player = homeNames[Math.floor(Math.random() * homeNames.length)];
      ev = { min, icon: "🟨", text: `Tarjeta amarilla: Falta dura de ${player}`, type: "yellow" };
      setMatchStats(prev => ({ ...prev, fouls: [prev.fouls[0] + 1, prev.fouls[1]], yellows: [prev.yellows[0] + 1, prev.yellows[1]] }));
      
      // Heatpoint in the midfield defense
      newHeat = { x: Math.floor(Math.random() * 40) + 20, y: Math.floor(Math.random() * 60) + 20, r: 24, val: 0.75 };

    } else if (rand < 0.23) {
      // substitution
      const p1 = homeNames[Math.floor(Math.random() * homeNames.length)];
      const p2 = bench.length > 0 
        ? bench[Math.floor(Math.random() * bench.length)].name.split(" ").pop()
        : "Canterano";
      ev = { min, icon: "🔄", text: `Cambio: Sale ${p1}, entra ${p2}`, type: "sub" };

    } else if (rand < 0.32) {
      // Corner
      const isHome = Math.random() < 0.6;
      ev = { min, icon: "🚩", text: `Córner cobrado en corto para ${isHome ? "Barcelona" : opponent.name}`, type: "corner" };
      setMatchStats(prev => ({ ...prev, corners: [prev.corners[0] + (isHome ? 1 : 0), prev.corners[1] + (isHome ? 0 : 1)] }));
      
      newHeat = { x: isHome ? 95 : 5, y: Math.random() > 0.5 ? 90 : 10, r: 28, val: 0.65 };

    } else if (rand < 0.40) {
      // Shot Missed
      const isHome = Math.random() < 0.6;
      const player = homeNames[Math.floor(Math.random() * homeNames.length)];
      ev = { min, icon: "😤", text: isHome ? `¡Se la pierde! ${player} saca un tiro desviado` : `Tiro a las gradas por parte de ${opponent.name}`, type: "miss" };
      setMatchStats(prev => ({ ...prev, shots: [prev.shots[0] + (isHome ? 1 : 0), prev.shots[1] + (isHome ? 0 : 1)] }));
      
      // Add red saved shot dot
      newShot = { 
        id: Date.now(), 
        x: Math.floor(Math.random() * 60) + 20, 
        y: Math.floor(Math.random() * 50) + 40, // bottom goal or completely outside (y is height)
        isGoal: false 
      };

      newHeat = { x: isHome ? 85 : 15, y: Math.floor(Math.random() * 40) + 30, r: 30, val: 0.8 };
    }

    if (ev) setEvents(p => [ev, ...p]);
    if (newShot) setShotLocations(prev => [...prev, newShot]);
    if (newHeat) setHeatmapPoints(prev => [...prev, newHeat]);

    setPossession({ home: 45 + Math.floor(Math.random() * 12), away: 55 - Math.floor(Math.random() * 12) });
  }, [homeNames, opponent]);

  const startMatch = () => {
    setPhase("live");
    setMinute(0);
    setScore({ home: 0, away: 0 });
    setEvents([]);
    setShotLocations([]);
    setHeatmapPoints([]);
    setMatchStats({ shots: [0, 0], fouls: [0, 0], corners: [0, 0], yellows: [0, 0] });
    
    intervalRef.current = setInterval(() => {
      setMinute(m => {
        const next = m + 1;
        if (next >= 90) {
          clearInterval(intervalRef.current);
          setPhase("end");
        }
        return next;
      });
    }, 150); // Speed up tick slightly for user engagement
  };

  useEffect(() => {
    if (phase === "live" && minute > 0 && minute % 3 === 0) {
      addEvent(minute);
    }
  }, [minute, phase, addEvent]);

  useEffect(() => {
    if (phase === "end") {
      const isWin = score.home > score.away;
      const isDraw = score.home === score.away;
      setStats(s => ({
        ...s,
        played: s.played + 1,
        wins: s.wins + (isWin ? 1 : 0),
        draws: s.draws + (isDraw ? 1 : 0),
        losses: s.losses + (!isWin && !isDraw ? 1 : 0),
        points: s.points + (isWin ? 3 : isDraw ? 1 : 0),
        goalsFor: s.goalsFor + score.home,
        goalsAgainst: s.goalsAgainst + score.away,
      }));
      toast(isWin ? `🏆 Victoria ${score.home}-${score.away}!` : isDraw ? `🤝 Empate ${score.home}-${score.away}` : `😔 Derrota ${score.home}-${score.away}`, isWin ? "success" : isDraw ? "info" : "error");
    }
  }, [phase]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const eventColors = { goal: "#10b981", yellow: "#f59e0b", red: "#ef4444", sub: "#3b82f6", corner: "#8b5cf6", miss: "#6b7280", save: "#06b6d4", foul: "#f97316" };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Simulador de Partido
          </h1>
          <p className="text-sm text-white/40 mt-0.5">
            {phase === "pre" ? "Partido programado" : phase === "live" ? `En vivo: Minuto ${minute}'` : "Partido finalizado"}
          </p>
        </div>
        {phase === "pre" && (
          <button onClick={startMatch}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Gamepad2 className="w-4 h-4" /> Iniciar Partido
          </button>
        )}
        {phase === "end" && (
          <button onClick={() => setPhase("pre")}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-white/5 hover:bg-white/10 text-white/70 uppercase tracking-wider transition-all border border-white/5"
          >
            Nuevo Encuentro
          </button>
        )}
      </div>

      {/* Main Scoreboard */}
      <GlassCard className="p-6" glow={phase === "live" ? "#10b981" : undefined}>
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="text-4xl mb-2 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{CLUB.badge}</div>
            <div className="font-black text-base md:text-lg text-white">{CLUB.shortName}</div>
            <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-0.5">Casa</div>
          </div>
          
          <div className="text-center px-6 md:px-12">
            {phase === "pre" ? (
              <div className="text-4xl font-black text-white/10 tracking-widest">—:—</div>
            ) : (
              <div className="text-5xl md:text-6xl font-black tracking-tight text-white flex items-center justify-center gap-2">
                <span style={{ color: score.home > score.away ? "#10b981" : "#fff" }}>{score.home}</span>
                <span className="text-white/20">:</span>
                <span style={{ color: score.away > score.home ? "#10b981" : "#fff" }}>{score.away}</span>
              </div>
            )}
            
            {phase === "live" && (
              <div className="mt-2.5 flex items-center gap-2 justify-center bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-black text-red-400 tracking-wider">{minute}'</span>
              </div>
            )}
            {phase === "end" && (
              <div className="text-[10px] text-white/40 font-bold bg-white/5 px-2 py-0.5 rounded uppercase mt-2">
                Tiempo Cumplido
              </div>
            )}
          </div>
          
          <div className="text-center flex-1">
            <div className="text-4xl mb-2 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{opponent.badge}</div>
            <div className="font-black text-base md:text-lg text-white truncate">{opponent.name.split(" ")[0]}</div>
            <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-0.5">Visitante</div>
          </div>
        </div>

        {/* Progress slider bar */}
        {phase !== "pre" && (
          <div className="mt-6">
            <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                style={{ width: `${(minute / 90) * 100}%` }}
                layout
              />
            </div>
            <div className="flex justify-between text-[10px] text-white/30 mt-1.5 uppercase font-bold">
              <span>0'</span><span>Medio Tiempo</span><span>90'</span>
            </div>
          </div>
        )}
      </GlassCard>

      {phase !== "pre" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Match stats & commentary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live commentary feed */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                <Activity className="text-blue-400 text-lg w-5 h-5" />
                <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">
                  Transmisión del Minuto a Minuto
                </h3>
              </div>
              
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {events.length === 0 ? (
                    <div className="flex items-center justify-center h-48 text-white/20 text-xs uppercase tracking-widest font-bold">
                      Balón en juego... esperando incidencias
                    </div>
                  ) : (
                    events.map((ev, i) => (
                      <motion.div 
                        key={ev.id || i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-3 p-3 rounded-xl border border-white/5"
                        style={{ background: `${eventColors[ev.type] || "#6b7280"}08` }}
                      >
                        <span className="text-xl flex-shrink-0">{ev.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white/80 leading-relaxed">{ev.text}</p>
                        </div>
                        <div 
                          className="text-[10px] font-black flex-shrink-0 px-2 py-0.5 rounded-full"
                          style={{ background: `${eventColors[ev.type] || "#6b7280"}22`, color: eventColors[ev.type] || "#6b7280" }}
                        >
                          {ev.min}'
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>

            {/* Target shots coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GoalTarget shots={shotLocations} />
              <Heatmap points={heatmapPoints} />
            </div>
          </div>

          {/* Statistics breakdown */}
          <GlassCard className="p-5 h-full">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-5">
              <Target className="text-emerald-400 text-lg w-5 h-5" />
              <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">
                Estadísticas Generales
              </h3>
            </div>
            
            {[
              { label: "Posesión", home: possession.home, away: possession.away, suffix: "%" },
              { label: "Tiros al Arco", home: matchStats.shots[0], away: matchStats.shots[1] },
              { label: "Faltas Cometidas", home: matchStats.fouls[0], away: matchStats.fouls[1] },
              { label: "Tiros de Esquina", home: matchStats.corners[0], away: matchStats.corners[1] },
              { label: "Tarjetas Amarillas", home: matchStats.yellows[0], away: matchStats.yellows[1] },
            ].map((s, i) => {
              const total = s.home + s.away || 1;
              const homePct = (s.home / total) * 100;
              const awayPct = (s.away / total) * 100;
              
              return (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-white/80">{s.home}{s.suffix || ""}</span>
                    <span className="text-white/40 uppercase text-[10px] tracking-wider">{s.label}</span>
                    <span className="text-white/80">{s.away}{s.suffix || ""}</span>
                  </div>
                  <div className="flex h-1.5 rounded-full overflow-hidden bg-white/5 gap-0.5">
                    <div className="h-full rounded-l-full bg-blue-500 transition-all duration-300" style={{ width: `${homePct}%` }} />
                    <div className="h-full rounded-r-full bg-red-500 transition-all duration-300" style={{ width: `${awayPct}%` }} />
                  </div>
                </div>
              );
            })}
          </GlassCard>
          
        </div>
      )}
    </div>
  );
}
