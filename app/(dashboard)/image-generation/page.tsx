"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  ImagePlus,
  RectangleHorizontal,
  RectangleVertical,
  Square,
  User,
} from "lucide-react";
import axios from "axios";

type AspectRatio = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const aspectRatios: AspectRatio[] = [
  { label: "1:1", value: "1:1", icon: <Square className="h-4 w-4" /> },
  { label: "16:9", value: "16:9", icon: <RectangleHorizontal className="h-4 w-4" /> },
  { label: "9:16", value: "9:16", icon: <RectangleVertical className="h-4 w-4" /> },
  { label: "4:3", value: "4:3", icon: <RectangleHorizontal className="h-4 w-4" /> },
  { label: "3:4", value: "3:4", icon: <RectangleVertical className="h-4 w-4" /> },
];

const ratioDimensions: Record<string, { width: string; height: string }> = {
  "1:1": { width: "256px", height: "256px" },
  "16:9": { width: "320px", height: "180px" },
  "9:16": { width: "180px", height: "320px" },
  "4:3": { width: "284px", height: "213px" },
  "3:4": { width: "213px", height: "284px" },
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  aspectRatio?: string;
  imageLoaded?: boolean;
}

const ImageGeneration = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [ratio, setRatio] = useState("1:1");
  const [isLoading, setIsLoading] = useState(false);

  const markImageLoaded = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, imageLoaded: true } : m))
    );
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input, aspectRatio: ratio };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/images", { prompt: input, ratio });
      const data = res.data;
      if (data.imageUrl) {
        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "",
          imageUrl: data.imageUrl,
          aspectRatio: ratio,
          imageLoaded: false,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch {
      const errorMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "Failed to generate image." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative h-full">
      <div className="h-full overflow-y-auto px-4 md:px-8 py-6 pb-40">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <ImagePlus className="h-8 w-8 text-violet-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Create images with AI</h2>
            <p className="max-w-sm text-sm text-gray-500">
              Describe what you want to see and let Nova generate it for you.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col gap-2">
                {msg.role === "user" && (
                  <div className="flex justify-end gap-3">
                    <div className="max-w-[75%] rounded-2xl bg-violet-600 px-4 py-3 text-sm leading-relaxed text-white">
                      <p>{msg.content}</p>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                )}

                {msg.role === "assistant" && msg.imageUrl && (
                  <div className="flex justify-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                      <ImagePlus className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                      {!msg.imageLoaded ? (
                        <div
                          className="flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100"
                          style={ratioDimensions[msg.aspectRatio || "1:1"]}
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className="h-10 w-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
                            <span className="text-xs font-medium text-violet-500">Generating...</span>
                          </div>
                        </div>
                      ) : null}
                      <img
                        src={msg.imageUrl}
                        alt={msg.content}
                        className={`block ${msg.imageLoaded ? "" : "hidden"}`}
                        style={ratioDimensions[msg.aspectRatio || "1:1"]}
                        onLoad={() => markImageLoaded(msg.id)}
                      />
                    </div>
                  </div>
                )}

                {msg.role === "assistant" && !msg.imageUrl && (
                  <div className="flex justify-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                      <ImagePlus className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-900">{msg.content}</div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                  <ImagePlus className="h-4 w-4 text-violet-600" />
                </div>
                <div
                  className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-violet-50 to-violet-100"
                  style={ratioDimensions[ratio]}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
                    <span className="text-xs font-medium text-violet-500">Generating...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-4 md:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mx-auto flex max-w-3xl flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">Ratio</span>
            <div className="flex gap-1">
              {aspectRatios.map((ar) => (
                <button
                  key={ar.value}
                  type="button"
                  onClick={() => setRatio(ar.value)}
                  disabled={isLoading}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    ratio === ar.value
                      ? "bg-violet-100 text-violet-700"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {ar.icon}
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder={isLoading ? "Generating image..." : "Describe the image you want to create..."}
              className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
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

export default ImageGeneration;
