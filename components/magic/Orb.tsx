"use client";

import { useEffect, useRef } from "react";

interface OrbProps {
  className?: string;
}

export function Orb({ className }: OrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();

    const blobs = [
      { x: 0.3, y: 0.4, r: 120, speedX: 0.7, speedY: 0.5, phase: 0 },
      { x: 0.7, y: 0.6, r: 100, speedX: 0.5, speedY: 0.8, phase: 2 },
      { x: 0.5, y: 0.3, r: 90, speedX: 0.6, speedY: 0.4, phase: 4 },
    ];

    const draw = () => {
      t += 0.01;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const b of blobs) {
        const x = w * b.x + Math.sin(t * b.speedX + b.phase) * w * 0.15;
        const y = h * b.y + Math.cos(t * b.speedY + b.phase) * h * 0.15;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        grad.addColorStop(0, "rgba(88, 28, 135, 0.18)");
        grad.addColorStop(0.5, "rgba(124, 58, 237, 0.08)");
        grad.addColorStop(1, "rgba(124, 58, 237, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
