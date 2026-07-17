"use client";

import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/home" className="flex items-center gap-2 font-semibold text-black hover:text-purple-800 transition-colors">
          <Sparkles className="h-5 w-5 text-purple-800" />
          <span className="text-lg tracking-tight">nova.ai</span>
        </Link>
        <section className="flex items-center gap-4">
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-purple-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/signup"
              className="ml-2 inline-flex h-9 items-center rounded-full bg-purple-800 px-5 text-sm font-medium text-white hover:bg-purple-900 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-black hover:bg-gray-100 hover:text-purple-800 transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-purple-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-9 items-center justify-center rounded-full bg-purple-800 px-4 text-sm font-medium text-white hover:bg-purple-900 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
