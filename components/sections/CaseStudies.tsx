import { ArrowRight, Lightbulb, TriangleAlert } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui/primitives";
import { caseStudies, lessons } from "@/lib/data";

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Problem → Solution"
          title={
            <>
              Real challenges, <span className="text-gradient">measurable outcomes</span>
            </>
          }
          description="A few of the problems I've been brought in to fix — and what changed after."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} delay={(i % 2) * 0.08}>
              <article className="glass group relative flex h-full flex-col overflow-hidden p-6 sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow-cyan/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-glow-cyan">
                    <cs.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs tracking-wider text-slate-500 uppercase">{cs.industry}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white sm:text-2xl">{cs.title}</h3>

                <div className="mt-5 rounded-xl border border-rose-400/20 bg-rose-400/5 p-4">
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-rose-300 uppercase">
                    <TriangleAlert className="h-3.5 w-3.5" /> Problem
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">{cs.problem}</p>
                </div>

                <div className="mt-4 flex-1">
                  <p className="mb-2 text-xs font-semibold tracking-wide text-glow-teal uppercase">Solution</p>
                  <ul className="space-y-2">
                    {cs.solution.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-slate-400">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-glow-teal" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-end gap-8 border-t border-line pt-5">
                  <div>
                    <p className="font-display text-4xl font-semibold text-gradient">{cs.result.value}</p>
                    <p className="text-xs text-slate-500">{cs.result.label}</p>
                  </div>
                  {cs.secondary && (
                    <div>
                      <p className="font-display text-4xl font-semibold text-white">{cs.secondary.value}</p>
                      <p className="text-xs text-slate-500">{cs.secondary.label}</p>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <h3 className="mb-6 flex items-center gap-2 font-display text-lg font-semibold text-white">
            <Lightbulb className="h-5 w-5 text-glow-indigo" /> Hard-won lessons
          </h3>
          <div className="grid gap-5 md:grid-cols-3">
            {lessons.map((l) => (
              <div key={l.title} className="rounded-2xl border border-line bg-ink-900/60 p-6">
                <p className="font-semibold text-white">{l.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{l.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
