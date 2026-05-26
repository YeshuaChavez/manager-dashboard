export const CLUB = {
  name: "Real Madrid CF",
  shortName: "RMA",
  badge: "âšª",
  league: "La Liga",
  position: 1,
  budget: 124500000,
  season: "2024/25",
  manager: "Carlos Ancelotti",
  stadium: "Santiago BernabÃ©u",
  fans: "81044",
};

export const INITIAL_STATS = {
  played: 28, wins: 20, draws: 5, losses: 3,
  goalsFor: 68, goalsAgainst: 28, points: 65, morale: 88,
};

export const PLAYERS = [
  { id: 1, name: "T. Courtois",  pos: "GK",  rating: 88, age: 31, nat: "ðŸ‡§ðŸ‡ª", value: 32000000, goals: 0,  assists: 0,  wage: 220000, contract: 2026, form: [7,8,7,9,8], x: 50, y: 88 },
  { id: 2, name: "D. Carvajal", pos: "RB",  rating: 85, age: 32, nat: "ðŸ‡ªðŸ‡¸", value: 22000000, goals: 2,  assists: 5,  wage: 180000, contract: 2025, form: [8,7,8,7,9], x: 82, y: 70 },
  { id: 3, name: "E. MilitÃ£o",  pos: "CB",  rating: 86, age: 26, nat: "ðŸ‡§ðŸ‡·", value: 70000000, goals: 3,  assists: 1,  wage: 200000, contract: 2028, form: [9,8,7,9,8], x: 65, y: 72 },
  { id: 4, name: "A. RÃ¼diger",  pos: "CB",  rating: 85, age: 31, nat: "ðŸ‡©ðŸ‡ª", value: 40000000, goals: 2,  assists: 0,  wage: 190000, contract: 2027, form: [8,8,9,7,8], x: 35, y: 72 },
  { id: 5, name: "F. Mendy",    pos: "LB",  rating: 83, age: 29, nat: "ðŸ‡«ðŸ‡·", value: 38000000, goals: 1,  assists: 6,  wage: 175000, contract: 2027, form: [7,8,7,8,9], x: 18, y: 70 },
  { id: 6, name: "T. Kroos",    pos: "CM",  rating: 87, age: 34, nat: "ðŸ‡©ðŸ‡ª", value: 20000000, goals: 5,  assists: 12, wage: 250000, contract: 2024, form: [9,9,8,9,9], x: 35, y: 52 },
  { id: 7, name: "A. TchouamÃ©ni",pos:"DM", rating: 84, age: 24, nat: "ðŸ‡«ðŸ‡·", value: 80000000, goals: 3,  assists: 4,  wage: 180000, contract: 2028, form: [8,7,8,9,8], x: 50, y: 58 },
  { id: 8, name: "J. Bellingham",pos:"CM", rating: 91, age: 20, nat: "ðŸ‡¬ðŸ‡§", value: 180000000,goals: 22, assists: 11, wage: 350000, contract: 2029, form: [9,10,9,10,9],x: 65, y: 52 },
  { id: 9, name: "V. Jr.",       pos: "LW", rating: 89, age: 23, nat: "ðŸ‡§ðŸ‡·", value: 200000000,goals: 18, assists: 10, wage: 320000, contract: 2027, form: [9,8,10,9,9],x: 20, y: 32 },
  { id: 10,name: "K. Benzema",  pos: "ST", rating: 88, age: 36, nat: "ðŸ‡«ðŸ‡·", value: 15000000, goals: 24, assists: 7,  wage: 400000, contract: 2024, form: [8,9,8,8,9], x: 50, y: 25 },
  { id: 11,name: "R. Rodrygo",  pos: "RW", rating: 85, age: 23, nat: "ðŸ‡§ðŸ‡·", value: 90000000, goals: 12, assists: 8,  wage: 200000, contract: 2028, form: [8,8,9,8,8], x: 80, y: 32 },
];

