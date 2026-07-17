"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  color?: string;
  glowSize?: number;
}

export function BorderBeam({
  children,
  className,
  duration = 4,
  color = "#7c3aed",
  glowSize = 40,
}: BorderBeamProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let deg = 0;
    let raf: number;
    const speed = 360 / (duration * 60);
    const tick = () => {
      deg = (deg + speed) % 360;
      el.style.setProperty("--angle", `${deg}deg`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <div ref={ref} className={cn("relative rounded-2xl", className)}>
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          padding: "1px",
          background: `conic-gradient(from var(--angle, 0deg), transparent 60%, ${color} 80%, transparent 100%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
        style={{
          padding: "1px",
          background: `conic-gradient(from var(--angle, 0deg), transparent 60%, ${color} 80%, transparent 100%)`,
          filter: `blur(${glowSize}px)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      {children}
    </div>
  );
}
