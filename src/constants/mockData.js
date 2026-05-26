export const CLUB = {
  name: "FC Barcelona",
  shortName: "FCB",
  badge: "🔵🔴",
  league: "La Liga",
  position: 1,
  budget: 124500000,
  season: "2025/26",
  manager: "Hansi Flick",
  stadium: "Spotify Camp Nou",
  fans: "85400",
};

export const INITIAL_STATS = {
  played: 28, wins: 20, draws: 5, losses: 3,
  goalsFor: 68, goalsAgainst: 28, points: 65, morale: 88,
};

export const PLAYERS = [
  { id: 1, name: "M. Ter Stegen", pos: "GK",  rating: 89, age: 32, nat: "🇩🇪", value: 35000000, goals: 0,  assists: 0,  wage: 240000, contract: 2028, form: [8,8,7,9,8], x: 50, y: 88, image: "/players/terstegen.png", stats: { pac: 86, sho: 85, pas: 89, dri: 90, def: 48, phy: 85 } },
  { id: 2, name: "J. Koundé",     pos: "RB",  rating: 85, age: 25, nat: "🇫🇷", value: 55000000, goals: 2,  assists: 5,  wage: 180000, contract: 2027, form: [8,7,8,7,9], x: 82, y: 70, stats: { pac: 82, sho: 45, pas: 73, dri: 78, def: 86, phy: 82 } },
  { id: 3, name: "R. Araujo",     pos: "CB",  rating: 87, age: 25, nat: "🇺🇾", value: 75000000, goals: 3,  assists: 1,  wage: 210000, contract: 2026, form: [9,8,7,9,8], x: 65, y: 72, image: "/players/araujo.png", stats: { pac: 82, sho: 50, pas: 65, dri: 70, def: 88, phy: 84 } },
  { id: 4, name: "A. Christensen",pos: "CB",  rating: 84, age: 28, nat: "🇩🇰", value: 40000000, goals: 2,  assists: 0,  wage: 170000, contract: 2026, form: [8,8,9,7,8], x: 35, y: 72, stats: { pac: 72, sho: 50, pas: 70, dri: 72, def: 85, phy: 78 } },
  { id: 5, name: "A. Balde",      pos: "LB",  rating: 82, age: 20, nat: "🇪🇸", value: 45000000, goals: 1,  assists: 6,  wage: 120000, contract: 2028, form: [7,8,7,8,9], x: 18, y: 70, stats: { pac: 93, sho: 65, pas: 74, dri: 79, def: 76, phy: 74 } },
  { id: 6, name: "Pedri",         pos: "CM",  rating: 88, age: 21, nat: "🇪🇸", value: 90000000, goals: 5,  assists: 12, wage: 220000, contract: 2026, form: [9,9,8,9,9], x: 35, y: 52, image: "/players/pedri.png", stats: { pac: 78, sho: 79, pas: 89, dri: 90, def: 68, phy: 72 } },
  { id: 7, name: "F. de Jong",    pos: "DM",  rating: 87, age: 27, nat: "🇳🇱", value: 80000000, goals: 3,  assists: 4,  wage: 290000, contract: 2026, form: [8,7,8,9,8], x: 50, y: 58, image: "/players/dejong.png", stats: { pac: 80, sho: 69, pas: 86, dri: 87, def: 77, phy: 78 } },
  { id: 8, name: "Gavi",          pos: "CM",  rating: 84, age: 19, nat: "🇪🇸", value: 90000000, goals: 2,  assists: 5,  wage: 150000, contract: 2026, form: [8,8,9,8,8], x: 65, y: 52, stats: { pac: 78, sho: 70, pas: 80, dri: 83, def: 75, phy: 82 } },
  { id: 9, name: "Raphinha",      pos: "LW",  rating: 86, age: 27, nat: "🇧🇷", value: 60000000, goals: 18, assists: 10, wage: 200000, contract: 2027, form: [9,8,10,9,9], x: 20, y: 32, image: "/players/raphinha.png", stats: { pac: 91, sho: 82, pas: 81, dri: 85, def: 52, phy: 73 } },
  { id: 10,name: "R. Lewandowski",pos: "ST",  rating: 90, age: 35, nat: "🇵🇱", value: 30000000, goals: 24, assists: 7,  wage: 350000, contract: 2026, form: [8,9,8,8,9], x: 50, y: 25, image: "/players/lewandowski.png", stats: { pac: 75, sho: 91, pas: 78, dri: 84, def: 42, phy: 80 } },
  { id: 11,name: "Lamine Yamal",  pos: "RW",  rating: 86, age: 16, nat: "🇪🇸", value: 120000000,goals: 12, assists: 8,  wage: 100000, contract: 2030, x: 80, y: 32, image: "/players/lamine.png", stats: { pac: 92, sho: 83, pas: 82, dri: 91, def: 35, phy: 65 } },
];

