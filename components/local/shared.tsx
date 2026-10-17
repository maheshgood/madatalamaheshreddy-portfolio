"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { Tool } from "@/lib/data";
import { cn, trackEvent } from "@/lib/utils";

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      disabled={!value}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          trackEvent("tool_copy", { label });
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-glow-cyan/40 disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function OutputBox({ value, placeholder }: { value: string; placeholder: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-glow-cyan/20 bg-ink-950/80 p-3">
      <code className={cn("min-w-0 flex-1 font-mono text-xs leading-relaxed break-all", value ? "text-glow-cyan" : "text-slate-600")}>
        {value || placeholder}
      </code>
      <CopyButton value={value} />
    </div>
  );
}

export function ToolShell({ tool, children }: { tool: Tool; children: React.ReactNode }) {
  return (
    <section id={tool.id} className="glass scroll-mt-24 p-6 sm:p-8">
      <header className="mb-6 flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-glow-cyan/30 bg-glow-cyan/10 text-glow-cyan">
          <tool.icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">{tool.name}</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{tool.description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}
