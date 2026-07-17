"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
}

export function Marquee({ items, className, speed = 30 }: MarqueeProps) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex w-max gap-6"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {duplicated.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-5 py-2 text-sm font-medium text-purple-800 whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
