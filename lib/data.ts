import type { LucideIcon } from "lucide-react";
import {
  Bot,
  ChartColumn,
  CodeXml,
  Gauge,
  GraduationCap,
  Link2,
  MapPin,
  MessageCircle,
  Radar,
  Search,
  Star,
  Store,
  Building2,
  Target,
  Workflow,
} from "lucide-react";

export type Metric = { value: number; suffix: string; prefix?: string; decimals?: number; label: string };

export const heroMetrics: Metric[] = [
  { value: 10, suffix: "+", label: "Years in growth marketing" },
  { value: 9, suffix: "", label: "Brands scaled" },
  { value: 3.8, suffix: "x", decimals: 1, label: "Peak ROAS delivered" },
  { value: 6, suffix: "x", label: "Organic session growth" },
];

export type Tool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
};

export const tools: Tool[] = [
  {
    id: "nap-checker",
    name: "NAP Consistency Checker",
    tagline: "Audit citations in seconds",
    description:
      "Paste your listings from GBP, Justdial, Facebook and directories. It normalises names, addresses and phone numbers and flags every mismatch hurting local rankings.",
    icon: MapPin,
    tags: ["Local SEO", "Citations"],
  },
  {
    id: "serp-preview",
    name: "SERP Snippet Preview",
    tagline: "Write titles that get the click",
    description:
      "Preview how your title and meta description render on Google, with live length checks so nothing gets truncated.",
    icon: Search,
    tags: ["On-Page", "CTR"],
  },
  {
    id: "utm-builder",
    name: "UTM Campaign Builder",
    tagline: "Clean attribution in GA4",
    description:
      "Generate consistent, lowercase UTM links for every ad, post and email so GA4 reports stay clean.",
    icon: ChartColumn,
    tags: ["GA4", "Tracking"],
  },
  {
    id: "whatsapp-link",
    name: "WhatsApp Lead Link Generator",
    tagline: "One-tap lead capture",
    description:
      "Create click-to-chat links with a pre-filled enquiry so ads and landing pages drop leads straight into WhatsApp.",
    icon: MessageCircle,
    tags: ["Lead Gen", "WhatsApp"],
  },
  {
    id: "review-link",
    name: "Google Review Link Generator",
    tagline: "More reviews, less friction",
    description:
      "Turn a Place ID into a direct “write a review” link and ready-to-send request message for customers.",
    icon: Star,
    tags: ["GBP", "Reputation"],
  },
];

export type Capability = {
  title: string;
  icon: LucideIcon;
  summary: string;
  points: string[];
  accent: "cyan" | "teal" | "indigo" | "violet";
};

export const capabilities: Capability[] = [
  {
    title: "SEO & Search Intelligence",
    icon: Search,
    summary: "Technical foundations and content systems that rank, and keep ranking.",
    points: ["Technical SEO & Core Web Vitals", "On-page & off-page authority", "Keyword & topical mapping", "Schema & structured data"],
    accent: "cyan",
  },
  {
    title: "AEO / GEO — AI Search",
    icon: Bot,
    summary: "Getting cited in ChatGPT, Gemini, Perplexity and Google AI Overviews.",
    points: ["Entity & answer-first content", "Citation-worthy sources", "Zero-click visibility strategy", "AI referral tracking"],
    accent: "indigo",
  },
  {
    title: "Local SEO & GBP",
    icon: MapPin,
    summary: "Map-pack visibility for single and multi-location businesses.",
    points: ["Google Business Profile optimisation", "Citation & NAP clean-up", "Review generation systems", "Call & direction tracking"],
    accent: "teal",
  },
  {
    title: "Performance Marketing",
    icon: Target,
    summary: "Google Ads and Meta Ads structured to scale ROAS while lowering CPA.",
    points: ["Account restructuring", "Bid & budget strategy", "Creative & audience testing", "Offline conversion imports"],
    accent: "cyan",
  },
  {
    title: "Funnels & CRO",
    icon: Gauge,
    summary: "Landing pages and lead flows engineered to convert attention into enquiries.",
    points: ["Landing page architecture", "Form & WhatsApp funnels", "A/B testing", "Lead qualification flows"],
    accent: "violet",
  },
  {
    title: "Automation & Web Architecture",
    icon: CodeXml,
    summary: "Custom Next.js tools, tracking and integrations that remove manual work.",
    points: ["Next.js / TypeScript builds", "GA4 & GTM custom events", "WhatsApp API & lead routing", "Python / JS automation scripts"],
    accent: "indigo",
  },
];

export type CaseStudy = {
  industry: string;
  title: string;
  problem: string;
  solution: string[];
  result: { value: string; label: string };
  secondary?: { value: string; label: string };
  icon: LucideIcon;
};

