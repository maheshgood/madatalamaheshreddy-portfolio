"use client";

import { CalendarCheck, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHeader } from "@/components/ui/primitives";
import { LinkedInIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { bookingHref, site, whatsappLink } from "@/lib/site";
import { trackEvent } from "@/lib/utils";

const services = ["SEO / AEO / GEO", "Local SEO & GBP", "Google / Meta Ads", "Funnels & CRO", "Custom tool / automation", "Not sure yet"];
const budgets = ["< ₹50k / mo", "₹50k – ₹2L / mo", "₹2L+ / mo", "Project-based"];

type Form = { name: string; email: string; phone: string; website: string; service: string; budget: string; message: string };
const empty: Form = { name: "", email: "", phone: "", website: "", service: services[0], budget: budgets[0], message: "" };

function buildMessage(f: Form) {
  return [
    `Hi Mahesh, new enquiry from your website:`,
    `• Name: ${f.name}`,
    `• Email: ${f.email}`,
    f.phone && `• Phone: ${f.phone}`,
    f.website && `• Website: ${f.website}`,
    `• Interested in: ${f.service}`,
    `• Budget: ${f.budget}`,
    f.message && `• Details: ${f.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackEvent("generate_lead", { method: "whatsapp_form", service: form.service });
    window.open(whatsappLink(buildMessage(form)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${form.name || "website"}`)}&body=${encodeURIComponent(buildMessage(form))}`;

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgb(34_211_238/0.10),transparent_70%)]" aria-hidden />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="Let's build your growth engine"
          title={
            <>
              Tell me where you want <span className="text-gradient">to grow</span>
            </>
          }
          description="Share a few details and I'll reply with initial thoughts — usually within one working day."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-4">
            <a
              href={whatsappLink("Hi Mahesh, I found your website and would like to discuss my marketing.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_click", { method: "whatsapp" })}
              className="glass flex items-center gap-4 p-5 transition hover:border-emerald-400/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-semibold text-white">Quick WhatsApp connect</span>
                <span className="text-sm text-slate-400">Fastest response · {site.phone}</span>
              </span>
            </a>

            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact_click", { method: "booking" })}
              className="glass flex items-center gap-4 p-5 transition hover:border-glow-cyan/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-glow-cyan/15 text-glow-cyan">
                <CalendarCheck className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-semibold text-white">Book a strategy call</span>
                <span className="text-sm text-slate-400">30-minute growth audit, free</span>
              </span>
            </a>

            <div className="glass space-y-3 p-5 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-slate-300 hover:text-white">
                <Mail className="h-4 w-4 text-glow-indigo" /> {site.email}
              </a>
              <a href={site.phoneHref} className="flex items-center gap-3 text-slate-300 hover:text-white">
                <Phone className="h-4 w-4 text-glow-indigo" /> {site.phone}
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white">
                <LinkedInIcon className="h-4 w-4 text-glow-indigo" /> LinkedIn
              </a>
              <p className="flex items-center gap-3 text-slate-400">
                <MapPin className="h-4 w-4 text-glow-indigo" /> {site.location} · working with clients worldwide
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} className="glass grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label htmlFor="c-name" className="label">Name *</label>
                <input id="c-name" required autoComplete="name" className="field" value={form.name} onChange={set("name")} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="c-email" className="label">Email *</label>
                <input id="c-email" type="email" required autoComplete="email" className="field" value={form.email} onChange={set("email")} placeholder="you@company.com" />
              </div>
              <div>
                <label htmlFor="c-phone" className="label">Phone / WhatsApp</label>
                <input id="c-phone" type="tel" autoComplete="tel" className="field" value={form.phone} onChange={set("phone")} placeholder="+91 …" />
              </div>
              <div>
                <label htmlFor="c-site" className="label">Website</label>
                <input id="c-site" type="url" className="field" value={form.website} onChange={set("website")} placeholder="https://" />
              </div>
              <div>
                <label htmlFor="c-service" className="label">I need help with</label>
                <select id="c-service" className="field" value={form.service} onChange={set("service")}>
                  {services.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="c-budget" className="label">Budget</label>
                <select id="c-budget" className="field" value={form.budget} onChange={set("budget")}>
                  {budgets.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-msg" className="label">What are you trying to achieve?</label>
                <textarea id="c-msg" rows={4} className="field resize-none" value={form.message} onChange={set("message")} placeholder="Goals, current challenges, timelines…" />
              </div>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-glow-cyan to-glow-teal px-6 py-3 text-sm font-semibold text-ink-950 shadow-[0_0_30px_-6px_rgb(34_211_238/0.6)] transition hover:brightness-110"
                >
                  <Send className="h-4 w-4" /> Send via WhatsApp
                </button>
                <a
                  href={mailHref}
                  onClick={() => trackEvent("generate_lead", { method: "email_form" })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-white hover:bg-white/5"
                >
                  <Mail className="h-4 w-4" /> Send via email instead
                </a>
              </div>
              {sent && (
                <p role="status" className="text-sm text-emerald-300 sm:col-span-2">
                  WhatsApp opened with your details — just hit send. Thanks, {form.name.split(" ")[0] || "there"}!
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
