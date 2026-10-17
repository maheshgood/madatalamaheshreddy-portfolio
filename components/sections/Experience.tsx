import Image from "next/image";
import { Reveal, SectionHeader } from "@/components/ui/primitives";
import { brandLogos, industries, stack, timeline } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Experience & stack"
          title={
            <>
              A decade of <span className="text-gradient">hands-on execution</span>
            </>
          }
          description="Every project below was planned, built and optimised hands-on — strategy, campaigns, tracking and code."
        />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ol className="relative space-y-8 border-l border-line pl-8">
            {timeline.map((t, i) => (
              <li key={t.phase} className="relative">
                <Reveal delay={i * 0.06}>
                  <span className="absolute top-0 -left-[49px] grid h-8 w-8 place-items-center rounded-full border border-glow-cyan/40 bg-ink-900 text-glow-cyan shadow-[0_0_20px_-4px_rgb(34_211_238/0.6)]">
                    <t.icon className="h-4 w-4" />
                  </span>
                  <p className="font-mono text-xs tracking-wider text-glow-teal uppercase">{t.phase}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.brands.map((b) => (
                      <span key={b} className="rounded-full border border-line px-3 py-1 text-xs text-slate-300">
                        {b}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="space-y-6">
            <Reveal className="glass p-6">
              <p className="mb-4 text-sm font-semibold text-white">Industries served</p>
              <div className="flex flex-wrap gap-2">
                {industries.map((i) => (
                  <span key={i} className="rounded-lg bg-glow-indigo/10 px-3 py-1.5 text-sm text-glow-indigo">
                    {i}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="glass p-6" delay={0.06}>
              <p className="mb-5 text-sm font-semibold text-white">Technical stack</p>
              <div className="space-y-5">
                {stack.map((s) => (
                  <div key={s.group}>
                    <p className="mb-2 font-mono text-xs text-slate-500">{s.group.toLowerCase()}:</p>
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <span key={it} className="rounded-md border border-line bg-ink-950/60 px-2.5 py-1 font-mono text-xs text-slate-300">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16">
          <p className="mb-6 text-center font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">Brands I&apos;ve helped grow</p>
          <ul className="grid grid-cols-3 items-center gap-4 sm:grid-cols-6">
            {brandLogos.map((b) => (
              <li key={b.alt} className="flex h-16 items-center justify-center rounded-xl bg-white/90 p-3 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
                <Image src={b.src} alt={b.alt} width={120} height={48} className="max-h-10 w-auto object-contain" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