export const BENCH = [
  { id: 12, name: "L. VÃ¡zquez",  pos: "RW", rating: 82, age: 32, nat: "ðŸ‡ªðŸ‡¸", value: 8000000,  goals: 4,  assists: 3 },
  { id: 13, name: "N. Vallejo",  pos: "CB", rating: 78, age: 27, nat: "ðŸ‡ªðŸ‡¸", value: 12000000, goals: 1,  assists: 0 },
  { id: 14, name: "Joselu",      pos: "ST", rating: 79, age: 33, nat: "ðŸ‡ªðŸ‡¸", value: 5000000,  goals: 8,  assists: 2 },
  { id: 15, name: "E. Camavinga",pos: "CM", rating: 84, age: 21, nat: "ðŸ‡«ðŸ‡·", value: 100000000,goals: 2,  assists: 5 },
  { id: 16, name: "Kepa",        pos: "GK", rating: 83, age: 29, nat: "ðŸ‡ªðŸ‡¸", value: 20000000, goals: 0,  assists: 0 },
];

export const MARKET_PLAYERS = [
  { id: 101, name: "K. MbappÃ©",     pos: "ST", rating: 95, age: 25, nat: "ðŸ‡«ðŸ‡·", value: 250000000, club: "PSG",            goals: 30, wage: 600000 },
  { id: 102, name: "E. Haaland",    pos: "ST", rating: 94, age: 23, nat: "ðŸ‡³ðŸ‡´", value: 220000000, club: "Man City",       goals: 35, wage: 550000 },
  { id: 103, name: "P. Foden",      pos: "AM", rating: 90, age: 23, nat: "ðŸ‡¬ðŸ‡§", value: 150000000, club: "Man City",       goals: 15, wage: 300000 },
  { id: 104, name: "B. Saka",       pos: "RW", rating: 88, age: 22, nat: "ðŸ‡¬ðŸ‡§", value: 140000000, club: "Arsenal",        goals: 16, wage: 250000 },
  { id: 105, name: "R. LeÃ£o",       pos: "LW", rating: 87, age: 24, nat: "ðŸ‡µðŸ‡¹", value: 100000000, club: "AC Milan",       goals: 12, wage: 220000 },
  { id: 106, name: "F. De Jong",    pos: "CM", rating: 87, age: 26, nat: "ðŸ‡³ðŸ‡±", value: 95000000,  club: "Barcelona",      goals: 5,  wage: 280000 },
  { id: 107, name: "V. Osimhen",    pos: "ST", rating: 88, age: 25, nat: "ðŸ‡³ðŸ‡¬", value: 130000000, club: "Napoli",         goals: 26, wage: 300000 },
  { id: 108, name: "D. Dumfries",   pos: "RB", rating: 83, age: 27, nat: "ðŸ‡³ðŸ‡±", value: 45000000,  club: "Inter",          goals: 5,  wage: 140000 },
  { id: 109, name: "M. Diaz",       pos: "LW", rating: 83, age: 27, nat: "ðŸ‡¨ðŸ‡´", value: 55000000,  club: "Liverpool",      goals: 8,  wage: 150000 },
  { id: 110, name: "G. Ramos",      pos: "ST", rating: 82, age: 22, nat: "ðŸ‡µðŸ‡¹", value: 50000000,  club: "PSG",            goals: 9,  wage: 120000 },
  { id: 111, name: "J. Gvardiol",   pos: "CB", rating: 84, age: 22, nat: "ðŸ‡­ðŸ‡·", value: 80000000,  club: "Man City",       goals: 2,  wage: 180000 },
  { id: 112, name: "M. Guendouzi",  pos: "CM", rating: 82, age: 25, nat: "ðŸ‡«ðŸ‡·", value: 40000000,  club: "Lazio",          goals: 4,  wage: 130000 },
];

