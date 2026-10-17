"use client";

import { useMemo, useState } from "react";
import { tools } from "@/lib/data";
import { OutputBox, ToolShell } from "./shared";

const tool = tools.find((t) => t.id === "utm-builder")!;

const presets = [
  { label: "Google Ads", source: "google", medium: "cpc" },
  { label: "Meta Ads", source: "facebook", medium: "paid_social" },
  { label: "Instagram bio", source: "instagram", medium: "social" },
  { label: "WhatsApp broadcast", source: "whatsapp", medium: "messaging" },
  { label: "Newsletter", source: "newsletter", medium: "email" },
  { label: "GBP website link", source: "google", medium: "organic_gbp" },
];

const clean = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_\-.]/g, "");

const fields = [
  { key: "source", label: "Source *", placeholder: "google" },
  { key: "medium", label: "Medium *", placeholder: "cpc" },
  { key: "campaign", label: "Campaign *", placeholder: "diwali_offer_2026" },
  { key: "term", label: "Term", placeholder: "dentist near me" },
  { key: "content", label: "Content", placeholder: "video_ad_a" },
] as const;
type Key = (typeof fields)[number]["key"];

export function UtmBuilder() {
  const [base, setBase] = useState("https://www.example.com/landing-page");
  const [v, setV] = useState<Record<Key, string>>({ source: "google", medium: "cpc", campaign: "spring_launch", term: "", content: "" });

  const result = useMemo(() => {
    if (!v.source || !v.medium || !v.campaign) return "";
    try {
      const u = new URL(base.trim());
      for (const f of fields) {
        const val = clean(v[f.key]);
        if (val) u.searchParams.set(`utm_${f.key}`, val);
        else u.searchParams.delete(`utm_${f.key}`);
      }
      return u.toString();
    } catch {
      return "";
    }
  }, [base, v]);

  return (
    <ToolShell tool={tool}>
      <div className="mb-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setV((s) => ({ ...s, source: p.source, medium: p.medium }))}
            className="rounded-full border border-line px-3 py-1.5 text-xs text-slate-300 transition hover:border-glow-cyan/40 hover:text-white"
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <label htmlFor="utm-base" className="label">Destination URL *</label>
          <input id="utm-base" className="field" value={base} onChange={(e) => setBase(e.target.value)} placeholder="https://" />
        </div>
        {fields.map((f) => (
          <div key={f.key}>
            <label htmlFor={`utm-${f.key}`} className="label">{f.label}</label>
            <input id={`utm-${f.key}`} className="field" value={v[f.key]} placeholder={f.placeholder} onChange={(e) => setV((s) => ({ ...s, [f.key]: e.target.value }))} />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <OutputBox value={result} placeholder="Enter a valid URL plus source, medium and campaign…" />
        <p className="mt-2 text-xs text-slate-500">Values are lower-cased and spaces become underscores so GA4 doesn&apos;t split one campaign into several rows.</p>
      </div>
    </ToolShell>
  );
}
