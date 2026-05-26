$ErrorActionPreference = "Stop"

$content = Get-Content -Raw -Path "main.jsx"

function Get-BlockByStartEnd($text, $startNeedle, $endNeedle) {
  $start = $text.IndexOf($startNeedle)
  if ($start -lt 0) { throw "Start not found: $startNeedle" }
  $end = $text.IndexOf($endNeedle, $start)
  if ($end -lt 0) { throw "End not found: $endNeedle" }
  return $text.Substring($start, $end - $start).Trim()
}

function Get-FunctionBlock($text, $name) {
  $idx = $text.IndexOf("function $name")
  if ($idx -lt 0) { throw "Function not found: $name" }
  $brace = $text.IndexOf("{", $idx)
  $depth = 0
  for ($i = $brace; $i -lt $text.Length; $i++) {
    $ch = $text[$i]
    if ($ch -eq "{") {
      $depth++
    } elseif ($ch -eq "}") {
      $depth--
      if ($depth -eq 0) {
        $end = $i + 1
        if ($end -lt $text.Length -and $text[$end] -eq ";") { $end++ }
        return $text.Substring($idx, $end - $idx).Trim()
      }
    }
  }
  throw "Function block not closed: $name"
}

function Get-DefaultFunctionBlock($text, $name) {
  $idx = $text.IndexOf("export default function $name")
  if ($idx -lt 0) { throw "Default function not found: $name" }
  $brace = $text.IndexOf("{", $idx)
  $depth = 0
  for ($i = $brace; $i -lt $text.Length; $i++) {
    $ch = $text[$i]
    if ($ch -eq "{") {
      $depth++
    } elseif ($ch -eq "}") {
      $depth--
      if ($depth -eq 0) {
        return $text.Substring($idx, $i + 1 - $idx).Trim()
      }
    }
  }
  throw "Default function block not closed: $name"
}

New-Item -ItemType Directory -Force -Path "src", "src/data", "src/utils", "src/hooks", "src/components", "src/components/ui", "src/components/layout", "src/pages" | Out-Null

$data = Get-BlockByStartEnd $content "const CLUB" "function Toast"
$data = $data -replace "(?m)^const (CLUB|INITIAL_STATS|PLAYERS|BENCH|MARKET_PLAYERS|LEAGUE_TABLE|MONTHLY_PERF|RADAR_DATA|FORMATIONS|MATCH_EVENTS_POOL|OPPONENTS|fmt)\s*=", "export const `$1 ="
$data = $data -replace "\r?\nexport const fmt[\s\S]*$", ""
Set-Content -Path "src/data/mockData.js" -Value $data -Encoding utf8

@'
export const fmt = (n) => n >= 1_000_000
  ? `â‚¬${(n / 1_000_000).toFixed(1)}M`
  : `â‚¬${(n / 1_000).toFixed(0)}K`;
'@ | Set-Content -Path "src/utils/format.js" -Encoding utf8

$toast = Get-FunctionBlock $content "Toast"
$toast = $toast -replace "^function Toast", "export default function Toast"
Set-Content -Path "src/components/ui/Toast.jsx" -Value $toast -Encoding utf8

$useToast = Get-FunctionBlock $content "useToast"
$useToast = $useToast -replace "^function useToast", "export default function useToast"
@"
import { useCallback, useState } from "react";

$useToast
"@ | Set-Content -Path "src/hooks/useToast.js" -Encoding utf8

$animNum = Get-FunctionBlock $content "AnimNum"
$animNum = $animNum -replace "^function AnimNum", "export default function AnimNum"
@"
import { useEffect, useState } from "react";

$animNum
"@ | Set-Content -Path "src/components/ui/AnimNum.jsx" -Encoding utf8

$ratingBadge = Get-FunctionBlock $content "RatingBadge"
$ratingBadge = $ratingBadge -replace "^function RatingBadge", "export default function RatingBadge"
Set-Content -Path "src/components/ui/RatingBadge.jsx" -Value $ratingBadge -Encoding utf8

$formDots = Get-FunctionBlock $content "FormDots"
$formDots = $formDots -replace "^function FormDots", "export default function FormDots"
Set-Content -Path "src/components/ui/FormDots.jsx" -Value $formDots -Encoding utf8

$statBar = Get-FunctionBlock $content "StatBar"
$statBar = $statBar -replace "^function StatBar", "export default function StatBar"
Set-Content -Path "src/components/ui/StatBar.jsx" -Value $statBar -Encoding utf8

$glassCard = Get-FunctionBlock $content "GlassCard"
$glassCard = $glassCard -replace "^function GlassCard", "export default function GlassCard"
Set-Content -Path "src/components/ui/GlassCard.jsx" -Value $glassCard -Encoding utf8

