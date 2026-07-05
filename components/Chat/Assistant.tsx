"use client";

import { useState, useRef, useEffect } from "react";
import { submitChat, ChatMessage } from "@/app/services/api";
import { MessageSquare, Sparkles, X, Send, Bot, User, Loader2, BookOpen, AlertTriangle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
  sources?: Array<{ text: string; source: string; page: number }>;
}

const suggestedPrompts = [
  "What should be done before a flood?",
  "How should we plan evacuation routes?",
  "Shelter capacity recommendations?",
  "What is the role of relief teams?",
];

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am Aegis AI, your disaster intelligence decision assistant. Ask me questions about official emergency procedures, flood guidelines, or shelter planning.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    // Add user message
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Prepare history for API
    const history: ChatMessage[] = messages.map((m) => ({
      role: m.role,
      message: m.text,
    }));

    try {
      const res = await submitChat(text, history);
      if (res) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: res.answer,
            sources: res.sources,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "I couldn't contact the Aegis API server. Please make sure the backend is running at http://localhost:8000.",
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "An error occurred while connecting to the assistant service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Expanded Chatbox */}
      {isOpen && (
        <div className="mb-4 w-[380px] sm:w-[420px] h-[550px] bg-[#32353B] border border-[#45484F] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-[#26282D] border-b border-[#3A3D43] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Sparkles className="text-amber-400" size={18} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">Aegis AI Assistant</h3>
                <span className="text-[10px] text-green-400 font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  RAG Knowledge Base
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white rounded-lg p-1 hover:bg-[#32353B] transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar */}
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 shadow-md ${
                    msg.role === "user" ? "bg-[#F7F3EC] text-[#26282D]" : "bg-[#26282D] text-white"
                  }`}
                >
                  {msg.role === "user" ? <User size={15} /> : <Bot size={15} />}
                </div>

                {/* Bubble content */}
                <div className="space-y-2">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                      msg.role === "user"
                        ? "bg-[#F7F3EC] text-[#26282D] border-transparent"
                        : "bg-[#26282D] text-gray-200 border-[#40444D]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  {/* RAG Sources Accordion */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="bg-[#26282D]/60 rounded-xl border border-gray-800 p-2.5 space-y-1.5">
                      <button
                        onClick={() => setExpandedSources(expandedSources === index ? null : index)}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition"
                      >
                        <BookOpen size={12} />
                        {expandedSources === index ? "Hide Sources" : `View Retrived Guidelines (${msg.sources.length})`}
                      </button>

                      {expandedSources === index && (
                        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1 pt-1.5 border-t border-gray-800">
                          {msg.sources.map((src, i) => (
                            <div key={i} className="text-[10px] bg-[#1e2024] p-2 rounded-lg space-y-1">
                              <span className="text-white font-semibold">
                                {src.source} (Page {src.page})
                              </span>
                              <p className="text-gray-400 leading-normal italic">
                                "{src.text.slice(0, 140)}..."
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                <div className="h-8 w-8 rounded-lg bg-[#26282D] text-white flex items-center justify-center">
                  <Bot size={15} />
                </div>
                <div className="bg-[#26282D] text-gray-400 border border-[#40444D] rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Analyzing official SOPs...
                </div>
              </div>
            )}

            {/* Empty space anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick recommendations */}
          {messages.length === 1 && (
            <div className="px-5 py-2 flex flex-wrap gap-1.5 bg-[#26282D]/40">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="text-[10.5px] bg-[#26282D] text-gray-300 border border-gray-700 hover:border-[#F7F3EC] rounded-lg px-2.5 py-1.5 transition text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Panel */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-4 bg-[#26282D] border-t border-[#3A3D43] flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about evacuation plans, shelters..."
              className="flex-1 bg-[#32353B] border border-[#45484F] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F7F3EC] transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="h-10 w-10 rounded-xl bg-[#F7F3EC] text-[#26282D] flex items-center justify-center hover:scale-105 active:scale-95 transition shrink-0 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-[#F7F3EC] text-[#26282D] shadow-xl hover:scale-110 active:scale-90 transition flex items-center justify-center border-2 border-white/20 hover:bg-white"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
