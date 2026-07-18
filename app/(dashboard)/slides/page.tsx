"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  Briefcase,
  CheckCircle2,
  Download,
  GraduationCap,
  ImageIcon,
  Lightbulb,
  Loader2,
  Megaphone,
  MessageCircle,
  PanelLeftOpen,
  SlidersHorizontal,
  User,
} from "lucide-react";
import axios from "axios";

const slideCounts = [5, 7, 9];

const tones = [
  { label: "Professional", icon: <Briefcase className="h-3.5 w-3.5" /> },
  { label: "Educational", icon: <GraduationCap className="h-3.5 w-3.5" /> },
  { label: "Casual", icon: <MessageCircle className="h-3.5 w-3.5" /> },
  { label: "Creative", icon: <Lightbulb className="h-3.5 w-3.5" /> },
  { label: "Persuasive", icon: <Megaphone className="h-3.5 w-3.5" /> },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  slideCount?: number;
  tone?: string;
  downloadUrl?: string;
  isLoading?: boolean;
}

const Slides = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [slideCount, setSlideCount] = useState(5);
  const [tone, setTone] = useState("Professional");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      slideCount,
      tone,
    };

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "/api/slides",
        { topic: input, slideCount, tone },
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });
      const downloadUrl = URL.createObjectURL(blob);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, isLoading: false, downloadUrl }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, isLoading: false, content: "Failed to generate slides. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (url: string, topic: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${topic.replace(/[^a-zA-Z0-9]/g, "_")}.pptx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRelatedUser = (assistantId: string) => {
    const idx = messages.findIndex((m) => m.id === assistantId);
    for (let i = idx - 1; i >= 0; i--) {
      if (messages[i].role === "user") return messages[i];
    }
    return null;
  };

  return (
    <main className="relative flex flex-col pb-28 h-full max-h-screen">
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
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">AI-Powered Content</span>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">Professional Design</span>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">Custom Images</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col gap-2">
                {msg.role === "user" && (
                  <div className="flex justify-end gap-3">
                    <div className="max-w-[75%] rounded-2xl bg-violet-600 px-4 py-3 text-sm leading-relaxed text-white">
                      <p className="font-medium">{msg.content}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-500 px-2.5 py-0.5 text-[11px] font-medium text-violet-100">
                          <PanelLeftOpen className="h-3 w-3" />
                          {msg.slideCount} slides
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-500 px-2.5 py-0.5 text-[11px] font-medium text-violet-100">
                          <SlidersHorizontal className="h-3 w-3" />
                          {msg.tone}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                )}

                {msg.role === "assistant" && (
                  <div className="flex justify-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                      <PanelLeftOpen className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="flex flex-col gap-3">
                      {msg.isLoading ? (
                        <div className="w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                          <div className="flex h-44 items-center justify-center bg-gradient-to-br from-violet-50 via-white to-violet-50">
                            <div className="flex flex-col items-center gap-3">
                              <Loader2 className="h-10 w-10 text-violet-500 animate-spin" />
                              <span className="text-sm font-medium text-violet-600">
                                Generating your presentation...
                              </span>
                            </div>
                          </div>
                          <div className="border-t border-gray-100 px-4 py-3">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <div className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                              Creating slides with AI-powered content
                            </div>
                          </div>
                        </div>
                      ) : msg.downloadUrl ? (
                        <div className="w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                          <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800">
                            <div className="flex flex-col items-center gap-2 text-white">
                              <PanelLeftOpen className="h-12 w-12 opacity-80" />
                              <span className="text-sm font-semibold">
                                {getRelatedUser(msg.id)?.slideCount || 5} Slides Generated
                              </span>
                            </div>
                            <div className="absolute right-3 top-3">
                              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                                <CheckCircle2 className="h-3 w-3" />
                                Complete
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3 px-4 py-4">
                            <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                                <PanelLeftOpen className="h-4 w-4 text-violet-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900">
                                  {getRelatedUser(msg.id)?.content || "Presentation"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {getRelatedUser(msg.id)?.slideCount || 5} slides &middot; {getRelatedUser(msg.id)?.tone || "Professional"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <ImageIcon className="h-3.5 w-3.5" />
                              Includes AI-generated images for each slide
                            </div>
                            <button
                              onClick={() =>
                                handleDownload(
                                  msg.downloadUrl!,
                                  getRelatedUser(msg.id)?.content || "presentation"
                                )
                              }
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 active:bg-violet-800"
                            >
                              <Download className="h-4 w-4" />
                              Download PPTX
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-[75%] rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-900">
                          {msg.content}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 my-6 py-8` md:px-8">
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
              disabled={isLoading}
              placeholder={isLoading ? "Generating presentation..." : "What should the presentation be about?"}
              className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowUp className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Slides;
