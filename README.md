# Football Manager Dashboard - Edición FC Barcelona

Un panel de control interactivo de alta fidelidad desarrollado para la gestión táctica y financiera de un club de fútbol (FC Barcelona). Este sistema ha sido diseñado aplicando principios avanzados de Interacción Humano-Computador (IHC) y Evaluaciones Heurísticas de Usabilidad de Nielsen, implementado sobre un stack moderno con React, Vite, Framer Motion, Recharts y Tailwind CSS.

El proyecto simula las funciones clave de un director técnico y director deportivo en tiempo real, conectando dinámicamente el análisis de plantilla, la configuración de alineaciones, el mercado de transferencias y la simulación interactiva de encuentros.

---

## Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura y Estructura del Sistema](#arquitectura-y-estructura-del-sistema)
3. [Características Detalladas por Módulo](#características-detalladas-por-módulo)
4. [Principios de Usabilidad e IHC (Heurísticas de Nielsen)](#principios-de-usabilidad-e-ihc-heurísticas-de-nielsen)
5. [Decisiones Técnicas y Optimización de Código](#decisiones-técnicas-y-optimización-de-código)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Instalación y Despliegue](#instalación-y-despliegue)

---

## 1. Descripción del Proyecto

El **Football Manager Dashboard** es una aplicación interactiva que gamifica y simplifica la administración estratégica del FC Barcelona. Su diseño se enfoca en proporcionar una experiencia de usuario (UX) inmersiva y de alto rendimiento que imita los menús tácticos de los videojuegos deportivos de consola modernos. 

Bajo la identidad del FC Barcelona (con Hansi Flick como director técnico y el Spotify Camp Nou como estadio), el sistema consolida los flujos de trabajo de análisis y simulación deportiva en un entorno web rápido, fluido y altamente receptivo.

---

## 2. Arquitectura y Estructura del Sistema

La interfaz está dividida en siete módulos interconectados de forma dinámica:

* **Dashboard (Panel de Control)**: Resumen general del club, presupuesto disponible, próximo partido y el panel interactivo de análisis asistido de la estrella destacada.
* **Plantilla (Roster)**: Gestión del plantel principal y suplentes en una tabla organizada con métricas acumuladas y acceso a fichas técnicas individuales.
* **Táctica (Pitch)**: Pizarra táctica interactiva que permite posicionar y cambiar la formación del equipo, junto con deslizadores tácticos de moral y presión.
* **Mercado (Transfers)**: Buscador de jugadores con filtros dinámicos y modal de confirmación con validación presupuestaria.
* **Partido (Match)**: Simulación minuto a minuto con timeline de incidentes, mapa de calor y visualizador de portería.
* **Estadísticas (Stats)**: Gráficos de líderes de goles, asistencias y efectividad del club.
* **Clasificación (League)**: Posiciones generales de La Liga y distribución de resultados de la temporada.

---

## 3. Características Detalladas por Módulo

### Dashboard (Centro de Mando)
* **Navegación Cruzada**: Funciona como un centro de mando integrado. Cada tarjeta de estadísticas redirige dinámicamente al módulo correspondiente al hacer clic (ej. Próximo Partido lleva a Partido, Presupuesto disponible lleva a Mercado, etc.).
* **AI-Assisted Player Report**: Ficha central que rota automáticamente o mediante controles manuales. Utiliza animaciones de deslizamiento lateral en Framer Motion y un gráfico de radar dinámico que deforma suavemente su área sombreada entre los perfiles de los jugadores.

### Plantilla y Fichas de Jugador
* **Ficha Técnica Detallada**: Al hacer clic en un jugador, se despliega un modal estilo Glassmorphism que detalla estadísticas de la temporada (goles, asistencias, tarjetas amarillas/rojas) y un gráfico lineal interactivo con su rendimiento histórico.

### Pizarra Táctica
* **Alineación Interactiva**: Permite cambiar y estructurar el parado táctico en tiempo real.
* **Margen de Control Continuo**: Controles táctiles continuos de Moral e Intensidad de Presión integrados directamente en los bordes de la cancha, con porcentaje numérico inmediato.

### Mercado de Fichajes
* **Filtros de Ordenamiento**: Permite organizar rápidamente a los futbolistas por precio y valoración global (OVR) con flechas consistentes de dirección (arriba/abajo).
* **Confirmación Segura**: Un modal obligatorio detalla la transacción y las estadísticas del jugador antes de formalizar la compra.

### Simulador de Partidos
* **Timeline y Red de Tiros**: El partido se simula con incidentes visualizados mediante iconos estandarizados y localizaciones exactas de disparos a portería.
* **Mapa de Calor de Posesión**: Cambia y se expande en tiempo real de acuerdo a la presión y dominio de juego.

---

## 4. Principios de Usabilidad e IHC (Heurísticas de Nielsen)

La plataforma fue evaluada y optimizada bajo las **10 Heurísticas de Usabilidad de Nielsen**:

1. **Visibilidad del Estado del Sistema**: feedback constante en la simulación minuto a minuto, barras tácticas con porcentajes y notificaciones Toast inmediatas.
2. **Relación con el Mundo Real**: Jerga futbolística e iconografía familiar. Si el jugador es un portero (GK), las estadísticas se adaptan al estándar real de portería (DIV, HAN, KIC, REF, SPD, POS).
3. **Control y Libertad del Usuario**: Modales fáciles de cerrar mediante botón de salida o clics fuera del modal, y total flexibilidad para deshacer cambios tácticos.
4. **Consistencia y Estándares**: Nombres de columnas estables, consistencia visual en degradados de color y codificación semántica de estados (verde para positivo, rojo para advertencia/tarjetas).
5. **Prevención de Errores**: Confirmación obligatoria antes de realizar compras de jugadores para evitar transacciones accidentales.
6. **Reconocimiento antes que Recuerdo**: Navegación cruzada intuitiva, pizarra táctica visualizada sobre un campo de juego real e historial reciente de forma graficado linealmente.
7. **Flexibilidad y Eficiencia de Uso**: Atajos rápidos del Dashboard para expertos y menú lateral tradicional para principiantes, junto con ordenamiento rápido de tablas por columnas.
8. **Estética y Diseño Minimalista**: Interfaz basada en Glassmorphism que oculta los datos complejos en tooltips activados por hover, reduciendo la carga cognitiva.
9. **Ayuda a los Usuarios a Recuperar de Errores**: Deshabilitación del botón de fichaje y alertas Toast informativas cuando el presupuesto es insuficiente o las alineaciones son inválidas.
10. **Ayuda y Documentación**: Contexto asistido por IA para el reporte de estrellas y etiquetas detalladas en todos los gráficos.

---

## 5. Decisiones Técnicas y Optimización de Código

* **Especialización de Datos de Porteros**: Diseñamos una lógica condicional en la conversión de datos que mapea las variables de porteros hacia el gráfico de radar, reduciendo su ataque a niveles mínimos lógicos y promediando sus atributos de paradas para reflejar una defensa real.
* **Estabilización de Ciclos de Renderizado (Simulación)**: Corregimos un bucle de ejecución infinita en el simulador de partidos (`Match.jsx`) memoizando la variable de nombres (`homeNames`) con `useMemo` y protegiendo el efecto de simulación con un control de referencia `lastProcessedMinute` de `useRef`. Esto estabilizó la simulación, reduciendo marcadores de goles irreales y limitándolos a resultados estándar de fútbol.
* **Interactividad de Modales**: Implementamos `AnimatePresence` de Framer Motion para suavizar la entrada y salida de las fichas de los jugadores, eliminando la tosquedad visual en las ventanas emergentes.

---

## 6. Tecnologías Utilizadas

* **Framework**: React (Vite)
* **Estilos**: Tailwind CSS y Glassmorphism
* **Animaciones**: Framer Motion
* **Visualización de Datos**: Recharts (LineChart, AreaChart, BarChart y RadarChart)
* **Iconografía**: Lucide React

---

## 7. Instalación y Despliegue

### Requisitos Previos
* Node.js (versión 18 o superior recomendada)
* npm

### Instrucciones de Instalación

1. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

3. Compilar el bundle de producción optimizado:
   ```bash
   npm run build
   ```
