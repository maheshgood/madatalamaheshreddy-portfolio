import Link from "next/link";
import { LinkedInIcon, WhatsAppIcon, XIcon } from "@/components/ui/BrandIcons";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  const socials = [
    { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: site.social.x, label: "X (Twitter)", Icon: XIcon },
    { href: whatsappLink("Hi Mahesh!"), label: "WhatsApp", Icon: WhatsAppIcon },
  ];

  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 text-sm text-slate-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} · Growth engineering &amp; digital marketing
        </p>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <Link href="/local" className="font-mono text-glow-cyan hover:text-white">
            /local tools
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            Email
          </a>
          {socials.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-white">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
