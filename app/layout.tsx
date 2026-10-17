import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Providers } from "@/components/ui/Providers";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Madatala Mahesh Reddy",
    "growth engineer",
    "SEO specialist Hyderabad",
    "AEO GEO AI search optimization",
    "local SEO",
    "Google Ads",
    "Meta Ads",
    "performance marketing",
    "marketing automation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} | ${site.title}`,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/assets/mahesh-avatar.jpeg", alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@maheshmadatala",
    title: `${site.name} | ${site.title}`,
    description: site.description,
  },
  icons: { icon: "/assets/mahesh-mark.svg" },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/assets/mahesh-avatar.jpeg`,
  jobTitle: site.title,
  alumniOf: { "@type": "CollegeOrUniversity", name: "ABR College" },
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  knowsAbout: [
    "Search Engine Optimization",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
    "Local SEO",
    "Google Ads",
    "Meta Ads",
    "Conversion Rate Optimization",
    "Marketing Automation",
    "Next.js",
  ],
  sameAs: Object.values(site.social),
  email: `mailto:${site.email}`,
  telephone: "+91-8143471233",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-glow-cyan focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
        </Script>
      </body>
    </html>
  );
}
