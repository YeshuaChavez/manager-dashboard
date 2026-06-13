# Informe de Usabilidad y Evaluación Heurística: Football Manager Dashboard

Este informe técnico documenta y analiza la usabilidad del **Football Manager Dashboard (Edición FC Barcelona)**. El análisis se estructura evaluando cómo se aplican las **10 Heurísticas de Usabilidad de Jakob Nielsen** en cada una de las interfaces principales del sistema. 

El documento cuenta con secciones organizadas para cada interfaz, incluyendo espacios (placeholders) delimitados para añadir capturas de pantalla y sugerencias de descripciones de pie de imagen.

---

## Índice

1. [Introducción y Metodología](#introducción-y-metodología)
2. [Evaluación Detallada por Interfaz](#evaluación-detallada-por-interfaz)
   - [2.1. Dashboard (Panel de Control Principal)](#21-dashboard-panel-de-control-principal)
   - [2.2. Plantilla (Gestión de Jugadores y Ficha Técnica)](#22-plantilla-gestión-de-jugadores-y-ficha-técnica)
   - [2.3. Táctica (Alineación y Parámetros del Campo)](#23-táctica-alineación-y-parámetros-del-campo)
   - [2.4. Mercado (Fichajes y Transferencias)](#24-mercado-fichajes-y-transferencias)
   - [2.5. Partido (Simulación e Incidentes en Vivo)](#25-partido-simulación-e-incidentes-en-vivo)
   - [2.6. Estadísticas (Líderes y Gráficos de Rendimiento)](#26-estadísticas-líderes-y-gráficos-de-rendimiento)
   - [2.7. Clasificación (Tabla de Posiciones de la Liga)](#27-clasificación-tabla-de-posiciones-de-la-liga)
3. [Conclusiones Generales](#conclusiones-generales)

---

## 1. Introducción y Metodología

El objetivo de este informe es evaluar la interacción humano-computador (IHC) de la aplicación interactiva de simulación técnica de fútbol. Para ello, se han tomado como marco de referencia las **10 Heurísticas de Usabilidad propuestas por Jakob Nielsen**. 

Cada pantalla se analiza de manera independiente para identificar qué principios de diseño centrado en el usuario rigen su comportamiento. Esto garantiza que la aplicación no solo sea visualmente atractiva (bajo el estilo estético *Glassmorphism*), sino también funcional, eficiente y fácil de aprender para cualquier usuario.

---

## 2. Evaluación Detallada por Interfaz

### 2.1. Dashboard (Panel de Control Principal)

El Dashboard actúa como la central de información del club, resumiendo las métricas del plantel, el presupuesto, el próximo partido y el análisis de la estrella destacada.

#### Espacio para Captura de Pantalla
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                 [ PEGAR AQUÍ CAPTURA DEL DASHBOARD ]                     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```
> **Descripción del Screenshot**: *Vista general del Dashboard del FC Barcelona que muestra las tarjetas de estadísticas superiores, la conexión con los otros módulos, el gráfico de rendimiento mensual y la ficha rotativa de la estrella destacada con su gráfico de radar.*

#### Heurísticas de Usabilidad Cumplidas

* **Heurística 1: Visibilidad del Estado del Sistema**: El panel de "Estado del Plantel" muestra mediante barras de progreso en tiempo real la moral general, condición física y la confianza de la directiva, permitiendo al usuario saber inmediatamente la salud de su equipo.
* **Heurística 2: Relación entre el Sistema y el Mundo Real**: El gráfico de radar para el reporte del jugador mapea los atributos futbolísticos tradicionales (Ataque, Defensa, Pase, Regate, Físico, Velocidad). En el caso de los porteros (como Ter Stegen), la "Defensa" se calcula promediando sus reflejos y estiradas, evitando contradicciones conceptuales.
* **Heurística 6: Reconocimiento antes que Recuerdo**: Implementa **Navegación Cruzada**. El usuario no necesita recordar dónde se simula el partido o dónde se compran jugadores; hacer clic en la tarjeta de "Próximo Partido" lo redirige a la simulación, y hacer clic en "Presupuesto Disponible" lo lleva a Transferencias.
* **Heurística 8: Estética y Diseño Minimalista**: Se eliminó el exceso de avatares pequeños en la cabecera del reporte para reducir el ruido visual, dando prioridad a un retrato del jugador grande (`w-40 h-40`) y a un gráfico de radar limpio cuyos detalles numéricos solo aparecen al interactuar.

---

### 2.2. Plantilla (Gestión de Jugadores y Ficha Técnica)

Esta interfaz lista a los jugadores del primer equipo y reservas, y permite acceder a una ficha de rendimiento histórico individualizado.

#### Espacio para Captura de Pantalla
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                  [ PEGAR AQUÍ CAPTURA DE PLANTILLA ]                     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```
> **Descripción del Screenshot**: *Tabla de jugadores de la plantilla con opciones de filtrado y el modal glassmorphic abierto que detalla el historial y rendimiento de los últimos 5 partidos del jugador.*

#### Heurísticas de Usabilidad Cumplidas

* **Heurística 3: Control y Libertad del Usuario**: Al hacer clic en un jugador se abre una ficha detallada en un modal. El usuario tiene total libertad de cerrar esta ventana flotante haciendo clic en el botón de cerrar (`X`) o haciendo clic fuera del modal (en el backdrop sombreado).
* **Heurística 4: Consistencia y Estándares**: Las posiciones de juego se identifican con colores estandarizados de forma consistente (GK en dorado, defensas en azul, mediocampistas en verde, etc.), facilitando la lectura rápida.
* **Heurística 6: Reconocimiento antes que Recuerdo**: En el modal de detalles, el estado de forma se representa con un gráfico de líneas continuo (`P1` a `P5`). El usuario no necesita memorizar o calcular el rendimiento reciente del jugador, el gráfico y el tooltip se lo muestran al instante.
* **Heurística 7: Flexibilidad y Eficiencia de Uso**: Dispone de un panel de ordenamiento rápido en la cabecera de la tabla que permite organizar instantáneamente la lista por Media (Rating), Goles, Asistencias o Edad con un solo clic.

---

### 2.3. Táctica (Alineación y Parámetros del Campo)

La pizarra táctica permite al usuario arrastrar jugadores a sus puestos preferidos y modificar las directrices tácticas globales del equipo.

#### Espacio para Captura de Pantalla
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                   [ PEGAR AQUÍ CAPTURA DE TÁCTICA ]                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```
> **Descripción del Screenshot**: *Pizarra táctica interactiva que muestra las camisetas de los jugadores distribuidas sobre el campo de juego y los controladores laterales continuos de Mentalidad y Línea de Presión.*

#### Heurísticas de Usabilidad Cumplidas

* **Heurística 1: Visibilidad del Estado del Sistema**: Los deslizadores táctiles ubicados en los márgenes de la cancha (Moral y Línea de Presión) muestran de forma continua el porcentaje (%) y nivel actual, brindando feedback interactivo inmediato conforme se arrastran o seleccionan.
* **Heurística 3: Control y Libertad del Usuario**: El usuario puede reposicionar a los jugadores titulares y suplentes de forma interactiva (arrastrar y soltar o clics), permitiendo deshacer cambios con facilidad.
* **Heurística 6: Reconocimiento antes que Recuerdo**: Las posiciones se representan visualmente sobre una simulación física del campo de fútbol. El usuario reconoce de inmediato la formación (ej. 4-3-3) en lugar de tener que interpretar una lista textual abstracta de posiciones.
* **Heurística 9: Ayuda a los Usuarios a Reconocer y Recuperarse de Errores**: La aplicación detecta y previene configuraciones erróneas. Por ejemplo, si intentas colocar a un arquero como delantero o si dejas puestos vacíos, el sistema despliega notificaciones emergentes Toast descriptivas indicando exactamente el problema.

---

### 2.4. Mercado (Fichajes y Transferencias)

Esta pantalla controla la búsqueda de jugadores disponibles en el mercado internacional, las transacciones financieras y las negociaciones del club.

#### Espacio para Captura de Pantalla
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                   [ PEGAR AQUÍ CAPTURA DE MERCADO ]                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```
> **Descripción del Screenshot**: *Panel de transferencias con los filtros de búsqueda por precio y valoración y el modal de confirmación de compra de un futbolista estrella.*

#### Heurísticas de Usabilidad Cumplidas

* **Heurística 4: Consistencia y Estándares**: Las divisas y valores del presupuesto del club se muestran en formato estándar de moneda (`€`), asegurando la consistencia numérica en toda la plataforma.
* **Heurística 5: Prevención de Errores**: Al hacer clic en comprar, el sistema no ejecuta la acción inmediatamente. Muestra un modal intermedio con los datos del jugador y los costos detallados, previniendo compras por error.
* **Heurística 7: Flexibilidad y Eficiencia de Uso**: Los controles de ordenación por Precio e índice de Valoración utilizan flechas de dirección consistentes (`↑` para indicar que el valor más alto está arriba y `↓` para el orden inverso), permitiendo una búsqueda ágil y rápida.
* **Heurística 9: Ayudar a los Usuarios a Reconocer y Recuperarse de Errores**: Si el usuario intenta comprar un jugador cuyo valor supera el presupuesto del club, el sistema bloquea el botón y genera un Toast de advertencia descriptivo: *"Presupuesto insuficiente para completar este fichaje"*.

---

### 2.5. Partido (Simulación e Incidentes en Vivo)

El simulador de partidos reproduce los 90 minutos de juego mostrando incidentes, disparos a portería y estadísticas de posesión.

#### Espacio para Captura de Pantalla
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                   [ PEGAR AQUÍ CAPTURA DE PARTIDO ]                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```
> **Descripción del Screenshot**: *Simulación en vivo del partido mostrando el cronómetro activo, la lista cronológica de eventos con sus iconos correspondientes, el mapa de calor y el arco con los puntos de disparos.*

#### Heurísticas de Usabilidad Cumplidas

* **Heurística 1: Visibilidad del Estado del Sistema**: El simulador informa en tiempo real mediante un reloj activo (minuto a minuto), una barra de progreso lineal del tiempo y el marcador de goles de ambos equipos.
* **Heurística 2: Relación entre el Sistema y el Mundo Real**: La interfaz cuenta con una representación física de un arco de fútbol donde se marcan los tiros a puerta (goles en azul, fallados en rojo) y un mapa de calor táctico, relacionando la simulación abstracta con elementos físicos del deporte real.
* **Heurística 6: Reconocimiento antes que Recuerdo**: Cada evento en la línea de tiempo se acompaña de un icono representativo estándar: `⚽` para goles, `🟨` para amonestaciones y `🔄` para sustituciones de jugadores. El usuario reconoce el evento sin necesidad de leer todo el texto.
* **Heurística 9: Ayuda a los usuarios a recuperarse de errores**: Implementa controles mediante `useRef` (`lastProcessedMinute`) y memoizaciones en React que resuelven bucles lógicos infinitos de renderizado. Esto asegura que la simulación de incidentes ocurra exactamente una vez por minuto simulado, evitando que el usuario obtenga marcadores irreales (como partidos con 15 a 20 goles).

---

### 2.6. Estadísticas (Líderes y Gráficos de Rendimiento)

El panel de estadísticas consolida el rendimiento global de la temporada, organizando líderes de goles, asistencias y rendimiento grupal.

#### Espacio para Captura de Pantalla
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                 [ PEGAR AQUÍ CAPTURA DE ESTADÍSTICAS ]                   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```
> **Descripción del Screenshot**: *Pantalla de estadísticas generales de la temporada destacando a los máximos goleadores y asistentes mediante barras horizontales y gráficos de rendimiento.*

#### Heurísticas de Usabilidad Cumplidas

* **Heurística 4: Consistencia y Estándares**: Se reemplazaron emojis genéricos por iconos estandarizados de la biblioteca Lucide (como la corona `Crown` para el goleador y el rayo `Zap` para la efectividad), manteniendo una consistencia visual profesional.
* **Heurística 6: Reconocimiento antes que Recuerdo**: Los gráficos interactivos cuentan con tooltips configurados con tipografía blanca sobre fondo oscuro. Al pasar el cursor, el sistema detalla los valores numéricos específicos de forma legible y contrastada, liberando al usuario de tener que calcular los datos de forma visual.
* **Heurística 8: Estética y Diseño Minimalista**: Los datos complejos se consolidan en gráficos horizontales de barras y líneas en lugar de extensas tablas con múltiples números. El diseño limpio prioriza la información crítica del rendimiento del club.

---

### 2.7. Clasificación (Tabla de Posiciones de la Liga)

Esta interfaz muestra la clasificación general del campeonato y la distribución agregada de resultados de victorias, empates y derrotas.

#### Espacio para Captura de Pantalla
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                [ PEGAR AQUÍ CAPTURA DE CLASIFICACIÓN ]                   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```
> **Descripción del Screenshot**: *Tabla de clasificación general de la liga española y el gráfico optimizado horizontal de distribución de resultados ocupando todo el ancho inferior.*

#### Heurísticas de Usabilidad Cumplidas

* **Heurística 1: Visibilidad del Estado del Sistema**: La tabla de posiciones muestra detalladamente los puntos, partidos jugados, diferencia de goles y la forma reciente de todos los equipos del campeonato, reflejando el estado actual de la liga.
* **Heurística 4: Consistencia y Estándares**: El equipo gestionado por el usuario (Barcelona) está destacado visualmente mediante una franja azul brillante en el borde izquierdo de la fila, permitiendo al usuario reconocer de inmediato su posición de un solo vistazo.
* **Heurística 8: Estética y Diseño Minimalista**: Se rediseñó el gráfico de "Distribución de Resultados" a un formato de **barras horizontales** (`layout="vertical"` en Recharts) para aprovechar de manera eficiente todo el espacio inferior. El uso de colores semánticos diferenciados para Victorias, Empates y Derrotas consolida los datos sin saturación de elementos.

---

## 3. Conclusiones Generales

La evaluación del **Football Manager Dashboard** demuestra un alto nivel de cumplimiento de las **Heurísticas de Usabilidad de Nielsen**. El diseño de la aplicación logra un excelente equilibrio entre estética y usabilidad, destacando en los siguientes puntos:

1. **Eficiencia y Claridad Táctica**: Al modelar las acciones sobre metáforas del mundo real (como el campo de juego y tarjetas FUT), la curva de aprendizaje se reduce significativamente.
2. **Navegación Fluida e Integrada**: La implementación de navegación cruzada en el Dashboard transforma a esta pantalla en un verdadero centro de mando interactivo y dinámico, unificando los diferentes módulos de la aplicación.
3. **Robustez Técnica y Prevención de Errores**: La corrección de bucles de simulación y el control de transiciones aseguran un rendimiento técnico impecable y una interacción confiable libre de frustraciones para el usuario.
