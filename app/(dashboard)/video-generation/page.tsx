"use client";

import React, { useState } from "react";
import {
  ArrowUp,
  Film,
  User,
} from "lucide-react";
import axios from "axios";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  videoUrl?: string;
  videoLoaded?: boolean;
}

const VideoGeneration = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const markVideoLoaded = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, videoLoaded: true } : m))
    );
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/videos", { prompt: input });
      const data = res.data;
      if (data.videoUrl) {
        const assistantMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "",
          videoUrl: data.videoUrl,
          videoLoaded: false,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch {
      const errorMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "Failed to generate video." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative h-full max-h-screen">
      <div className="h-full overflow-y-auto px-4 md:px-8 py-6 pb-24">
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

                {msg.role === "assistant" && msg.videoUrl && (
                  <div className="flex justify-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                      <Film className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                      {!msg.videoLoaded ? (
                        <div className="flex h-48 w-72 items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100">
                          <div className="flex flex-col items-center gap-3">
                            <div className="h-10 w-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
                            <span className="text-xs font-medium text-violet-500">Generating video...</span>
                          </div>
                        </div>
                      ) : null}
                      <video
                        src={msg.videoUrl}
                        controls
                        className={`block ${msg.videoLoaded ? "" : "hidden"}`}
                        onLoadedData={() => markVideoLoaded(msg.id)}
                      />
                    </div>
                  </div>
                )}

                {msg.role === "assistant" && !msg.videoUrl && (
                  <div className="flex justify-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                      <Film className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-900">{msg.content}</div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                  <Film className="h-4 w-4 text-violet-600" />
                </div>
                <div className="flex h-48 w-72 items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-violet-50 to-violet-100">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
                    <span className="text-xs font-medium text-violet-500">Generating video...</span>
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
          className="mx-auto flex max-w-3xl items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "Generating video..." : "Describe the video you want to create..."}
            className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </form>
      </section>
    </main>
  );
};

export default VideoGeneration;
