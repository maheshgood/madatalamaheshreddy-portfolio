import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NapChecker } from "@/components/local/NapChecker";
import { SerpPreview } from "@/components/local/SerpPreview";
import { UtmBuilder } from "@/components/local/UtmBuilder";
import { WhatsAppLink } from "@/components/local/WhatsAppLink";
import { ReviewLink } from "@/components/local/ReviewLink";
import { tools } from "@/lib/data";

export const metadata: Metadata = {
  title: "Free Local SEO & Marketing Tools",
  description:
    "Free browser-based marketing tools: NAP consistency checker, SERP snippet preview, UTM builder, WhatsApp lead link generator and Google review link generator.",
  alternates: { canonical: "/local" },
};

export default function LocalToolsPage() {
  return (
    <div className="relative pt-28 pb-24 sm:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0 h-[600px]" aria-hidden />
      <div className="container-x relative">
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-glow-cyan uppercase">{"// madatalamaheshreddy.com/local"}</p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Local growth <span className="text-gradient">tool suite</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Free utilities I built to automate the repetitive parts of local SEO, tracking and lead capture. No sign-up,
          nothing stored — everything runs in your browser.
        </p>

        <nav aria-label="Tools" className="sticky top-16 z-30 -mx-4 mt-10 overflow-x-auto border-y border-line bg-ink-950/85 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border">
          <ul className="flex gap-2 whitespace-nowrap">
            {tools.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
                  <t.icon className="h-4 w-4 text-glow-cyan" /> {t.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-8">
          <NapChecker />
          <SerpPreview />
          <UtmBuilder />
          <WhatsAppLink />
          <ReviewLink />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-glow-indigo/30 bg-glow-indigo/5 p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">Want these results done for you?</h2>
            <p className="mt-2 text-slate-400">I fix the issues these tools find — and build custom ones for your workflow.</p>
          </div>
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-glow-cyan to-glow-teal px-6 py-3 text-sm font-semibold text-ink-950">
            Talk to Mahesh <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
