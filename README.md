# Football Manager Dashboard - Edición FC Barcelona

Un panel de control interactivo de alta fidelidad para Football Manager desarrollado con React, Vite, Framer Motion y Tailwind CSS. Esta aplicación actúa como un centro de mando en tiempo real para gestionar plantillas de equipos, tácticas de juego, fichajes y simulaciones de partidos.

## Características Clave

- **Identidad del FC Barcelona**: Preconfigurado con la plantilla oficial del Barça (Ter Stegen, Araujo, Pedri, de Jong, Raphinha, Lewandowski, Lamine Yamal, etc.), Hansi Flick como director técnico y el estadio Spotify Camp Nou.
- **Centro de Mando del Dashboard (Navegación Cruzada)**: Accesos directos integrados en todas las tarjetas de estadísticas. Hacer clic en las tarjetas redirige de forma fluida a sus respectivas pantallas (ej. Próximo Partido te lleva a la Simulación de Partido, el Presupuesto a Fichajes, y las estadísticas de partidos jugados a la Clasificación de la Liga).
- **AI-Assisted Player Report (Reporte del Jugador)**: Una tarjeta premium que rota de forma automática o manual entre los jugadores estrella de la plantilla. Incluye transiciones de desplazamiento lateral con Framer Motion y un gráfico de radar dinámico (RadarChart) que deforma suavemente su área sombreada entre las estadísticas de cada jugador.
- **Pizarra y Controles Tácticos**: Pizarra interactiva que permite posicionar y cambiar tácticas/formaciones de juego, junto con deslizadores táctiles continuos de Moral e Intensidad de Presión integrados directamente en los límites del campo de juego.
- **Fichas Técnicas de Jugador Detalladas**: Al hacer clic en cualquier jugador de la plantilla o mercado, se abre un modal premium estilo glassmorphism que detalla las estadísticas acumuladas en la temporada (goles, asistencias, tarjetas) y un gráfico lineal interactivo con el rendimiento (forma) de los últimos 5 partidos.
- **Fichas FUT Específicas de Portero (GK)**: Mapeo de estadísticas exclusivo para guardametas (DIV, HAN, KIC, REF, SPD, POS) en lugar de las estadísticas tradicionales de jugadores de campo.
- **Simulador Realista de Partidos**: Eventos de partido simulados en tiempo real y visualizador de arco de red que registra tiros y goles. El motor de simulación está optimizado con React refs para arrojar marcadores realistas y estandarizados (ej. 2-1, 1-0, 0-0).

## Tecnologías Utilizadas

- **Framework**: React (Vite)
- **Estilos**: Tailwind CSS y sistema de diseño Glassmorphism
- **Animaciones**: Framer Motion (para transiciones físicas y de modales)
- **Visualización de Datos**: Recharts (LineChart, AreaChart, BarChart y RadarChart)
- **Iconos**: Lucide React

## Empezando

### Requisitos Previos

- Node.js (versión 18 o superior recomendada)
- npm

### Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

3. Compila para producción:
   ```bash
   npm run build
   ```
