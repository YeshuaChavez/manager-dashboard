import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FORMATIONS } from "../constants/mockData";
import { GlassCard } from "../components/UI/GlassCard";
import { RatingBadge } from "../components/UI/RatingBadge";
import { Shirt, Settings } from "lucide-react";

export function Tactics({ squad, setSquad, bench, setBench, toast }) {
  const [formation, setFormation] = useState("4-3-3");
  const [selected, setSelected] = useState(null);
  const [kitType, setKitType] = useState("home"); // home (blue) | away (black/gold)
  const [mentality, setMentality] = useState("Equilibrado");
  const [pressing, setPressing] = useState("Medio");
  const [pressingHeight, setPressingHeight] = useState(37.5);
  const [dragCount, setDragCount] = useState(0);
  
  const fieldRef = useRef(null);
  const pressingTrackRef = useRef(null);

  const changeMentality = (m) => {
    setMentality(m);
    let p = "Medio";
    let h = 37.5;
    if (m === "Defensivo") { p = "Bajo"; h = 12.5; }
    else if (m === "Equilibrado") { p = "Medio"; h = 37.5; }
    else if (m === "Ofensivo") { p = "Alto"; h = 62.5; }
    else if (m === "Total") { p = "Gegenpressing"; h = 87.5; }
    setPressing(p);
    setPressingHeight(h);
    setDragCount(prev => prev + 1);
    toast(`🧠 Mentalidad: ${m} | Línea: ${h.toFixed(0)}%`, "info");
  };

  const changePressing = (p) => {
    setPressing(p);
    let m = "Equilibrado";
    let h = 37.5;
    if (p === "Bajo") { m = "Defensivo"; h = 12.5; }
    else if (p === "Medio") { m = "Equilibrado"; h = 37.5; }
    else if (p === "Alto") { m = "Ofensivo"; h = 62.5; }
    else if (p === "Gegenpressing") { m = "Total"; h = 87.5; }
    setMentality(m);
    setPressingHeight(h);
    setDragCount(prev => prev + 1);
    toast(`⚡ Línea de Presión: ${p} | Altura: ${h.toFixed(0)}%`, "info");
  };

  const handlePressingDragEnd = (event, info) => {
    if (!pressingTrackRef.current) return;
    const rect = pressingTrackRef.current.getBoundingClientRect();
    const rectTop = rect.top + window.scrollY;
    
    const relativeY = info.point.y - rectTop;
    const percentFromBottom = 100 - (relativeY / rect.height) * 100;
    const clampedPercent = Math.max(0, Math.min(100, percentFromBottom));
    
    let p = "Medio";
    let m = "Equilibrado";
    
    if (clampedPercent <= 25) {
      p = "Bajo";
      m = "Defensivo";
    } else if (clampedPercent <= 50) {
      p = "Medio";
      m = "Equilibrado";
    } else if (clampedPercent <= 75) {
      p = "Alto";
      m = "Ofensivo";
    } else {
      p = "Gegenpressing";
      m = "Total";
    }
    
    setPressingHeight(clampedPercent);
    setPressing(p);
    setMentality(m);
    setDragCount(prev => prev + 1);
    toast(`🎯 Línea táctica: ${clampedPercent.toFixed(0)}% (${m} - ${p})`, "success");
  };

  const applyFormation = (f) => {
    const coords = FORMATIONS[f];
    setSquad(prev => prev.map(p => {
      const c = coords.find(c => c.id === p.id);
      return c ? { ...p, x: c.x, y: c.y } : p;
    }));
    setFormation(f);
    toast(`Formación ${f} aplicada`, "success");
  };

  const handleDragEnd = (playerId, event, info) => {
    if (!fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    
    // Posición del contenedor relativa a la página (soporta scroll)
    const rectLeft = rect.left + window.scrollX;
    const rectTop = rect.top + window.scrollY;

    // Calcular posición exacta del puntero relativa al contenedor
    const relativeX = ((info.point.x - rectLeft) / rect.width) * 100;
    const relativeY = ((info.point.y - rectTop) / rect.height) * 100;

    // Limitar dentro de la cancha
    const clampedX = Math.max(5, Math.min(95, relativeX));
    const clampedY = Math.max(5, Math.min(95, relativeY));

    setSquad(prev =>
      prev.map(p => (p.id === playerId ? { ...p, x: clampedX, y: clampedY } : p))
    );
  };

  const swapPlayers = (fieldPlayerId, benchPlayerId) => {
    const fieldPlayer = squad.find(p => p.id === fieldPlayerId);
    const benchPlayer = bench.find(p => p.id === benchPlayerId);
    if (!fieldPlayer || !benchPlayer) return;

    const newFieldPlayer = {
      ...benchPlayer,
      x: fieldPlayer.x,
      y: fieldPlayer.y
    };

    const newBenchPlayer = {
      ...fieldPlayer,
      x: undefined,
      y: undefined
    };

    setSquad(prev => prev.map(p => p.id === fieldPlayerId ? newFieldPlayer : p));
    setBench(prev => prev.map(p => p.id === benchPlayerId ? newBenchPlayer : p));
    setSelected(null);
    toast(`🔄 ${benchPlayer.name} entra por ${fieldPlayer.name}`, "success");
  };

  const handleBenchClick = (benchPlayer) => {
    if (selected) {
      swapPlayers(selected, benchPlayer.id);
    } else {
      toast(`Selecciona primero un jugador titular en el campo para cambiarlo por ${benchPlayer.name}`, "info");
    }
  };

  const fieldPlayers = squad.filter(p => p.x !== undefined && p.y !== undefined);
  const benchPlayers = bench;

  // Kit styling
  const kitStyles = kitType === "home"
    ? {
        bgColor: "linear-gradient(135deg, #004d98 0%, #a50044 100%)",
        borderColor: "#ffed00",
        textColor: "#ffffff"
      }
    : {
        bgColor: "linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)", // Crema / Oro claro (Kobe x Spotify)
        borderColor: "#6d28d9", // Violeta para los bordes
        textColor: "#581c87" // Violeta oscuro para los números
      };

  const posColors = { GK: "#f59e0b", CB: "#3b82f6", RB: "#3b82f6", LB: "#3b82f6", CM: "#10b981", DM: "#10b981", AM: "#10b981", ST: "#ef4444", LW: "#8b5cf6", RW: "#8b5cf6" };

  const getMentalityOverlay = () => {
    const getMentalityConfig = () => {
      switch (mentality) {
        case "Defensivo":
          return {
            color: "text-blue-400",
            glow: "shadow-[0_0_15px_rgba(59,130,246,0.4)] border-blue-500/30",
            label: "DEF",
            arrows: ["↓", "↓", "↓"],
            duration: 1.5,
            direction: 1 // downwards
          };
        case "Equilibrado":
          return {
            color: "text-slate-300",
            glow: "shadow-[0_0_15px_rgba(255,255,255,0.1)] border-white/10",
            label: "BAL",
            arrows: ["⇅"],
            duration: 2.0,
            direction: 0 // static/pulse
          };
        case "Ofensivo":
          return {
            color: "text-amber-400",
            glow: "shadow-[0_0_15px_rgba(245,158,11,0.4)] border-amber-500/30",
            label: "OFE",
            arrows: ["↑", "↑", "↑"],
            duration: 1.2,
            direction: -1 // upwards
          };
        case "Total":
          return {
            color: "text-red-500",
            glow: "shadow-[0_0_20px_rgba(239,68,68,0.6)] border-red-500/40",
            label: "TOT",
            arrows: ["⇈", "⇈", "⇈"],
            duration: 0.8,
            direction: -1 // upwards fast
          };
        default:
          return {
            color: "text-slate-300",
            glow: "shadow-[0_0_15px_rgba(255,255,255,0.1)] border-white/10",
            label: "BAL",
            arrows: ["⇅"],
            duration: 2.0,
            direction: 0
          };
      }
    };

    const cfg = getMentalityConfig();

    return (
      <div 
        className={`absolute left-2 top-[10%] bottom-[10%] w-10 rounded-xl bg-slate-950/80 border flex flex-col items-center justify-between py-3 px-1 backdrop-blur-md z-10 transition-all duration-300 ${cfg.glow}`}
      >
        <span className="text-[8px] font-black tracking-wider text-white/30 uppercase">Ment</span>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
          {cfg.direction === 0 ? (
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: cfg.duration, ease: "easeInOut" }}
              className={`text-lg font-black ${cfg.color}`}
            >
              {cfg.arrows[0]}
            </motion.div>
          ) : (
            <motion.div
              animate={
                cfg.direction === 1 
                  ? { y: [0, 8, 0] } // down
                  : { y: [0, -8, 0] } // up
              }
              transition={{ repeat: Infinity, duration: cfg.duration, ease: "easeInOut" }}
              className={`flex flex-col gap-0.5 font-bold text-[14px] leading-tight ${cfg.color}`}
            >
              {cfg.arrows.map((arr, i) => (
                <span key={i} className="text-center">{arr}</span>
              ))}
            </motion.div>
          )}
        </div>

        <span className={`text-[9px] font-black tracking-widest ${cfg.color}`}>{cfg.label}</span>
      </div>
    );
  };

  const getPressingOverlay = () => {
    const getPressingConfig = () => {
      switch (pressing) {
        case "Bajo":
          return { color: "#3b82f6", glow: "rgba(59, 130, 246, 0.8)", label: "BAJO" };
        case "Medio":
          return { color: "#10b981", glow: "rgba(16, 185, 129, 0.8)", label: "MEDIO" };
        case "Alto":
          return { color: "#f59e0b", glow: "rgba(245, 158, 11, 0.8)", label: "ALTO" };
        case "Gegenpressing":
          return { color: "#ef4444", glow: "rgba(239, 68, 68, 0.8)", label: "GEGEN" };
        default:
          return { color: "#10b981", glow: "rgba(16, 185, 129, 0.8)", label: "MEDIO" };
      }
    };

    const cfg = getPressingConfig();

    return (
      <div 
        className="absolute right-2 top-[10%] bottom-[10%] w-10 rounded-xl bg-slate-950/80 border border-white/5 flex flex-col items-center justify-between py-3 px-1 backdrop-blur-md z-10"
        style={{
          boxShadow: `0 0 15px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.02)`
        }}
      >
        <span className="text-[8px] font-black tracking-wider text-white/30 uppercase">Pres</span>

        {/* The Thermometer Bar */}
        <div 
          ref={pressingTrackRef}
          className="relative flex-1 w-2 my-2 bg-slate-900 border border-white/5 rounded-full overflow-visible flex items-center justify-center"
        >
          {/* Color Gradient Track */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500 via-emerald-500 via-yellow-400 to-red-500 opacity-60" />
          
          {/* Glowing cursor indicator */}
          <motion.div
            key={`${pressing}-${dragCount}`}
            drag="y"
            dragElastic={0}
            dragMomentum={false}
            dragConstraints={pressingTrackRef}
            onDragEnd={handlePressingDragEnd}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-white/90 z-20 flex items-center justify-center cursor-ns-resize"
            style={{
              bottom: `calc(${pressingHeight}% - 8px)`,
              backgroundColor: cfg.color,
              boxShadow: `0 0 12px ${cfg.glow}, 0 0 4px ${cfg.color}`
            }}
          >
            {/* Tiny inner center dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </motion.div>
        </div>

        {/* Continuous height value label */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[9px] font-black text-white/40">{pressingHeight.toFixed(0)}%</span>
          <span className="text-[8px] font-black tracking-widest" style={{ color: cfg.color }}>{cfg.label}</span>
        </div>
      </div>
    );
  };


  return (
    <div className="p-6 space-y-5">
      {/* Title / Formation select */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Pizarra Táctica
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Arrastra los jugadores sobre la cancha para ajustar el esquema</p>
        </div>
        
        <div className="flex gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-white/5">
          {Object.keys(FORMATIONS).map(f => (
            <button key={f} onClick={() => applyFormation(f)}
              className="px-4 py-2 rounded-lg text-xs font-bold transition-all"
              style={{
                background: formation === f ? "linear-gradient(135deg,#3b82f6,#8b5cf6)" : "transparent",
                color: formation === f ? "#fff" : "rgba(255,255,255,0.4)",
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Interactive Soccer Field */}
        <div className="lg:col-span-3">
          <GlassCard className="overflow-hidden border border-white/10 shadow-2xl relative">
            
            {/* The Pitch Container */}
            <div 
              ref={fieldRef}
              className="relative select-none overflow-hidden"
              style={{ 
                paddingTop: "65%", 
                background: "linear-gradient(180deg, #093b0a 0%, #0d520e 35%, #093b0a 70%, #062807 100%)",
                boxShadow: "inset 0 0 100px rgba(0,0,0,0.6)"
              }}
            >
              {/* Field Markings (SVG overlay) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="3" y="3" width="94" height="94" fill="none" stroke="#fff" strokeWidth="0.6"/>
                <circle cx="50" cy="50" r="14" fill="none" stroke="#fff" strokeWidth="0.6"/>
                <circle cx="50" cy="50" r="1" fill="#fff"/>
                <line x1="3" y1="50" x2="97" y2="50" stroke="#fff" strokeWidth="0.6"/>
                {/* Penalty areas */}
                <rect x="20" y="3" width="60" height="16" fill="none" stroke="#fff" strokeWidth="0.6"/>
                <rect x="20" y="81" width="60" height="16" fill="none" stroke="#fff" strokeWidth="0.6"/>
                <rect x="33" y="3" width="34" height="6" fill="none" stroke="#fff" strokeWidth="0.4"/>
                <rect x="33" y="91" width="34" height="6" fill="none" stroke="#fff" strokeWidth="0.4"/>
                {/* Penalty spots */}
                <circle cx="50" cy="11" r="0.8" fill="#fff"/>
                <circle cx="50" cy="89" r="0.8" fill="#fff"/>
              </svg>

              {/* Glowing animated grids on the side */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Mentality vertical panel (left side) */}
              {getMentalityOverlay()}

              {/* Pressing vertical panel (right side) */}
              {getPressingOverlay()}

              {/* Player Jerseys */}
              {fieldPlayers.map(p => {
                const isSel = selected === p.id;
                const col = posColors[p.pos] || "#3b82f6";
                
                return (
                  <motion.div
                    key={`${p.id}-${p.x}-${p.y}`}
                    drag
                    dragElastic={0}
                    dragMomentum={false}
                    dragConstraints={fieldRef}
                    onDragEnd={(e, info) => handleDragEnd(p.id, e, info)}
                    className="absolute cursor-grab active:cursor-grabbing -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    transformTemplate={({ x, y }) => `translate3d(${x}, ${y}, 0) translate(-50%, -50%)`}
                    onClick={() => setSelected(selected === p.id ? null : p.id)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {/* Animated Jersey Circle */}
                      <motion.div
                        animate={isSel ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                        transition={{ repeat: isSel ? Infinity : 0, duration: 1.5 }}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xs md:text-sm font-black border-2 transition-shadow"
                        style={{
                          background: kitStyles.bgColor,
                          borderColor: isSel ? "#fff" : kitStyles.borderColor,
                          color: kitStyles.textColor,
                          boxShadow: isSel 
                            ? `0 0 24px rgba(255,255,255,0.8), 0 0 12px ${col}`
                            : "0 4px 12px rgba(0,0,0,0.6)",
                        }}
                      >
                        {p.rating}
                      </motion.div>
                      
                      {/* Label with name and position */}
                      <div className="px-2 py-0.5 rounded text-[8px] md:text-[10px] font-black whitespace-nowrap"
                        style={{ 
                          background: "rgba(3, 7, 18, 0.85)", 
                          color: isSel ? "#f59e0b" : "#fff", 
                          border: `1px solid ${isSel ? "#f59e0b" : "rgba(255,255,255,0.1)"}`,
                          backdropFilter: "blur(4px)" 
                        }}
                      >
                        {p.name.split(" ").pop()} <span className="opacity-60">({p.pos})</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
          <p className="text-[10px] text-white/30 mt-3 text-center uppercase tracking-widest font-bold">
            Arrastra directamente las camisetas para reubicarlas · Haz click sobre ellas para seleccionarlas
          </p>
        </div>

        {/* Tactical controls & Bench sidebar */}
        <div className="flex flex-col gap-5">
          {/* Kit Selector */}
          <GlassCard className="p-4">
            <div className="text-xs text-white/40 mb-3 uppercase tracking-wider font-bold">Kit Equipación</div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setKitType("home")}
                className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${kitType === "home" ? "bg-blue-600/20 border-blue-500 text-blue-400" : "bg-white/5 border-transparent text-white/40"}`}
              >
                <Shirt className="w-4 h-4" /> Titular
              </button>
              <button 
                onClick={() => setKitType("away")}
                className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${kitType === "away" ? "bg-amber-600/20 border-amber-500 text-amber-400" : "bg-white/5 border-transparent text-white/40"}`}
              >
                <Shirt className="w-4 h-4" /> Alterno
              </button>
            </div>
          </GlassCard>

          {/* Mentality */}
          <GlassCard className="p-4">
            <div className="text-xs text-white/40 mb-3 uppercase tracking-wider font-bold">Mentalidad de Juego</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Defensivo", label: "Defensivo ↓↓↓" },
                { name: "Equilibrado", label: "Equilibrado ⇅" },
                { name: "Ofensivo", label: "Ofensivo ↑↑↑" },
                { name: "Total", label: "Total ⇈⇈⇈" }
              ].map(({ name, label }) => (
                <button key={name} onClick={() => changeMentality(name)}
                  className="py-1.5 rounded-lg text-[10px] font-bold border transition-all uppercase"
                  style={{
                    background: mentality === name ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.03)",
                    color: mentality === name ? "#60a5fa" : "rgba(255,255,255,0.4)",
                    borderColor: mentality === name ? "#3b82f6" : "transparent",
                  }}>{label}</button>
              ))}
            </div>
          </GlassCard>

          {/* Pressing */}
          <GlassCard className="p-4">
            <div className="text-xs text-white/40 mb-3 uppercase tracking-wider font-bold">Línea de Presión</div>
            <div className="flex flex-col gap-2">
              {[
                { name: "Bajo", dotColor: "#3b82f6" },
                { name: "Medio", dotColor: "#10b981" },
                { name: "Alto", dotColor: "#f59e0b" },
                { name: "Gegenpressing", dotColor: "#ef4444" }
              ].map(({ name, dotColor }) => (
                <button key={name} onClick={() => changePressing(name)}
                  className="py-1.5 px-3 rounded-lg text-[10px] font-bold border transition-all text-left uppercase flex items-center justify-between"
                  style={{
                    background: pressing === name ? `${dotColor}20` : "rgba(255,255,255,0.03)",
                    color: pressing === name ? dotColor : "rgba(255,255,255,0.4)",
                    borderColor: pressing === name ? dotColor : "transparent",
                  }}
                >
                  <span>{name}</span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Substitutes */}
          <GlassCard className="p-4 flex-1 overflow-y-auto max-h-72 lg:max-h-none">
            <div className="text-xs text-white/40 mb-3 uppercase tracking-wider font-bold">Suplentes disponibles</div>
            <div className="space-y-2">
              {benchPlayers.map(p => {
                const col = posColors[p.pos] || "#3b82f6";
                return (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-white/5 border border-white/0 hover:border-white/5 cursor-pointer group"
                    onClick={() => handleBenchClick(p)}>
                    <RatingBadge r={p.rating} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white/90 truncate">{p.name}</div>
                      <div className="text-[9px]" style={{ color: col }}>{p.pos} · {p.age} Años</div>
                    </div>
                    <div className="text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity pr-1 font-extrabold">→</div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
        
      </div>
    </div>
  );
}
