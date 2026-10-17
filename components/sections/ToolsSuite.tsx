"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Wrench } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui/primitives";
import { tools } from "@/lib/data";

export function ToolsSuite() {
  return (
    <section id="tools" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Feature spotlight · /local"
          title={
            <>
              Custom tools that <span className="text-gradient">automate marketing work</span>
            </>
          }
          description="A free, growing suite of lightweight web tools I built to replace spreadsheets and manual checks in local SEO, tracking and lead capture. No sign-up — everything runs in your browser."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <Reveal key={tool.id} delay={i * 0.06}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
                <Link
                  href={`/local#${tool.id}`}
                  className="group glass relative flex h-full flex-col overflow-hidden p-6 transition-colors hover:border-glow-cyan/40"
                >
                  <div
                    className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-glow-cyan/0 blur-3xl transition-colors duration-500 group-hover:bg-glow-cyan/20"
                    aria-hidden
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-glow-cyan/30 bg-glow-cyan/10 text-glow-cyan">
                      <tool.icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow-cyan" />
                  </div>
                  <p className="mt-5 font-mono text-xs text-glow-teal">{tool.tagline}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">{tool.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{tool.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tool.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}

          <Reveal delay={tools.length * 0.06}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-glow-indigo/40 bg-glow-indigo/5 p-6">
              <Wrench className="h-6 w-6 text-glow-indigo" />
              <h3 className="mt-4 font-display text-xl font-semibold text-white">Need a custom tool?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Lead routers, reporting dashboards, directory engines — I build internal tools around your exact
                workflow.
              </p>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-glow-indigo hover:text-white">
                Discuss a build <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
