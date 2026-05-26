import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar, NAV_ITEMS } from "./components/Sidebar";
import { Toast } from "./components/UI/Toast";
import { useToast } from "./hooks/useToast";
import { CLUB, INITIAL_STATS, PLAYERS, BENCH } from "./constants/mockData";
import { fmt } from "./utils/format";

// Page Views
import { Dashboard } from "./pages/Dashboard";
import { Tactics } from "./pages/Tactics";
import { Transfers } from "./pages/Transfers";
import { Match } from "./pages/Match";
import { Stats } from "./pages/Stats";
import { Squad } from "./pages/Squad";
import { League } from "./pages/League";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(INITIAL_STATS);
  const [budget, setBudget] = useState(CLUB.budget);
  const [squad, setSquad] = useState(PLAYERS);
  const [bench, setBench] = useState(BENCH);
  const { toasts, add: toast } = useToast();

  const pages = {
    dashboard: <Dashboard stats={stats} budget={budget} />,
    tactics: <Tactics squad={squad} setSquad={setSquad} bench={bench} setBench={setBench} toast={toast} />,
    transfers: <Transfers squad={squad} setSquad={setSquad} bench={bench} setBench={setBench} budget={budget} setBudget={setBudget} toast={toast} />,
    match: <Match squad={squad} bench={bench} stats={stats} setStats={setStats} toast={toast} />,
    stats: <Stats squad={squad} stats={stats} />,
    squad: <Squad squad={squad} bench={bench} toast={toast} />,
    league: <League />,
  };

  return (
    <div className="min-h-screen flex font-sans" style={{
      background: "radial-gradient(ellipse at 0% 0%, #0d1a2d 0%, #060a10 50%, #0a0614 100%)",
      color: "#e2e8f0",
      fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif",
    }}>
      <Toast toasts={toasts} />
      <Sidebar active={activeTab} setActive={setActiveTab} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-h-screen relative z-10">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-3.5 border-b border-white/[0.05]"
          style={{ background: "rgba(6, 10, 16, 0.8)", backdropFilter: "blur(20px)" }}>
          <div className="text-sm font-semibold text-white/80 flex items-center gap-2">
            {React.createElement(NAV_ITEMS.find(n => n.id === activeTab)?.icon, { className: "text-blue-400 text-lg" })}
            <span>{NAV_ITEMS.find(n => n.id === activeTab)?.label}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-white/30 hidden sm:block">
              <span className="font-semibold" style={{ color: "#6ee7b7" }}>{stats.wins}V</span> · <span className="text-white/40">{stats.draws}E</span> · <span style={{ color: "#fca5a5" }}>{stats.losses}D</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
              <span className="text-xs font-semibold" style={{ color: "#6ee7b7" }}>{fmt(budget)}</span>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black" style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>
              MGR
            </div>
          </div>
        </div>

        {/* Page content with Animated Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {pages[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
