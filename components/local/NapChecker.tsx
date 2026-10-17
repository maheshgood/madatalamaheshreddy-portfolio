"use client";

import { CircleCheck, CircleX, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { tools } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ToolShell } from "./shared";

const tool = tools.find((t) => t.id === "nap-checker")!;

const ABBREVIATIONS: Record<string, string> = {
  st: "street", rd: "road", ave: "avenue", blvd: "boulevard", ln: "lane", nr: "near", opp: "opposite",
  bldg: "building", flr: "floor", fl: "floor", apt: "apartment", ste: "suite", sec: "sector", ph: "phase",
  colny: "colony", clny: "colony", mg: "mahatma gandhi", hyd: "hyderabad", blr: "bangalore", "&": "and",
};
const NAME_NOISE = /\b(pvt|private|ltd|limited|llp|inc|llc|co|company)\b/g;

const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => ABBREVIATIONS[t] ?? t);

const normName = (s: string) => tokens(s).join(" ").replace(NAME_NOISE, "").replace(/\s+/g, " ").trim();
const normAddr = (s: string) => tokens(s).join(" ");
const normPhone = (s: string) => s.replace(/\D/g, "").slice(-10);

function similarity(a: string, b: string) {
  const A = new Set(a.split(" ").filter(Boolean));
  const B = new Set(b.split(" ").filter(Boolean));
  if (!A.size && !B.size) return 1;
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / new Set([...A, ...B]).size;
}

type Status = "match" | "minor" | "mismatch" | "missing";

function compare(canon: string, value: string, kind: "name" | "addr" | "phone"): Status {
  if (!value.trim()) return "missing";
  if (kind === "phone") return normPhone(canon) === normPhone(value) ? "match" : "mismatch";
  const [a, b] = kind === "name" ? [normName(canon), normName(value)] : [normAddr(canon), normAddr(value)];
  if (a === b) return "match";
  return similarity(a, b) >= 0.75 ? "minor" : "mismatch";
}

const statusUi: Record<Status, { icon: typeof CircleCheck; cls: string; text: string }> = {
  match: { icon: CircleCheck, cls: "text-emerald-300", text: "Match" },
  minor: { icon: TriangleAlert, cls: "text-amber-300", text: "Minor variation" },
  mismatch: { icon: CircleX, cls: "text-rose-400", text: "Mismatch" },
  missing: { icon: TriangleAlert, cls: "text-slate-500", text: "Missing" },
};

const SAMPLE = `Google Business Profile | Sunrise Dental Clinic | 12-4, MG Road, Banjara Hills, Hyderabad 500034 | +91 98765 43210
Justdial | Sunrise Dental Clinic Pvt Ltd | 12-4 Mahatma Gandhi Rd, Banjara Hills, Hyd 500034 | 098765 43210
Facebook | Sunrise Dental | Banjara Hills, Hyderabad | 040 2345 6789
Practo | Sunrise Dental Clinic | Road No. 2, Jubilee Hills, Hyderabad 500033 | 9876543210`;

export function NapChecker() {
  const [name, setName] = useState("Sunrise Dental Clinic");
  const [address, setAddress] = useState("12-4, MG Road, Banjara Hills, Hyderabad 500034");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [listings, setListings] = useState(SAMPLE);

  const rows = useMemo(
    () =>
      listings
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((line, i) => {
          const [source = `Listing ${i + 1}`, n = "", a = "", p = ""] = line.split("|").map((x) => x.trim());
          const result = { name: compare(name, n, "name"), address: compare(address, a, "addr"), phone: compare(phone, p, "phone") };
          return { source, n, a, p, result };
        }),
    [listings, name, address, phone],
  );

  const checks = rows.flatMap((r) => Object.values(r.result));
  const score = checks.length ? Math.round((checks.filter((c) => c === "match").length / checks.length) * 100) : 0;
  const issues = checks.filter((c) => c !== "match").length;

  return (
    <ToolShell tool={tool}>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="nap-name" className="label">Official business name</label>
          <input id="nap-name" className="field" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="nap-address" className="label">Official address</label>
          <input id="nap-address" className="field" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label htmlFor="nap-phone" className="label">Official phone</label>
          <input id="nap-phone" className="field" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="nap-listings" className="label">
          Listings — one per line: <span className="font-mono normal-case">Source | Name | Address | Phone</span>
        </label>
        <textarea id="nap-listings" rows={5} className="field font-mono text-xs" value={listings} onChange={(e) => setListings(e.target.value)} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <div>
          <p className={cn("font-display text-4xl font-semibold", score >= 90 ? "text-emerald-300" : score >= 60 ? "text-amber-300" : "text-rose-400")}>{score}%</p>
          <p className="text-xs text-slate-500">Consistency score</p>
        </div>
        <p className="text-sm text-slate-400">
          {rows.length} listings checked · <span className="text-white">{issues}</span> field{issues === 1 ? "" : "s"} to fix
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-white/5 text-xs text-slate-400 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="px-4 py-3 font-medium text-white">{r.source}</td>
                {(["name", "address", "phone"] as const).map((k) => {
                  const s = statusUi[r.result[k]];
                  return (
                    <td key={k} className="px-4 py-3">
                      <span className={cn("flex items-center gap-1.5 text-xs font-semibold", s.cls)}>
                        <s.icon className="h-4 w-4" /> {s.text}
                      </span>
                      <span className="mt-0.5 block max-w-[220px] truncate text-xs text-slate-500" title={k === "name" ? r.n : k === "address" ? r.a : r.p}>
                        {k === "name" ? r.n : k === "address" ? r.a : r.p}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Normalises case, punctuation, common abbreviations (Rd → Road, MG → Mahatma Gandhi), legal suffixes and phone
        country codes before comparing. Your data never leaves the browser.
      </p>
    </ToolShell>
  );
}