export const BENCH = [
  { id: 12, name: "Dani Olmo",     pos: "AM", rating: 84, age: 26, nat: "🇪🇸", value: 60000000, goals: 6,  assists: 8, stats: { pac: 80, sho: 81, pas: 84, dri: 86, def: 50, phy: 68 } },
  { id: 13, name: "Fermín López",  pos: "CM", rating: 81, age: 21, nat: "🇪🇸", value: 30000000, goals: 8,  assists: 3, stats: { pac: 81, sho: 78, pas: 76, dri: 79, def: 65, phy: 72 } },
  { id: 14, name: "Pau Cubarsí",   pos: "CB", rating: 80, age: 17, nat: "🇪🇸", value: 40000000, goals: 0,  assists: 1, stats: { pac: 70, sho: 33, pas: 78, dri: 72, def: 82, phy: 74 } },
  { id: 15, name: "Iñigo Martínez",pos: "CB", rating: 80, age: 33, nat: "🇪🇸", value: 8000000,  goals: 1,  assists: 0, stats: { pac: 60, sho: 45, pas: 68, dri: 64, def: 81, phy: 79 } },
  { id: 16, name: "Iñaki Peña",    pos: "GK", rating: 78, age: 25, nat: "🇪🇸", value: 8000000,  goals: 0,  assists: 0, stats: { pac: 76, sho: 78, pas: 73, dri: 76, def: 40, phy: 75 } },
];

