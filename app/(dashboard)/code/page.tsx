"use client";

import React, { useState } from "react";
import { ArrowUp, Sparkles, User, Copy, Check } from "lucide-react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ParsedResponse {
  summary: string;
  code: string;
  language: string;
}

// Parse the response to extract summary and code
const parseResponse = (text: string): ParsedResponse => {
  const summaryMatch = text.match(/Summary:\s*([\s\S]*?)(?=```|$)/);
  const codeMatch = text.match(/```(\w*)\n([\s\S]*?)\n```/);

  const summary = summaryMatch ? summaryMatch[1].trim() : text;
  const code = codeMatch ? codeMatch[2].trim() : "";
  const language = codeMatch ? codeMatch[1] || "javascript" : "javascript";

  return { summary, code, language };
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/code", {
        messages: [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });
      const data = res.data;
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Failed to get response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="flex h-full flex-col relative max-h-screen">
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <Sparkles className="h-8 w-8 text-violet-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              How can I help you today?
            </h2>
            <p className="max-w-sm text-sm text-gray-500">
              Ask me anything — from writing and analysis to coding and creative ideas.
            </p>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                  </div>
                )}
                {msg.role === "assistant" ? (
                  <div className="max-w-[85%] flex flex-col gap-3">
                    {(() => {
                      const parsed = parseResponse(msg.content);
                      return (
                        <>
                          {parsed.summary && parsed.code && (
                            <>
                              {/* Summary Section */}
                              <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-900">
                                {parsed.summary}
                              </div>
                              {/* Code Section */}
                              <div className="rounded-2xl overflow-hidden bg-gray-900">
                                <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                                  <span className="text-xs font-semibold text-gray-400 uppercase">
                                    {parsed.language}
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(parsed.code, i)}
                                    className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-700 transition-colors"
                                  >
                                    {copiedIndex === i ? (
                                      <>
                                        <Check className="h-4 w-4" />
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="h-4 w-4" />
                                        Copy
                                      </>
                                    )}
                                  </button>
                                </div>
                                <SyntaxHighlighter
                                  language={parsed.language}
                                  style={vscDarkPlus}
                                  className="bg-gray-900! m-0! p-4!"
                                  wrapLongLines
                                >
                                  {parsed.code}
                                </SyntaxHighlighter>
                              </div>
                            </>
                          ) || (
                            <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-900">
                              {msg.content}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="max-w-[75%] rounded-2xl bg-violet-600 px-4 py-3 text-sm leading-relaxed text-white">
                    {msg.content}
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                  <Sparkles className="h-4 w-4 text-violet-600" />
                </div>
                <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
                    <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t border-gray-200 bg-white px-4 py-4 md:px-8">
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
            placeholder={isLoading ? "Waiting for response..." : "Ask anything..."}
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

export default Chat;
