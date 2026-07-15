"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  Clock,
  Film,
  Play,
  User,
} from "lucide-react";

const durations = [
  { label: "5s", value: 5 },
  { label: "10s", value: 10 },
  { label: "15s", value: 15 },
  { label: "20s", value: 20 },
  { label: "30s", value: 30 },
];

interface Message {
  role: "user" | "assistant";
  content: string;
  duration?: number;
}

const VideoGeneration = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState(5);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, duration },
    ]);
    setInput("");
  };

  return (
    <main className="flex flex-col h-full min-h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <Film className="h-8 w-8 text-violet-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Generate videos with AI
            </h2>
            <p className="max-w-sm text-sm text-gray-500">
              Describe a scene and let Nova bring it to life as a video clip.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-end gap-3">
                  <div className="max-w-[75%] rounded-2xl bg-violet-600 px-4 py-3 text-sm leading-relaxed text-white">
                    <p>{msg.content}</p>
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-violet-500 px-2 py-0.5 text-[11px] font-medium text-violet-100">
                      <Clock className="h-3 w-3" />
                      {msg.duration}s
                    </span>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                </div>

                <div className="flex justify-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                    <Film className="h-4 w-4 text-violet-600" />
                  </div>
                  <div className="flex h-48 w-72 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-violet-50 to-violet-100">
                    <div className="flex flex-col items-center gap-2 text-violet-300">
                      <Play className="h-10 w-10" />
                      <span className="text-xs font-medium">
                        {msg.duration}s video
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
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">Duration</span>
            <div className="flex gap-1">
              {durations.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuration(d.value)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    duration === d.value
                      ? "bg-violet-100 text-violet-700"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the video you want to create..."
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

export default VideoGeneration;
