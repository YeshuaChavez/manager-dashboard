import React, { useEffect, useRef } from "react";

export function Heatmap({ points = [], className = "" }) {
  const canvasRef = useRef(null);

  // If no points provided, generate some default soccer heatmap coordinates
  const heatPoints = points.length > 0 
    ? points 
    : [
        { x: 35, y: 45, r: 25, val: 0.8 },
        { x: 75, y: 35, r: 35, val: 0.9 },
        { x: 80, y: 65, r: 28, val: 0.75 },
        { x: 50, y: 50, r: 30, val: 0.6 },
        { x: 20, y: 50, r: 20, val: 0.4 },
      ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // 1. Draw Football Field Background & Markings
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0c4013"; // Dark turf green
    ctx.fillRect(0, 0, w, h);

    // Grid lines for grass texture
    ctx.fillStyle = "#0e4716";
    for (let i = 0; i < w; i += 20) {
      if ((i / 20) % 2 === 0) {
        ctx.fillRect(i, 0, 10, h);
      }
    }

    // Field lines style
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;

    // Outer boundary
    ctx.strokeRect(6, 6, w - 12, h - 12);

    // Center line
    ctx.beginPath();
    ctx.moveTo(w / 2, 6);
    ctx.lineTo(w / 2, h - 6);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 25, 0, 2 * Math.PI);
    ctx.stroke();

    // Penalty box - Left
    ctx.strokeRect(6, h / 2 - 35, 30, 70);
    ctx.strokeRect(6, h / 2 - 18, 12, 36);

    // Penalty box - Right
    ctx.strokeRect(w - 36, h / 2 - 35, 30, 70);
    ctx.strokeRect(w - 18, h / 2 - 18, 12, 36);

    // 2. Draw Heat Map (glowing radial gradients)
    // Create a temporary overlay canvas to handle alpha blending
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext("2d");

    heatPoints.forEach(p => {
      // Map percentages to pixels
      const px = (p.x / 100) * w;
      const py = (p.y / 100) * h;
      const rad = p.r || 30;
      const intensity = p.val || 0.5;

      const grad = tempCtx.createRadialGradient(px, py, 1, px, py, rad);
      // Heat color scheme: Red -> Orange -> Yellow -> Green -> Transparent
      grad.addColorStop(0, `rgba(239, 68, 68, ${intensity})`);    // Red center
      grad.addColorStop(0.2, `rgba(245, 158, 11, ${intensity * 0.85})`); // Orange
      grad.addColorStop(0.5, `rgba(234, 179, 8, ${intensity * 0.5})`);  // Yellow
      grad.addColorStop(0.8, `rgba(16, 185, 129, ${intensity * 0.15})`); // Green edge
      grad.addColorStop(1, "rgba(16, 185, 129, 0)");

      tempCtx.fillStyle = grad;
      tempCtx.beginPath();
      tempCtx.arc(px, py, rad, 0, 2 * Math.PI);
      tempCtx.fill();
    });

    // Draw heatmap onto field
    ctx.globalAlpha = 0.85;
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.globalAlpha = 1.0;

  }, [heatPoints]);

  return (
    <div className={`bg-slate-950/60 border border-white/5 p-4 rounded-2xl backdrop-blur-xl ${className}`}>
      <h3 className="text-xs font-bold mb-3 text-white/50 uppercase tracking-widest">
        Mapa de Calor de Actividad
      </h3>
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <canvas 
          ref={canvasRef} 
          width={320} 
          height={180} 
          className="w-full h-auto block"
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/30 mt-2.5 px-1">
        <span>Defensa</span>
        <span>Mediocampo</span>
        <span>Ataque</span>
      </div>
    </div>
  );
}
