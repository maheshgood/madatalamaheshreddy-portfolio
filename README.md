# madatalamaheshreddy.com

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide.

## Commands
npm install        # install dependencies
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build

## Config
- Contact details, socials, GA4 ID: lib/site.ts
- Booking link: set NEXT_PUBLIC_CALENDAR_URL (Calendly / Cal.com) in .env.local or your host.
  If unset, "Schedule Strategy Call" opens WhatsApp with a booking message.
- All copy (metrics, tools, case studies, timeline, stack): lib/data.ts

## Structure
app/            layout (SEO metadata, JSON-LD, GA4), home page, /local, sitemap, robots
components/
  sections/     Navbar, Hero, ToolsSuite, Capabilities, CaseStudies, RoiCalculator, Experience, Contact, Footer
  local/        /local tools: NAP checker, SERP preview, UTM builder, WhatsApp link, Review link
  ui/           Reveal / Counter / SectionHeader / ButtonLink, brand SVG icons, MotionConfig provider
lib/            site config, content data, utils (cn, GA4 trackEvent)
public/assets/  avatar, mark, client logos

The legacy static site (index.html, style.css, assets/) is untouched at the root and is not used by Next.js.
