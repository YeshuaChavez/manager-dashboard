# Football Manager Dashboard - FC Barcelona Edition

An interactive, high-fidelity Football Manager Dashboard built using React, Vite, Framer Motion, and Tailwind CSS. This application serves as a real-time command center to manage team rosters, adjust tactics, execute transfers, and simulate matches.

## Key Features

- **FC Barcelona Identity**: Pre-configured with the official squad (Ter Stegen, Araujo, Pedri, de Jong, Raphinha, Lewandowski, Lamine Yamal, etc.), Hansi Flick as manager, and the Spotify Camp Nou stadium.
- **Dashboard Command Center (Cross-Navigation)**: Integrated shortcuts on all stats cards. Clicking on cards smoothly navigates you to their respective views (e.g., Next Match goes to Match Simulation, Budget goes to Transfers, played stats go to League table).
- **AI-Assisted Player Report**: A premium featured card rotating squad stars with custom-cropped portraits. Features Framer Motion slide transitions and a morphing Radar Chart that bends dynamically between players' attributes.
- **Tactical Pitch Controls**: An interactive tactical chalkboard supporting customized formations, alongside continuous morale and pressing intensity sliders integrated into the pitch margins.
- **Detailed Player Profiles**: Click on any player in the roster or transfer market to open a premium glassmorphic modal with detailed season stats (goals, assists, cards) and a Recharts line chart of their recent match form.
- **GK-Specific FUT Cards**: Automatically maps specialized Goalkeeper statistics (DIV, HAN, KIC, REF, SPD, POS) instead of outfield player attributes on both player cards and charts when a player's position is GK.
- **Realistic Match Simulator**: A real-time match events timeline and net visualizer showing goal points, optimized with React hooks to simulate realistic match scores (e.g., 2-1, 1-0).

## Technology Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS & Glassmorphism design system
- **Animations**: Framer Motion (for modal springs and slider transitions)
- **Data Visualization**: Recharts (LineChart, AreaChart, BarChart, and RadarChart)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
