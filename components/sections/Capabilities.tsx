import { Check } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui/primitives";
import { capabilities, type Capability } from "@/lib/data";
import { cn } from "@/lib/utils";

const accent: Record<Capability["accent"], string> = {
  cyan: "text-glow-cyan border-glow-cyan/30 bg-glow-cyan/10",
  teal: "text-glow-teal border-glow-teal/30 bg-glow-teal/10",
  indigo: "text-glow-indigo border-glow-indigo/30 bg-glow-indigo/10",
  violet: "text-glow-violet border-glow-violet/30 bg-glow-violet/10",
};

export function Capabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-96 bg-[radial-gradient(closest-side,rgb(129_140_248/0.08),transparent)]" aria-hidden />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="Capabilities"
          title={
            <>
              Marketing strategy, <span className="text-gradient">engineered</span>
            </>
          }
          description="A Computer Science background means the strategy and the implementation come from the same person — no hand-off gaps between the marketer and the developer."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06} className="bg-ink-900">
              <article className="group h-full p-7 transition-colors hover:bg-ink-850">
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl border", accent[c.accent])}>
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.summary}</p>
                <ul className="mt-5 space-y-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-glow-teal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
