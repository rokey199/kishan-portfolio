import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageCircle, Github, Instagram, Download, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.query) return;

    setLoading(true);
    // Simulate premium submit transitions
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", query: "" });
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-[30%] left-[20%] h-[320px] w-[320px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-[130px]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-14 flex flex-col items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-2">
            CONNECTIVITY LINK // ENGAGEMENT NODE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Initiate Project Talks
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm leading-relaxed">
            Let&apos;s build Stripe-level designs and modern React/WordPress structures. Hire Kishan or request remote consulting slots.
          </p>
          <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
          
          {/* Metadata Info & Instant Nodes (LHS) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
            
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/45 p-6 backdrop-blur-sm space-y-5">
              
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg border border-zinc-900 bg-zinc-980 flex items-center justify-center text-blue-400">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">DIRECT MAILBOX</span>
                  <p className="text-zinc-200 text-xs font-semibold mt-0.5">
                    dabhikishan199@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg border border-zinc-900 bg-zinc-980 flex items-center justify-center text-purple-400">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">MOBILE COMMUNICATIONS</span>
                  <p className="text-zinc-200 text-xs font-semibold mt-0.5">
                    +91 7046095482
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg border border-zinc-900 bg-zinc-980 flex items-center justify-center text-teal-400">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">LOCATION LOGS</span>
                  <p className="text-zinc-200 text-xs font-semibold mt-0.5">
                    Surat &amp; Ahmedabad, Gujarat, India
                  </p>
                </div>
              </div>

            </div>

            {/* Instant Messaging & Social links deck */}
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/917046095482"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500 hover:text-white px-5 py-3 font-mono text-[10px] font-bold tracking-wider text-emerald-400 uppercase transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Kishan
              </a>

              <a
                href="https://dabhikishan199.github.io/Resume/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/45 hover:bg-zinc-900/60 px-5 py-3 font-mono text-[10px] font-bold tracking-wider text-zinc-300 uppercase transition-all"
              >
                <Download className="h-4 w-4" />
                Download Complete Resume
              </a>

              {/* Social Channels Network icons */}
              <div className="flex gap-2 justify-start pt-2">
                <a
                  href="https://github.com/dabhikishan199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                >
                  <Github className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://www.instagram.com/dabhi.kishan.199/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Secure Form (RHS) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Recruiter / Client"
                        className="w-full rounded-xl border border-zinc-900 bg-zinc-950 px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-blue-500/40 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-2">
                        Your Professional Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. company@domain.com"
                        className="w-full rounded-xl border border-zinc-900 bg-zinc-950 px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-blue-500/40 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-2">
                        Describe Project Scopes &amp; Timeline
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        placeholder="Describe your design specifications or hiring requirements..."
                        className="w-full rounded-xl border border-zinc-900 bg-zinc-950 px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:border-blue-500/40 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 hover:bg-white text-black font-mono text-[10px] font-bold tracking-wider py-3.5 px-6 uppercase transition-all"
                    >
                      {loading ? (
                        <span>TRANSMITTING BUNDLE...</span>
                      ) : (
                        <>
                          TRANSMIT INTERFACE SECURELY
                          <Send className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-mono text-sm tracking-wider uppercase font-bold text-zinc-100">
                        Signal Transmitted Successfully!
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-sm leading-normal">
                        Kishan Dabhi&apos;s digital mailbox registry received your query parameters. Expect a complete response coordinate within 12 hours.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
