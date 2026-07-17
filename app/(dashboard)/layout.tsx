"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Video, MessageSquareText, PanelLeftOpen, ImagePlus, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";

const navLinks = [
  { name: "Chat", link: "/chat", icon: <MessageSquareText className="h-4 w-4" /> },
  { name: "Code", link: "/code", icon: <MessageSquareText className="h-4 w-4" /> },
  { name: "Image Generation", link: "/image-generation", icon: <ImagePlus className="h-4 w-4" /> },
  { name: "Video Generation", link: "/video-generation", icon: <Video className="h-4 w-4" /> },
  { name: "Slides", link: "/slides", icon: <PanelLeftOpen className="h-4 w-4" /> },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/auth/session")
      .then((res) => {
        if (res.data?.user) {
          setAuth(true);
        } else {
          router.push("/home");
        }
      })
      .catch(() => router.push("/home"));
  }, [router]);

  if (auth === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <header className="hidden md:flex md:w-72 md:flex-col md:items-center border-r border-zinc-200 bg-white py-6">
        <Link href="/home" className="mb-8 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="text-purple-800 text-md font-bold">nova.ai</span>
        </Link>
        <nav className="flex flex-col gap-1 px-3">
          {navLinks.map((nav) => (
            <Link
              key={nav.link}
              href={nav.link}
              className={`flex items-center gap-2 rounded-xl py-2 px-3 text-sm font-medium transition-colors ${
                pathname === nav.link
                  ? "bg-purple-100 text-purple-800"
                  : "text-gray-600 hover:bg-gray-100 hover:text-purple-800"
              }`}
            >
              {nav.icon}
              {nav.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-3">
          <button
            onClick={() => signOut({ callbackUrl: "/home" })}
            className="flex w-full items-center gap-2 rounded-xl py-2 px-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </header>

      <div className="md:hidden fixed top-16 left-0 z-30 flex items-center">
        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center text-gray-600 hover:text-purple-600 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-72 flex-col bg-white py-6 shadow-xl transition-transform duration-200 ease-out">
            <div className="mb-8 flex items-center justify-between px-4">
              <Link href="/home" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="text-purple-800 text-md font-bold">nova.ai</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-3">
              {navLinks.map((nav) => (
                <Link
                  key={nav.link}
                  href={nav.link}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-xl py-2 px-3 text-sm font-medium transition-colors ${
                    pathname === nav.link
                      ? "bg-purple-100 text-purple-800"
                      : "text-gray-600 hover:bg-gray-100 hover:text-purple-800"
                  }`}
                >
                  {nav.icon}
                  {nav.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto px-3">
              <button
                onClick={() => { setOpen(false); signOut({ callbackUrl: "/home" }); }}
                className="flex w-full items-center gap-2 rounded-xl py-2 px-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </aside>
        </div>
      )}

      <section className="flex-1 min-h-0">{children}</section>
    </div>
  );
}
