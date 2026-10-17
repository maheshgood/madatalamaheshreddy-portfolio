"use client";

import { useState } from "react";
import { tools } from "@/lib/data";
import { CopyButton, OutputBox, ToolShell } from "./shared";

const tool = tools.find((t) => t.id === "review-link")!;

export function ReviewLink() {
  const [placeId, setPlaceId] = useState("");
  const [business, setBusiness] = useState("our clinic");

  const id = placeId.trim();
  const valid = /^[A-Za-z0-9_-]{10,}$/.test(id);
  const link = valid ? `https://search.google.com/local/writereview?placeid=${id}` : "";
  const message = link
    ? `Hi! Thank you for choosing ${business || "us"}. If you have a minute, we'd really appreciate a quick Google review — it helps others find us: ${link}`
    : "";

  return (
    <ToolShell tool={tool}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rv-place" className="label">Google Place ID *</label>
          <input id="rv-place" className="field font-mono" value={placeId} onChange={(e) => setPlaceId(e.target.value)} placeholder="ChIJ…" />
          <p className="mt-1.5 text-xs text-slate-500">
            Find it with Google&apos;s{" "}
            <a
              href="https://developers.google.com/maps/documentation/places/web-service/place-id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-glow-cyan underline-offset-2 hover:underline"
            >
              Place ID Finder
            </a>
            .
          </p>
        </div>
        <div>
          <label htmlFor="rv-name" className="label">Business name (for message)</label>
          <input id="rv-name" className="field" value={business} onChange={(e) => setBusiness(e.target.value)} />
        </div>
      </div>
      <div className="mt-5 space-y-4">
        <OutputBox value={link} placeholder="Paste a Place ID to generate your review link…" />
        {message && (
          <div className="rounded-xl border border-line bg-ink-950/60 p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="label mb-0">Ready-to-send request</p>
              <CopyButton value={message} label="Copy message" />
            </div>
            <p className="text-sm leading-relaxed break-words text-slate-300">{message}</p>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
