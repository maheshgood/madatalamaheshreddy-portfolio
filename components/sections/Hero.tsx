"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Sparkles, Terminal } from "lucide-react";
import { Counter, ButtonLink } from "@/components/ui/primitives";
import { heroMetrics } from "@/lib/data";
import { bookingHref, site } from "@/lib/site";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const codeLines = [
  { k: "const", v: "growth", t: "= engineer + marketer;" },
  { k: "await", v: "seo", t: ".rank({ ai: true, local: true });" },
  { k: "await", v: "ads", t: ".scale({ roas: 3.8, cpa: '↓22%' });" },
  { k: "return", v: "funnel", t: ".convert(leads);" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 md:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(34_211_238/0.18),rgb(129_140_248/0.10),transparent)] blur-2xl"
        aria-hidden
      />

      <div className="container-x relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
        <div>
          <motion.div {...fade(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-glow-cyan/30 bg-glow-cyan/10 px-4 py-1.5 text-xs font-medium text-glow-cyan">
            <Sparkles className="h-3.5 w-3.5" />
            10+ Years Experience · B.Tech CSE
          </motion.div>

          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Growth Engineer <span className="text-slate-500">&amp;</span>{" "}
            <span className="text-gradient">Senior Digital Marketer</span>
          </h1>

          <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I&apos;m {site.name}. I don&apos;t just run ads or optimise pages — I build custom tools, local discovery
            engines and acquisition funnels that turn search and ad spend into measurable revenue.
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/local">
              Try Local Tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={bookingHref} variant="ghost">
              <CalendarCheck className="h-4 w-4" />
              Schedule Strategy Call
            </ButtonLink>
          </motion.div>

          <motion.div {...fade(0.32)} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {heroMetrics.map((m) => (
              <div key={m.label} className="glass px-4 py-4">
                <p className="font-display text-3xl font-semibold text-white">
                  <Counter value={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <p className="mt-1 text-xs leading-snug text-slate-500">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-glow-cyan/50 via-transparent to-glow-indigo/50 blur-sm" aria-hidden />
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-glow-cyan/40">
                <Image src="/assets/mahesh-avatar.jpeg" alt={site.name} fill sizes="64px" className="object-cover" priority />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-white">{site.name}</p>
                <p className="text-sm text-slate-400">{site.location}</p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-ink-950/80 p-4 font-mono text-[13px] leading-7">
              <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                <Terminal className="h-3.5 w-3.5" /> growth-engine.ts
              </div>
              {codeLines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.25 }}
                  className="truncate"
                >
                  <span className="text-glow-indigo">{l.k}</span> <span className="text-glow-cyan">{l.v}</span>
                  <span className="text-slate-400">{l.t}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["SEO", "AEO / GEO", "Local SEO", "Google Ads", "Meta Ads", "Next.js", "GA4 / GTM"].map((t) => (
                <span key={t} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
