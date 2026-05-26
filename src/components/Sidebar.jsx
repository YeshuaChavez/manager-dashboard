import React from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Target, 
  ArrowLeftRight, 
  Gamepad2, 
  BarChart3, 
  Users, 
  Trophy 
} from "lucide-react";
import { CLUB } from "../constants/mockData";
import { fmt } from "../utils/format";

export const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",    icon: LayoutDashboard },
  { id: "tactics",     label: "Tácticas",     icon: Target },
  { id: "transfers",   label: "Fichajes",     icon: ArrowLeftRight },
  { id: "match",       label: "Partido",      icon: Gamepad2 },
  { id: "stats",       label: "Estadísticas", icon: BarChart3 },
  { id: "squad",       label: "Plantilla",    icon: Users },
  { id: "league",      label: "Liga",         icon: Trophy },
];

export function Sidebar({ active, setActive }) {
  return (
    <aside className="w-20 md:w-56 flex-shrink-0 flex flex-col border-r border-white/[0.06] relative z-30"
      style={{ background: "rgba(3, 7, 18, 0.6)", backdropFilter: "blur(20px)" }}>
      {/* Logo */}
      <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}
        >
          <Trophy className="w-5 h-5 text-white" />
        </motion.div>
        <div className="hidden md:block">
          <div className="text-xs font-black tracking-widest text-white/90">FOOTBALL</div>
          <div className="text-[10px] tracking-[0.3em] text-white/40">MANAGER SIM</div>
        </div>
      </div>

      <div className="p-3 border-b border-white/[0.06]">
        <div className="hidden md:flex items-center gap-2 px-2.5 py-2 rounded-xl" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
          <span className="text-lg">{CLUB.badge}</span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white/90 truncate">{CLUB.shortName}</div>
            <div className="text-[10px] text-white/40">{CLUB.league}</div>
          </div>
          <div className="ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-md"
            style={{ background: "rgba(16,185,129,0.2)", color: "#6ee7b7" }}>#{CLUB.position}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 flex flex-col gap-1 relative">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button 
              key={item.id} 
              onClick={() => setActive(item.id)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden"
            >
              {/* Animated Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-2 border-blue-500 z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <span className={`text-xl flex-shrink-0 z-10 transition-all ${isActive ? "text-blue-400 scale-110" : "text-white/50 group-hover:text-white/80 group-hover:scale-105"}`}>
                <Icon />
              </span>
              <span className={`hidden md:block text-sm font-medium z-10 transition-all ${isActive ? "text-white font-bold" : "text-white/50 group-hover:text-white/80"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Budget */}
      <div className="p-3 border-t border-white/[0.06]">
        <div className="hidden md:block px-3 py-2.5 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.12)" }}>
          <div className="text-[10px] text-white/40 mb-0.5 tracking-wider font-bold">PRESUPUESTO</div>
          <div className="text-sm font-black" style={{ color: "#6ee7b7" }}>{fmt(CLUB.budget)}</div>
        </div>
      </div>
    </aside>
  );
}