export const MARKET_PLAYERS = [
  { id: 101, name: "K. Mbappé",     pos: "ST", rating: 95, age: 25, nat: "🇫🇷", value: 250000000, club: "Real Madrid",    goals: 30, wage: 600000, image: "/players/mbappe.png", stats: { pac: 97, sho: 90, pas: 80, dri: 92, def: 36, phy: 78 } },
  { id: 102, name: "E. Haaland",    pos: "ST", rating: 94, age: 23, nat: "🇳🇴", value: 220000000, club: "Man City",       goals: 35, wage: 550000, image: "/players/haaland.png", stats: { pac: 89, sho: 93, pas: 66, dri: 80, def: 45, phy: 88 } },
  { id: 103, name: "P. Foden",      pos: "AM", rating: 90, age: 23, nat: "🇬🇧", value: 150000000, club: "Man City",       goals: 15, wage: 300000, image: "/players/phoden.png", stats: { pac: 86, sho: 85, pas: 88, dri: 90, def: 56, phy: 66 } },
  { id: 104, name: "B. Saka",       pos: "RW", rating: 88, age: 22, nat: "🇬🇧", value: 140000000, club: "Arsenal",        goals: 16, wage: 250000, image: "/players/saka.png", stats: { pac: 89, sho: 84, pas: 83, dri: 88, def: 65, phy: 78 } },
  { id: 105, name: "R. Leão",       pos: "LW", rating: 87, age: 24, nat: "🇵🇹", value: 100000000, club: "AC Milan",       goals: 12, wage: 220000, image: "/players/leao.png", stats: { pac: 94, sho: 82, pas: 78, dri: 89, def: 27, phy: 74 } },
  { id: 107, name: "V. Osimhen",    pos: "ST", rating: 88, age: 25, nat: "🇳🇬", value: 130000000, club: "Napoli",         goals: 26, wage: 300000, image: "/players/osimhen.png", stats: { pac: 90, sho: 86, pas: 65, dri: 82, def: 40, phy: 82 } },
  { id: 108, name: "D. Dumfries",   pos: "RB", rating: 83, age: 27, nat: "🇳🇱", value: 45000000,  club: "Inter",          goals: 5,  wage: 140000, image: "/players/dumfries.png", stats: { pac: 82, sho: 65, pas: 74, dri: 75, def: 80, phy: 89 } },
  { id: 109, name: "M. Diaz",       pos: "LW", rating: 83, age: 27, nat: "🇨🇴", value: 55000000,  club: "Liverpool",      goals: 8,  wage: 150000, image: "/players/diaz.png", stats: { pac: 90, sho: 78, pas: 73, dri: 86, def: 34, phy: 72 } },
  { id: 110, name: "G. Ramos",      pos: "ST", rating: 82, age: 22, nat: "🇵🇹", value: 50000000,  club: "PSG",            goals: 9,  wage: 120000, image: "/players/ramos.png", stats: { pac: 82, sho: 80, pas: 68, dri: 75, def: 38, phy: 78 } },
  { id: 111, name: "J. Gvardiol",   pos: "CB", rating: 84, age: 22, nat: "🇭🇷", value: 80000000,  club: "Man City",       goals: 2,  wage: 180000, image: "/players/gvardiol.png", stats: { pac: 78, sho: 54, pas: 72, dri: 74, def: 83, phy: 82 } },
  { id: 112, name: "M. Guendouzi",  pos: "CM", rating: 82, age: 25, nat: "🇫🇷", value: 40000000,  club: "Lazio",          goals: 4,  wage: 130000, image: "/players/guendouzi.png", stats: { pac: 74, sho: 72, pas: 80, dri: 79, def: 77, phy: 78 } },
  { id: 113, name: "L. Messi",      pos: "AM", rating: 93, age: 36, nat: "🇦🇷", value: 45000000,  club: "Inter Miami",    goals: 20, wage: 480000, image: "/players/messi.png", stats: { pac: 75, sho: 89, pas: 90, dri: 94, def: 33, phy: 64 } },
  { id: 114, name: "C. Ronaldo",    pos: "ST", rating: 91, age: 39, nat: "🇵🇹", value: 30000000,  club: "Al Nassr",       goals: 25, wage: 450000, image: "/players/ronaldo.png", stats: { pac: 79, sho: 91, pas: 75, dri: 80, def: 30, phy: 74 } },
  { id: 115, name: "J. Bellingham", pos: "AM", rating: 90, age: 20, nat: "🇬🇧", value: 180000000, club: "Real Madrid",    goals: 23, wage: 350000, image: "/players/bellingham.png", stats: { pac: 79, sho: 86, pas: 83, dri: 88, def: 78, phy: 82 } },
  { id: 116, name: "T. Kroos",      pos: "CM", rating: 86, age: 34, nat: "🇩🇪", value: 20000000,  club: "Real Madrid",    goals: 1,  wage: 250000, image: "/players/kroos.png", stats: { pac: 51, sho: 81, pas: 90, dri: 81, def: 70, phy: 68 } },
  { id: 117, name: "M. Salah",      pos: "RW", rating: 89, age: 31, nat: "🇪🇬", value: 65000000,  club: "Liverpool",      goals: 25, wage: 320000, image: "/players/salah.png", stats: { pac: 89, sho: 87, pas: 82, dri: 88, def: 45, phy: 75 } },
  { id: 118, name: "Vinicius Jr.",  pos: "LW", rating: 90, age: 23, nat: "🇧🇷", value: 200000000, club: "Real Madrid",    goals: 24, wage: 350000, image: "/players/vinicius.png", stats: { pac: 95, sho: 82, pas: 78, dri: 90, def: 29, phy: 68 } },
  { id: 119, name: "T. Courtois",   pos: "GK", rating: 90, age: 32, nat: "🇧🇪", value: 60000000,  club: "Real Madrid",    goals: 0,  wage: 350000, image: "/players/courtois.png", stats: { pac: 85, sho: 89, pas: 76, dri: 90, def: 46, phy: 89 } },
  { id: 120, name: "Theo Hernández",pos: "LB", rating: 86, age: 26, nat: "🇫🇷", value: 60000000,  club: "AC Milan",       goals: 5,  wage: 200000, image: "/players/theo.png", stats: { pac: 93, sho: 71, pas: 76, dri: 81, def: 78, phy: 84 } },
  { id: 121, name: "Rodri",         pos: "DM", rating: 91, age: 27, nat: "🇪🇸", value: 110000000, club: "Man City",       goals: 4,  wage: 320000, image: "/players/rodri.png", stats: { pac: 58, sho: 73, pas: 86, dri: 80, def: 89, phy: 84 } },
];

export const LEAGUE_TABLE = [
  { pos: 1, team: "Barcelona",     pl: 28, w: 20, d: 5, l: 3, gd: 40, pts: 65, form: ["W","W","D","W","W"] },
  { pos: 2, team: "Real Madrid",   pl: 28, w: 18, d: 6, l: 4, gd: 32, pts: 60, form: ["W","D","W","W","L"] },
  { pos: 3, team: "Atlético",      pl: 28, w: 16, d: 7, l: 5, gd: 22, pts: 55, form: ["D","W","W","D","W"] },
  { pos: 4, team: "Sevilla",       pl: 28, w: 14, d: 8, l: 6, gd: 12, pts: 50, form: ["W","L","D","W","D"] },
  { pos: 5, team: "Villarreal",    pl: 28, w: 12, d: 9, l: 7, gd:  5, pts: 45, form: ["L","D","W","L","W"] },
];

