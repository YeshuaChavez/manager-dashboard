import { CLUB } from "../../data/mockData";
import { fmt } from "../../utils/format";

export const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",    icon: "âŠž" },
  { id: "tactics",     label: "TÃ¡cticas",     icon: "â—Ž" },
  { id: "transfers",   label: "Fichajes",     icon: "â†•" },
  { id: "match",       label: "Partido",      icon: "â–¶" },
  { id: "stats",       label: "EstadÃ­sticas", icon: "âˆ‘" },
  { id: "squad",       label: "Plantilla",    icon: "â™Ÿ" },
  { id: "league",      label: "Liga",         icon: "ðŸ†" },
];

export default function Sidebar({ active, setActive }