$navItems = Get-BlockByStartEnd $content "const NAV_ITEMS" "function Sidebar"
$navItems = $navItems -replace "^const NAV_ITEMS", "export const NAV_ITEMS"
$sidebar = Get-FunctionBlock $content "Sidebar"
$sidebar = $sidebar -replace "^function Sidebar", "export default function Sidebar"
@"
import { CLUB } from "../../data/mockData";
import { fmt } from "../../utils/format";

$navItems

$sidebar
"@ | Set-Content -Path "src/components/layout/Sidebar.jsx" -Encoding utf8

$dashboard = Get-FunctionBlock $content "Dashboard"
$dashboard = $dashboard -replace "^function Dashboard", "export default function Dashboard"
@"
import { Area, AreaChart, CartesianGrid, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CLUB, MONTHLY_PERF, OPPONENTS, RADAR_DATA } from "../data/mockData";
import { fmt } from "../utils/format";
import AnimNum from "../components/ui/AnimNum";
import GlassCard from "../components/ui/GlassCard";
import StatBar from "../components/ui/StatBar";

$dashboard
"@ | Set-Content -Path "src/pages/Dashboard.jsx" -Encoding utf8

$tactics = Get-FunctionBlock $content "Tactics"
$tactics = $tactics -replace "^function Tactics", "export default function Tactics"
@"
import { useRef, useState } from "react";
import { BENCH, FORMATIONS, PLAYERS } from "../data/mockData";
import GlassCard from "../components/ui/GlassCard";
import RatingBadge from "../components/ui/RatingBadge";

$tactics
"@ | Set-Content -Path "src/pages/Tactics.jsx" -Encoding utf8

$transfers = Get-FunctionBlock $content "Transfers"
$transfers = $transfers -replace "^function Transfers", "export default function Transfers"
@"
import { useState } from "react";
import { CLUB, MARKET_PLAYERS, PLAYERS } from "../data/mockData";
import { fmt } from "../utils/format";
import GlassCard from "../components/ui/GlassCard";
import RatingBadge from "../components/ui/RatingBadge";

$transfers
"@ | Set-Content -Path "src/pages/Transfers.jsx" -Encoding utf8

$match = Get-FunctionBlock $content "Match"
$match = $match -replace "^function Match", "export default function Match"
@"
import { useCallback, useEffect, useRef, useState } from "react";
import { BENCH, CLUB, OPPONENTS, PLAYERS } from "../data/mockData";
import GlassCard from "../components/ui/GlassCard";

$match
"@ | Set-Content -Path "src/pages/Match.jsx" -Encoding utf8

$stats = Get-FunctionBlock $content "Stats"
$stats = $stats -replace "^function Stats", "export default function Stats"
@"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CLUB, MONTHLY_PERF, PLAYERS } from "../data/mockData";
import GlassCard from "../components/ui/GlassCard";
import StatBar from "../components/ui/StatBar";

$stats
"@ | Set-Content -Path "src/pages/Stats.jsx" -Encoding utf8

$squad = Get-FunctionBlock $content "Squad"
$squad = $squad -replace "^function Squad", "export default function Squad"
@"
import { useState } from "react";
import { BENCH, PLAYERS } from "../data/mockData";
import { fmt } from "../utils/format";
import RatingBadge from "../components/ui/RatingBadge";

$squad
"@ | Set-Content -Path "src/pages/Squad.jsx" -Encoding utf8

$league = Get-FunctionBlock $content "League"
$league = $league -replace "^function League", "export default function League"
@"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CLUB, INITIAL_STATS, LEAGUE_TABLE, OPPONENTS } from "../data/mockData";
import FormDots from "../components/ui/FormDots";
import GlassCard from "../components/ui/GlassCard";

$league
"@ | Set-Content -Path "src/pages/League.jsx" -Encoding utf8

$app = Get-DefaultFunctionBlock $content "FootballManager"
@"
import { useState } from "react";
import { CLUB, INITIAL_STATS } from "./data/mockData";
import { fmt } from "./utils/format";
import useToast from "./hooks/useToast";
import Toast from "./components/ui/Toast";
import Sidebar, { NAV_ITEMS } from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tactics from "./pages/Tactics";
import Transfers from "./pages/Transfers";
import Match from "./pages/Match";
import Stats from "./pages/Stats";
import Squad from "./pages/Squad";
import League from "./pages/League";

$app
"@ | Set-Content -Path "src/App.jsx" -Encoding utf8

@'
export { default } from "./src/App";
'@ | Set-Content -Path "main.jsx" -Encoding utf8
