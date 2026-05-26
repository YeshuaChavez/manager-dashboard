import React from "react";
import { motion } from "framer-motion";

export function GoalTarget({ shots = [], className = "" }) {
  // If no shots are provided, render a default set of mock target positions for demonstration
  const displayShots = shots.length > 0 
    ? shots 
    : [
        { id: 1, x: 15, y: 20, isGoal: true },
        { id: 2, x: 82, y: 15, isGoal: true },
        { id: 3, x: 50, y: 45, isGoal: false },
        { id: 4, x: 28, y: 70, isGoal: false },
        { id: 5, x: 74, y: 80, isGoal: true },
      ];

  return (
    <div className={`relative bg-slate-950/60 border border-white/5 p-4 rounded-2xl backdrop-blur-xl ${className}`}>
      <h3 className="text-xs font-bold mb-3 text-white/50 uppercase tracking-widest">
        Precisión de Tiro (Portería)
      </h3>

      {/* Goal Canvas */}
      <div className="relative w-full aspect-[2.5/1] bg-slate-900/40 rounded-xl overflow-hidden border border-white/10 flex items-end">
        {/* Grass ground line */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900/50 via-emerald-500/50 to-emerald-900/50 border-t border-emerald-400/40 z-10" />

        {/* Goal Post Frame */}
        <svg className="w-full h-full absolute inset-0 z-0" viewBox="0 0 100 40" preserveAspectRatio="none">
          {/* Net grid pattern */}
          <defs>
            <pattern id="net-grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.2"/>
            </pattern>
          </defs>
          
          {/* Back net area */}
          <rect x="10" y="4" width="80" height="36" fill="url(#net-grid)" />
          
          {/* Post frame lines */}
          {/* Left post */}
          <line x1="10" y1="4" x2="10" y2="40" stroke="rgba(255,255,255,0.8)" strokeWidth="0.8" />
          {/* Right post */}
          <line x1="90" y1="4" x2="90" y2="40" stroke="rgba(255,255,255,0.8)" strokeWidth="0.8" />
          {/* Crossbar */}
          <line x1="10" y1="4" x2="90" y2="40" stroke="transparent" /> {/* Helper */}
          <path d="M 10 4 L 90 4" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
          
          {/* Depth / Back posts */}
          <path d="M 10 4 L 14 0 L 86 0 L 90 4" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="1,1" />
        </svg>

        {/* Shoot Targets */}
        <div className="absolute inset-0 z-20">
          {displayShots.map((shot, idx) => {
            // Mapping X and Y coordinates to percentage boundaries
            const left = 10 + (shot.x / 100) * 80; // range 10% to 90%
            const top = 4 + (shot.y / 100) * 36;   // range 4% to 40%

            return (
              <motion.div
                key={shot.id || idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: idx * 0.1 }}
                className="absolute w-5 h-5 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-lg"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  background: shot.isGoal
                    ? "radial-gradient(circle, #10b981 30%, #047857 100%)"
                    : "radial-gradient(circle, #ef4444 30%, #b91c1c 100%)",
                  boxShadow: shot.isGoal
                    ? "0 0 12px rgba(16, 185, 129, 0.8)"
                    : "0 0 12px rgba(239, 68, 68, 0.8)",
                  border: "2px solid rgba(255, 255, 255, 0.8)",
                }}
              >
                <span className="text-[7px] text-white font-extrabold select-none">
                  {shot.isGoal ? "⚽" : "🧤"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-2 text-[10px] text-white/40">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block border border-white/20 shadow-[0_0_4px_#10b981]" />
          <span>Gol</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block border border-white/20 shadow-[0_0_4px_#ef4444]" />
          <span>Fallo / Salvado</span>
        </div>
      </div>
    </div>
  );
}
