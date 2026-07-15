"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Megaphone,
  MessageCircle,
  PanelLeftOpen,
  SlidersHorizontal,
  User,
} from "lucide-react";

const slideCounts = [5, 7, 9];

const tones = [
  { label: "Professional", icon: <Briefcase className="h-3.5 w-3.5" /> },
  { label: "Educational", icon: <GraduationCap className="h-3.5 w-3.5" /> },
  { label: "Casual", icon: <MessageCircle className="h-3.5 w-3.5" /> },
  { label: "Creative", icon: <Lightbulb className="h-3.5 w-3.5" /> },
  { label: "Persuasive", icon: <Megaphone className="h-3.5 w-3.5" /> },
];

interface Message {
  role: "user" | "assistant";
  content: string;
  slideCount?: number;
  tone?: string;
}

const Slides = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [slideCount, setSlideCount] = useState(5);
  const [tone, setTone] = useState("Professional");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, slideCount, tone },
    ]);
    setInput("");
  };

  return (
    <main className="flex flex-col h-full min-h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <PanelLeftOpen className="h-8 w-8 text-violet-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Create presentation slides
            </h2>
            <p className="max-w-sm text-sm text-gray-500">
              Describe your topic and Nova will generate a polished slide deck
              for you.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-end gap-3">
                  <div className="max-w-[75%] rounded-2xl bg-violet-600 px-4 py-3 text-sm leading-relaxed text-white">
                    <p>{msg.content}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-500 px-2 py-0.5 text-[11px] font-medium text-violet-100">
                        <PanelLeftOpen className="h-3 w-3" />
                        {msg.slideCount} slides
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-500 px-2 py-0.5 text-[11px] font-medium text-violet-100">
                        <SlidersHorizontal className="h-3 w-3" />
                        {msg.tone}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                </div>

                <div className="flex justify-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                    <PanelLeftOpen className="h-4 w-4 text-violet-600" />
                  </div>
                  <div className="flex h-48 w-72 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-violet-50 to-violet-100">
                    <div className="flex flex-col items-center gap-2 text-violet-300">
                      <PanelLeftOpen className="h-10 w-10" />
                      <span className="text-xs font-medium">
                        {msg.slideCount} slides — {msg.tone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="border-t border-gray-200 bg-white px-4 py-4 md:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mx-auto flex max-w-3xl flex-col gap-3"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400">Slides</span>
              <div className="flex gap-1">
                {slideCounts.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSlideCount(count)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      slideCount === count
                        ? "bg-violet-100 text-violet-700"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden h-4 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400">Tone</span>
              <div className="flex flex-wrap gap-1">
                {tones.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setTone(t.label)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      tone === t.label
                        ? "bg-violet-100 text-violet-700"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What should the presentation be about?"
              className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Slides;
