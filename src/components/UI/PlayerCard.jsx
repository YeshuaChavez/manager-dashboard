import React from "react";
import { motion } from "framer-motion";
import { CLUB } from "../../constants/mockData";
import { Star, Trophy } from "lucide-react";

export function PlayerCard({ player, className = "", onClick, showStats = true }) {
  const { name, pos, rating, nat, value, stats = {}, image } = player;

  // FUT stats defaults
  const pac = stats.pac || 75;
  const sho = stats.sho || 70;
  const pas = stats.pas || 72;
  const dri = stats.dri || 75;
  const def = stats.def || 50;
  const phy = stats.phy || 70;

  const isGK = pos === "GK";
  const statLabels = isGK
    ? [
        { l: "DIV", v: pac },
        { l: "HAN", v: sho },
        { l: "KIC", v: pas },
        { l: "REF", v: dri },
        { l: "SPD", v: def },
        { l: "POS", v: phy },
      ]
    : [
        { l: "PAC", v: pac },
        { l: "SHO", v: sho },
        { l: "PAS", v: pas },
        { l: "DRI", v: dri },
        { l: "DEF", v: def },
        { l: "PHY", v: phy },
      ];

  // Determine card style based on rating (Gold, Silver, Bronze)
  const isGold = rating >= 88;
  const isSilver = rating >= 82 && rating < 88;

  const cardStyle = isGold
    ? {
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%)",
        borderColor: "rgba(245, 158, 11, 0.4)",
        boxShadow: "0 8px 32px rgba(245, 158, 11, 0.15)",
        badgeColor: "#f59e0b",
      }
    : isSilver
    ? {
        background: "linear-gradient(135deg, rgba(148, 163, 184, 0.15) 0%, rgba(100, 116, 139, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%)",
        borderColor: "rgba(148, 163, 184, 0.4)",
        boxShadow: "0 8px 32px rgba(148, 163, 184, 0.1)",
        badgeColor: "#94a3b8",
      }
    : {
        background: "linear-gradient(135deg, rgba(180, 83, 9, 0.12) 0%, rgba(146, 64, 14, 0.04) 50%, rgba(0, 0, 0, 0.6) 100%)",
        borderColor: "rgba(180, 83, 9, 0.3)",
        boxShadow: "0 8px 32px rgba(180, 83, 9, 0.05)",
        badgeColor: "#b45309",
      };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`relative w-64 h-96 rounded-2xl border backdrop-blur-xl cursor-pointer p-4 overflow-hidden flex flex-col justify-between ${className}`}
      style={{
        background: cardStyle.background,
        borderColor: cardStyle.borderColor,
        boxShadow: cardStyle.boxShadow,
      }}
    >
      {/* Gloss effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* FUT Card Header */}
      <div className="relative z-10 flex justify-between items-start">
        {/* Rating and Position */}
        <div className="flex flex-col items-center">
          <span className="text-4xl font-extrabold tracking-tight" style={{ color: cardStyle.badgeColor, textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            {rating}
          </span>
          <span className="text-xs font-bold bg-white/10 px-1.5 py-0.5 rounded text-white/80 mt-1 uppercase backdrop-blur-sm">
            {pos}
          </span>
          <span className="text-lg mt-1" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}>{nat}</span>
        </div>

        {/* Club Shield / Icon */}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-sm">
          {player.club && player.club !== CLUB.name && player.club !== CLUB.shortName
            ? (isGold
                ? <Star className="w-4 h-4" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                : <Trophy className="w-4 h-4" style={{ color: "#94a3b8" }} />
              )
            : <span className="text-xs">{CLUB.badge}</span>
          }
        </div>
      </div>

      {/* Player Image / Avatar */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pt-4 pb-24">
        {image ? (
          <img
            src={image}
            alt={name}
            className="max-h-full max-w-[85%] object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] select-none"
          />
        ) : (
          <div className="text-8xl opacity-10">👤</div>
        )}
      </div>

      {/* Player Name and Stats */}
      <div className="relative z-10 bg-slate-950/80 border border-white/5 backdrop-blur-md p-3 rounded-xl mt-auto">
        <h3 className="text-center font-black tracking-wide text-sm text-white border-b border-white/10 pb-1.5 uppercase truncate">
          {name}
        </h3>

        {showStats && (
          <div className="grid grid-cols-6 gap-0.5 text-center mt-2">
            {statLabels.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[9px] font-bold text-white/40">{s.l}</span>
                <span className="text-xs font-extrabold text-white">{s.v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
