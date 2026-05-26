import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Cpu, User, ArrowUpRight, MessageSquare, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

const SUGGESTIONS = [
  "What is Kishan's full tech stack?",
  "Is Kishan available for international remote roles?",
  "What is his experience with WordPress and Shopify?",
  "How can I contact Kishan immediately?"
];

export default function RecruiterSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "ai",
      text: "Greetings. I am Kishan Dabhi's Neural Representative AI module. Ask me anything about his engineering credentials, React expertise, custom WordPress theme builders, or Shopify e-commerce installations.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      // Map history to the required format
      const historyContext = messages.map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyContext
        })
      });

      if (!res.ok) {
        throw new Error("Neural response gateway timeout");
      }

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: "ai",
        text: data.text || "I apologize, the cognitive array failed to compile a reply.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        sender: "ai",
        text: "System offline. Kishan is outstanding in communication: mail him directly at dabhikishan199@gmail.com or call +91 7046095482!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "initial-reset",
        sender: "ai",
        text: "Cognitive buffer cleared. How can I assist you with recruiting or hiring Kishan today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <section
      id="recruiter"
      className="relative min-h-screen py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-[40%] right-[30%] h-[320px] w-[320px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[25%] h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-4xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-2 animate-pulse">
            NEURAL ENGINE DIALOGUE // RECRUITER ASSISTANT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Interactive AI Recruiter Chat
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm leading-relaxed">
            Query Kishan&apos;s credentials instantly using his custom-trained Gemini Neural Agent. Instant responses on availability, projects, or contract logistics.
          </p>
          <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
        </div>

        {/* Chat Terminal Frame */}
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950/60 p-1 backdrop-blur-md overflow-hidden shadow-2xl">
          
          {/* Terminal Console Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
                AGENT_DABHI_KISHAN // ONLINE
              </span>
            </div>
            
            {/* Reset button */}
            <button
              onClick={handleResetChat}
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors uppercase"
            >
              <RefreshCw className="h-3 w-3" />
              Clear Dialogue
            </button>
          </div>

          {/* dialogue thread */}
          <div className="h-[360px] overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {messages.map((msg) => {
              const isAi = msg.sender === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3.5 max-w-[85%] ${isAi ? "mr-auto text-left" : "ml-auto flex-row-reverse text-right"}`}
                >
                  {/* Sender Icon */}
                  <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${
                    isAi ? "bg-zinc-900 border-zinc-800 text-blue-400" : "bg-neutral-800 border-neutral-700 text-zinc-200"
                  }`}>
                    {isAi ? <Cpu className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>

                  {/* Bubble wrapper */}
                  <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isAi
                      ? "bg-zinc-900/60 border border-zinc-900 text-zinc-300 font-sans"
                      : "bg-blue-600/10 border border-blue-500/20 text-blue-100 font-sans text-left"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* loading state */}
            {loading && (
              <div className="flex gap-3.5 max-w-[85%] mr-auto text-left">
                <div className="h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center shrink-0 text-blue-400">
                  <Cpu className="h-4 w-4 animate-spin" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-zinc-900/60 border border-zinc-900 text-zinc-500 font-mono text-[10px] uppercase tracking-wider flex items-center gap-2">
                  <span>Neural Agent processing inquiry...</span>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Prompt quick tags suggestions */}
          <div className="px-6 pb-4 pt-2 border-t border-zinc-900 flex flex-wrap gap-2 text-left bg-zinc-950/20">
            <span className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase w-full mb-1">
              SUGGESTED QUERY NODES:
            </span>
            {SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                onClick={() => handleSend(sug)}
                disabled={loading}
                className="rounded-full bg-zinc-900/40 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900 px-3 py-1.5 font-mono text-[9px] tracking-wider text-zinc-400 uppercase transition-all"
              >
                {sug} <ArrowUpRight className="inline h-2.5 w-2.5 ml-0.5 text-zinc-500" />
              </button>
            ))}
          </div>

          {/* Form input controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="border-t border-zinc-900 p-4 bg-zinc-950/80 flex gap-3"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Kishan's AI about frameworks, WordPress configurations, custom Shopify apps..."
              className="flex-grow rounded-xl border border-zinc-900 bg-zinc-950 px-4 py-3 text-xs text-zinc-200 placeholder-zinc-500 focus:border-blue-500/40 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-5 py-3 text-white transition-opacity disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
