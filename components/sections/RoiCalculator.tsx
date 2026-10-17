"use client";

import { motion } from "framer-motion";
import { Calculator, Info, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { ButtonLink, Reveal, SectionHeader } from "@/components/ui/primitives";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const scenarios = {
  conservative: { label: "Conservative", traffic: 0.2, cvr: 0.1 },
  expected: { label: "Expected", traffic: 0.4, cvr: 0.25 },
  aggressive: { label: "Aggressive", traffic: 0.7, cvr: 0.4 },
} as const;
type ScenarioKey = keyof typeof scenarios;

const currencies = {
  INR: { symbol: "₹", locale: "en-IN", defaultValue: 25000, max: 500000, step: 1000 },
  USD: { symbol: "$", locale: "en-US", defaultValue: 500, max: 10000, step: 50 },
} as const;
type CurrencyKey = keyof typeof currencies;

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm text-slate-300">
          {label}
        </label>
        <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-sm text-white">{format(value)}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

export function RoiCalculator() {
  const [currency, setCurrency] = useState<CurrencyKey>("INR");
  const [visitors, setVisitors] = useState(5000);
  const [cvr, setCvr] = useState(2);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState<number>(currencies.INR.defaultValue);
  const [scenario, setScenario] = useState<ScenarioKey>("expected");

  const cur = currencies[currency];
  const money = (v: number) =>
    `${cur.symbol}${Math.round(v).toLocaleString(cur.locale)}`;
  const num = (v: number) => Math.round(v).toLocaleString(cur.locale);

  const r = useMemo(() => {
    const s = scenarios[scenario];
    const leads = visitors * (cvr / 100);
    const revenue = leads * (closeRate / 100) * dealValue;
    const pVisitors = visitors * (1 + s.traffic);
    const pCvr = Math.min(cvr * (1 + s.cvr), 100);
    const pLeads = pVisitors * (pCvr / 100);
    const pRevenue = pLeads * (closeRate / 100) * dealValue;
    return { leads, revenue, pLeads, pRevenue, lift: pRevenue - revenue, annual: (pRevenue - revenue) * 12 };
  }, [visitors, cvr, closeRate, dealValue, scenario]);

  const switchCurrency = (c: CurrencyKey) => {
    setCurrency(c);
    setDealValue(currencies[c].defaultValue);
  };

  const pct = r.pRevenue > 0 ? (r.revenue / r.pRevenue) * 100 : 0;

  const message = `Hi Mahesh, I used your ROI calculator. Current: ~${num(visitors)} visitors/mo, ${cvr}% CVR, ${num(r.leads)} leads/mo. I'd like to discuss reaching ~${num(r.pLeads)} leads/mo.`;

  return (
    <section id="roi" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Interactive · ROI calculator"
          title={
            <>
              Estimate your <span className="text-gradient">growth potential</span>
            </>
          }
          description="Plug in your current numbers to see how improvements in traffic and conversion rate compound into leads and revenue."
        />

        <Reveal>
          <div className="glass grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-7 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-semibold text-white">
                  <Calculator className="h-5 w-5 text-glow-cyan" /> Your current numbers
                </p>
                <div className="flex rounded-full border border-line p-1 text-xs" role="group" aria-label="Currency">
                  {(Object.keys(currencies) as CurrencyKey[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => switchCurrency(c)}
                      aria-pressed={currency === c}
                      className={cn("rounded-full px-3 py-1 font-mono transition", currency === c ? "bg-glow-cyan text-ink-950" : "text-slate-400 hover:text-white")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <Slider id="roi-visitors" label="Monthly website visitors" value={visitors} min={500} max={100000} step={500} onChange={setVisitors} format={num} />
              <Slider id="roi-cvr" label="Visitor → lead conversion rate" value={cvr} min={0.5} max={10} step={0.1} onChange={setCvr} format={(v) => `${v.toFixed(1)}%`} />
              <Slider id="roi-close" label="Lead → customer close rate" value={closeRate} min={5} max={60} step={1} onChange={setCloseRate} format={(v) => `${v}%`} />
              <Slider id="roi-value" label="Average customer value" value={dealValue} min={cur.step} max={cur.max} step={cur.step} onChange={setDealValue} format={money} />

              <div>
                <p className="mb-3 text-sm text-slate-300">Growth scenario</p>
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Growth scenario">
                  {(Object.keys(scenarios) as ScenarioKey[]).map((k) => (
                    <button
                      key={k}
                      type="button"
                      role="radio"
                      aria-checked={scenario === k}
                      onClick={() => setScenario(k)}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-left text-xs transition",
                        scenario === k ? "border-glow-cyan/60 bg-glow-cyan/10 text-white" : "border-line text-slate-400 hover:border-slate-600",
                      )}
                    >
                      <span className="block font-semibold">{scenarios[k].label}</span>
                      <span className="font-mono text-[11px] opacity-70">
                        +{scenarios[k].traffic * 100}% traffic · +{scenarios[k].cvr * 100}% CVR
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col border-t border-line bg-ink-950/60 p-6 sm:p-8 lg:border-t-0 lg:border-l">
              <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-glow-teal/10 blur-3xl" aria-hidden />
              <p className="flex items-center gap-2 font-semibold text-white">
                <TrendingUp className="h-5 w-5 text-glow-teal" /> Projected monthly impact
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4" aria-live="polite">
                <div className="rounded-xl border border-line p-4">
                  <p className="text-xs text-slate-500">Leads / month</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-slate-300">{num(r.leads)}</p>
                  <p className="mt-1 font-mono text-sm text-glow-teal">→ {num(r.pLeads)}</p>
                </div>
                <div className="rounded-xl border border-line p-4">
                  <p className="text-xs text-slate-500">Revenue / month</p>
                  <p className="mt-1 font-display text-2xl font-semibold break-all text-slate-300">{money(r.revenue)}</p>
                  <p className="mt-1 font-mono text-sm break-all text-glow-teal">→ {money(r.pRevenue)}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>Today</span>
                    <span>{money(r.revenue)}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-ink-700">
                    <motion.div className="h-full rounded-full bg-slate-500" animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-slate-500">
                    <span>With growth plan</span>
                    <span>{money(r.pRevenue)}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-ink-700">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-glow-cyan to-glow-teal shadow-[0_0_16px_rgb(45_212_191/0.6)]" />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-glow-teal/30 bg-glow-teal/5 p-5">
                <p className="text-xs tracking-wide text-glow-teal uppercase">Estimated additional revenue / year</p>
                <p className="mt-1 font-display text-3xl font-semibold break-all text-white sm:text-4xl">{money(r.annual)}</p>
                <p className="mt-1 text-sm text-slate-400">+{money(r.lift)} per month</p>
              </div>

              <p className="mt-5 flex gap-2 text-xs leading-relaxed text-slate-500">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Illustrative estimate based on the scenario assumptions above — not a guarantee. Real results depend on
                market, offer, budget and starting point.
              </p>

              <ButtonLink href={whatsappLink(message)} className="mt-6 w-full">
                Get a personalised growth plan
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
