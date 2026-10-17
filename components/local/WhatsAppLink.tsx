"use client";

import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { tools } from "@/lib/data";
import { OutputBox, ToolShell } from "./shared";

const tool = tools.find((t) => t.id === "whatsapp-link")!;

export function WhatsAppLink() {
  const [code, setCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Hi! I saw your ad and would like to know more about pricing.");

  const digits = (code + phone).replace(/\D/g, "");
  const valid = phone.replace(/\D/g, "").length >= 7;
  const link = valid ? `https://wa.me/${digits}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ""}` : "";

  return (
    <ToolShell tool={tool}>
      <div className="grid gap-4 sm:grid-cols-[110px_1fr]">
        <div>
          <label htmlFor="wa-code" className="label">Country code</label>
          <input id="wa-code" inputMode="numeric" className="field" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
        </div>
        <div>
          <label htmlFor="wa-phone" className="label">WhatsApp number *</label>
          <input id="wa-phone" type="tel" className="field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="wa-msg" className="label">Pre-filled message</label>
          <textarea id="wa-msg" rows={3} className="field resize-none" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
      </div>
      <div className="mt-5 space-y-3">
        <OutputBox value={link} placeholder="Enter a phone number to generate your link…" />
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-glow-cyan hover:text-white">
            Test link <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </ToolShell>
  );
}