export const caseStudies: CaseStudy[] = [
  {
    industry: "Education",
    title: "Low-ROAS ad account turned profitable",
    problem: "Broad campaigns, mixed intent keywords and no offline conversion data meant spend was rising faster than enrolments.",
    solution: ["Rebuilt account around intent-based campaign structure", "Imported qualified-lead conversions back into Google Ads", "Shifted budget to top-converting audiences and creatives"],
    result: { value: "3.8x", label: "ROAS" },
    secondary: { value: "−22%", label: "CPA" },
    icon: GraduationCap,
  },
  {
    industry: "Travel",
    title: "Organic traffic growth from a stalled blog",
    problem: "Thin content, crawl issues and no topical structure kept a travel blog stuck at ~2k monthly sessions.",
    solution: ["Fixed technical crawl & indexation issues", "Built topic clusters around high-intent travel queries", "Internal linking and schema rollout"],
    result: { value: "2k → 12k", label: "Monthly sessions in 9 months" },
    icon: Radar,
  },
  {
    industry: "Local Services",
    title: "Local visibility that rings the phone",
    problem: "An under-optimised Google Business Profile with inconsistent citations was invisible in the map pack.",
    solution: ["Full GBP optimisation, categories & weekly posts", "Citation clean-up for NAP consistency", "Review request flow with direct links"],
    result: { value: "2x", label: "Phone bookings" },
    icon: Store,
  },
  {
    industry: "B2B Services",
    title: "Lead funnel rebuilt for conversions",
    problem: "A generic website collected traffic but very few demo requests, with no tracking to show where leads dropped off.",
    solution: ["Conversion-first landing page architecture", "GA4 + GTM event tracking across the funnel", "WhatsApp and CRM lead routing"],
    result: { value: "+28%", label: "Demo requests" },
    icon: Building2,
  },
];

export const lessons = [
  {
    title: "Multi-location NAP chaos",
    text: "Duplicate listings and mismatched addresses across directories split ranking signals. A normalised citation audit — now a tool in /local — makes it a repeatable fix.",
  },
  {
    title: "The AI search shift",
    text: "AI Overviews and zero-click answers changed what “ranking” means. Answer-first content, entity clarity and citation-worthy pages keep brands in the response.",
  },
  {
    title: "Manual work that never scales",
    text: "Copy-pasted UTMs, ad-hoc reports and manual lead hand-offs waste hours. Small internal tools and automations reclaim them every single week.",
  },
];

export const timeline = [
  {
    phase: "Travel",
    icon: Workflow,
    title: "Organic growth & lead funnels for travel brands",
    text: "SEO, paid lead generation and offline funnels through events and partnerships.",
    brands: ["Indian Eagle", "Plan My Tour", "Plan My Luxe", "Plan My Umrah"],
  },
  {
    phase: "Education",
    icon: GraduationCap,
    title: "Enrolment acquisition for test-prep & training",
    text: "Performance campaigns, landing pages and visibility for education brands.",
    brands: ["English Springs", "OET Star", "PTE Tests", "Acutelearn"],
  },
  {
    phase: "Retail & Local",
    icon: Store,
    title: "Local discovery for nearby customers",
    text: "Google Business Profile, citations and fast websites for local and retail businesses.",
    brands: ["Sarawan Spices", "Local service businesses"],
  },
  {
    phase: "Engineering",
    icon: Link2,
    title: "Custom marketing tools & automation",
    text: "Building the /local tool suite, tracking setups and integrations that automate repetitive marketing work.",
    brands: ["Next.js", "GA4 / GTM", "WhatsApp API"],
  },
];

export const brandLogos = [
  { src: "/assets/indian-eagle.jpeg", alt: "Indian Eagle" },
  { src: "/assets/plan-my-tour.jpg", alt: "Plan My Tour" },
  { src: "/assets/english-springs.jpeg", alt: "English Springs" },
  { src: "/assets/oet-star.png", alt: "OET Star" },
  { src: "/assets/pte-tests.png", alt: "PTE Tests" },
  { src: "/assets/acutelearn.png", alt: "Acutelearn" },
];

export const industries = ["Education", "Real Estate", "Travel", "Local Services", "Retail"];

export const stack = [
  { group: "Build", items: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js"] },
  { group: "Automate", items: ["Python scripts", "JavaScript", "WhatsApp API", "Google Sheets API", "Webhooks"] },
  { group: "Measure", items: ["GA4", "Google Tag Manager", "Search Console", "Looker Studio", "Meta Pixel / CAPI"] },
  { group: "Acquire", items: ["Google Ads", "Meta Ads", "Google Business Profile", "Ahrefs / Semrush", "Screaming Frog"] },
];