export const LEAGUE_TABLE = [
  { pos: 1, team: "Real Madrid",   pl: 28, w: 20, d: 5, l: 3, gd: 40, pts: 65, form: ["W","W","D","W","W"] },
  { pos: 2, team: "Barcelona",     pl: 28, w: 18, d: 6, l: 4, gd: 32, pts: 60, form: ["W","D","W","W","L"] },
  { pos: 3, team: "AtlÃ©tico",      pl: 28, w: 16, d: 7, l: 5, gd: 22, pts: 55, form: ["D","W","W","D","W"] },
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
  { attr: "PosesiÃ³n", value: 85 }, { attr: "Velocidad", value: 87 },
  { attr: "Tiro",     value: 86 }, { attr: "Pase",      value: 90 },
];

export const FORMATIONS = {
  "4-3-3": [
    { id: 1, x: 50, y: 88 }, // GK
    { id: 2, x: 82, y: 70 }, { id: 3, x: 62, y: 72 }, { id: 4, x: 38, y: 72 }, { id: 5, x: 18, y: 70 }, // DEF
    { id: 6, x: 30, y: 50 }, { id: 7, x: 50, y: 55 }, { id: 8, x: 70, y: 50 }, // MID
    { id: 11, x: 80, y: 28 }, { id: 10, x: 50, y: 22 }, { id: 9, x: 20, y: 28 }, // FWD
  ],
  "4-4-2": [
    { id: 1, x: 50, y: 88 },
    { id: 2, x: 82, y: 70 }, { id: 3, x: 62, y: 72 }, { id: 4, x: 38, y: 72 }, { id: 5, x: 18, y: 70 },
    { id: 11, x: 78, y: 48 }, { id: 6, x: 58, y: 52 }, { id: 7, x: 42, y: 52 }, { id: 9, x: 22, y: 48 },
    { id: 8, x: 62, y: 25 }, { id: 10, x: 38, y: 25 },
  ],
  "3-5-2": [
    { id: 1, x: 50, y: 88 },
    { id: 3, x: 68, y: 73 }, { id: 4, x: 50, y: 76 }, { id: 5, x: 32, y: 73 },
    { id: 2, x: 88, y: 52 }, { id: 6, x: 68, y: 52 }, { id: 7, x: 50, y: 56 }, { id: 8, x: 32, y: 52 }, { id: 5, x: 12, y: 52 },
    { id: 10, x: 62, y: 25 }, { id: 9, x: 38, y: 25 },
  ],
};

export const MATCH_EVENTS_POOL = [
  { type: "goal", icon: "âš½", text: "Â¡GOOOOOL! {player} anota para {team}!", team: "home" },
  { type: "goal", icon: "âš½", text: "Â¡Golazo de {player}! {team} amplÃ­a la ventaja", team: "home" },
  { type: "goal", icon: "âš½", text: "Gol en contra, {player} marca para {team}", team: "away" },
  { type: "yellow", icon: "ðŸŸ¨", text: "Tarjeta amarilla para {player}", team: "any" },
  { type: "red", icon: "ðŸŸ¥", text: "Â¡Tarjeta roja! {player} es expulsado", team: "any" },
  { type: "sub", icon: "ðŸ”„", text: "Cambio: Sale {player}, entra {player2}", team: "any" },
  { type: "miss", icon: "ðŸ˜¤", text: "{player} falla un claro mano a mano", team: "any" },
  { type: "save", icon: "ðŸ§¤", text: "Gran parada de Courtois, evita el gol rival", team: "any" },
  { type: "corner", icon: "ðŸš©", text: "CÃ³rner para {team}, presiÃ³n alta", team: "any" },
  { type: "foul", icon: "ðŸ¤•", text: "Falta de {player}, peligroso el Ã¡rbitro", team: "any" },
];

export const OPPONENTS = [
  { name: "FC Barcelona", rating: 90, badge: "ðŸ”µðŸ”´" },
  { name: "AtlÃ©tico Madrid", rating: 85, badge: "ðŸ”´â¬›" },
  { name: "Borussia Dortmund", rating: 83, badge: "ðŸŸ¡âš«" },
  { name: "Bayern MÃ¼nchen", rating: 92, badge: "ðŸ”´âšª" },
  { name: "Manchester City", rating: 93, badge: "ðŸ”µâšª" },
];

