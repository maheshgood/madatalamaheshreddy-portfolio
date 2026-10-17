"use client";

import { useState } from "react";
import { tools } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ToolShell } from "./shared";

const tool = tools.find((t) => t.id === "serp-preview")!;
const TITLE_MAX = 60;
const DESC_MAX = 155;

function Meter({ length, max, label }: { length: number; max: number; label: string }) {
  const ratio = length / max;
  const tone = length === 0 ? "bg-slate-600" : ratio > 1 ? "bg-rose-400" : ratio < 0.5 ? "bg-amber-300" : "bg-emerald-400";
  return (
    <div className="mt-2">
      <div className="h-1.5 overflow-hidden rounded-full bg-ink-700">
        <div className={cn("h-full rounded-full transition-all", tone)} style={{ width: `${Math.min(ratio, 1) * 100}%` }} />
      </div>
      <p className={cn("mt-1 text-xs", ratio > 1 ? "text-rose-400" : "text-slate-500")}>
        {length}/{max} characters · {ratio > 1 ? `${label} will likely be truncated` : ratio < 0.5 ? "room to add more value" : "good length"}
      </p>
    </div>
  );
}

const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n).trimEnd() + "…" : s);

export function SerpPreview() {
  const [url, setUrl] = useState("https://www.madatalamaheshreddy.com/local");
  const [title, setTitle] = useState("Free Local SEO Tools — NAP Checker, UTM Builder & More");
  const [desc, setDesc] = useState(
    "Audit citations, build UTM links, generate WhatsApp lead links and Google review links in seconds. Free, no sign-up, runs in your browser.",
  );

  let host = "example.com";
  let path = "";
  try {
    const u = new URL(url);
    host = u.hostname.replace(/^www\./, "");
    path = u.pathname.split("/").filter(Boolean).join(" › ");
  } catch {
    /* invalid URL while typing */
  }

  return (
    <ToolShell tool={tool}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label htmlFor="serp-url" className="label">Page URL</label>
            <input id="serp-url" className="field" value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div>
            <label htmlFor="serp-title" className="label">Title tag</label>
            <input id="serp-title" className="field" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Meter length={title.length} max={TITLE_MAX} label="Title" />
          </div>
          <div>
            <label htmlFor="serp-desc" className="label">Meta description</label>
            <textarea id="serp-desc" rows={3} className="field resize-none" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Meter length={desc.length} max={DESC_MAX} label="Description" />
          </div>
        </div>

        <div>
          <p className="label">Google preview</p>
          <div className="rounded-xl bg-white p-5 font-[arial,sans-serif]">
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                {host.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm text-[#202124]">{host}</p>
                <p className="truncate text-xs text-[#4d5156]">
                  {url.startsWith("http") ? `https://${host}` : host}
                  {path && ` › ${path}`}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xl leading-snug text-[#1a0dab]">{truncate(title || "Your page title", TITLE_MAX)}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#4d5156]">{truncate(desc || "Your meta description will appear here.", DESC_MAX)}</p>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Google truncates by pixel width (~580px for titles), so character limits are a close guide rather than an exact rule.
          </p>
        </div>
      </div>
    </ToolShell>
  );
}
