"use client";

import { useEffect, useRef } from "react";

interface SnakeCursorProps {
  color?: string;
  width?: number;
  length?: number;
  speed?: number;
  glow?: boolean;
}

export function SnakeCursor({
  color = "#dc2626",
  width = 3,
  length = 30,
  speed = 0.18,
  glow = true,
}: SnakeCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = -100;
    let mouseY = -100;
    const trail: { x: number; y: number }[] = [];
    for (let i = 0; i < length; i++) trail.push({ x: -100, y: -100 });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      trail[0].x += (mouseX - trail[0].x) * speed;
      trail[0].y += (mouseY - trail[0].y) * speed;

      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * speed;
        trail[i].y += (trail[i - 1].y - trail[i].y) * speed;
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const t = i / trail.length;
        const currentWidth = width * (1 - t * 0.6);
        const alpha = 1 - t * 0.85;

        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, currentWidth, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        if (glow && i === 0) {
          ctx.beginPath();
          ctx.arc(trail[i].x, trail[i].y, currentWidth + 6, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.2;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [color, width, length, speed, glow]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