export const MONTHLY_PERF = [
  { month: "Ago", wins: 3, draws: 0, losses: 1, goals: 11, rating: 82 },
  { month: "Sep", wins: 4, draws: 1, losses: 0, goals: 14, rating: 88 },
  { month: "Oct", wins: 3, draws: 2, losses: 0, goals: 12, rating: 85 },
  { month: "Nov", wins: 4, draws: 0, losses: 1, goals: 15, rating: 87 },
  { month: "Dic", wins: 2, draws: 1, losses: 1, goals: 8,  rating: 80 },
  { month: "Ene", wins: 4, draws: 1, losses: 0, goals: 8,  rating: 89 },
];

export const RADAR_DATA = [
  { attr: "Ataque",   value: 88 }, { attr: "Defensa",   value: 82 },
  { attr: "Posesión", value: 85 }, { attr: "Velocidad", value: 87 },
  { attr: "Tiro",     value: 86 }, { attr: "Pase",      value: 90 },
];

export const FORMATIONS = {
  "4-3-3": [
    { id: 1, x: 50, y: 88 },
    { id: 2, x: 82, y: 70 }, { id: 3, x: 62, y: 72 }, { id: 4, x: 38, y: 72 }, { id: 5, x: 18, y: 70 },
    { id: 6, x: 30, y: 50 }, { id: 7, x: 50, y: 55 }, { id: 8, x: 70, y: 50 },
    { id: 11, x: 80, y: 28 }, { id: 10, x: 50, y: 22 }, { id: 9, x: 20, y: 28 },
  ],
  "4-4-2": [
    { id: 1, x: 50, y: 88 },
    { id: 2, x: 82, y: 70 }, { id: 3, x: 62, y: 72 }, { id: 4, x: 38, y: 72 }, { id: 5, x: 18, y: 70 },
    { id: 11, x: 78, y: 48 }, { id: 6, x: 58, y: 52 }, { id: 7, x: 42, y: 52 }, { id: 9, x: 22, y: 48 },
    { id: 8, x: 62, y: 25 }, { id: 10, x: 38, y: 25 },
  ],
  "3-5-2": [
    { id: 1, x: 50, y: 88 }, // GK
    { id: 2, x: 65, y: 73 }, { id: 3, x: 50, y: 75 }, { id: 4, x: 35, y: 73 }, // CBs (Kounde, Araujo, Christensen)
    { id: 9, x: 88, y: 52 }, { id: 8, x: 68, y: 52 }, { id: 7, x: 50, y: 58 }, { id: 6, x: 32, y: 52 }, { id: 5, x: 12, y: 52 }, // Midfielders (Raphinha RM, Gavi RCM, De Jong DM, Pedri LCM, Balde LM)
    { id: 11, x: 62, y: 25 }, { id: 10, x: 38, y: 25 }, // Forwards (Lamine Yamal, Lewandowski)
  ],
};

export const MATCH_EVENTS_POOL = [
  { type: "goal", icon: "⚽", text: "¡GOOOOOL! {player} anota para {team}!", team: "home" },
  { type: "goal", icon: "⚽", text: "¡Golazo de {player}! {team} amplía la ventaja", team: "home" },
  { type: "goal", icon: "⚽", text: "Gol en contra, {player} marca para {team}", team: "away" },
  { type: "yellow", icon: "🟨", text: "Tarjeta amarilla para {player}", team: "any" },
  { type: "red", icon: "🟥", text: "¡Tarjeta roja! {player} es expulsado", team: "any" },
  { type: "sub", icon: "🔄", text: "Cambio: Sale {player}, entra {player2}", team: "any" },
  { type: "miss", icon: "😤", text: "{player} falla un claro mano a mano", team: "any" },
  { type: "save", icon: "🧤", text: "Gran parada de Ter Stegen, evita el gol rival", team: "any" },
  { type: "corner", icon: "🚩", text: "Córner para {team}, presión alta", team: "any" },
  { type: "foul", icon: "🤕", text: "Falta de {player}, peligroso el árbitro", team: "any" },
];

export const OPPONENTS = [
  { name: "Real Madrid", rating: 92, badge: "⚪" },
  { name: "Atlético Madrid", rating: 85, badge: "🔴⚪" },
  { name: "Borussia Dortmund", rating: 83, badge: "🟡⚫" },
  { name: "Bayern München", rating: 92, badge: "🔴⚪" },
  { name: "Manchester City", rating: 93, badge: "🔵⚪" },
];
