"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const legal = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/home" className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-purple-800 transition-colors">
            <Sparkles className="h-4 w-4 text-purple-800" />
            nova.ai
          </Link>
          <nav className="hidden items-center gap-4 sm:flex">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {legal.map((l) => (
            <Link key={l.label} href={l.href} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {l.label}
            </Link>
          ))}
          <span className="text-xs text-gray-300">&copy; {new Date().getFullYear()} nova.ai</span>
        </div>
      </div>
    </footer>
  );
}
