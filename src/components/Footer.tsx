import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapPin,
  FaPhone,
  FaYoutube,
} from "react-icons/fa6";

const quickLinks = [
  ["Home", "/"],
  ["About us", "/about-us"],
  ["Programs", "/programs"],
  ["Donation funds", "/donation-funds"],
  ["Resources", "/resources"],
  ["Updates", "/updates"],
  ["Contact", "/contact"],
] as const;

const programLinks = [
  ["Food assistance", "/programs#food-assistance"],
  ["Emergency relief", "/programs#emergency-relief"],
  ["Medical assistance", "/programs#medical-assistance"],
  ["Winter support", "/programs#winter-support"],
  ["Education support", "/programs#education-support"],
] as const;

const fundLinks = [
  ["Hunger relief", "/donation-funds#hunger-relief"],
  ["Emergency relief", "/donation-funds#emergency-relief"],
  ["Medical aid", "/donation-funds#medical-aid"],
  ["Winter support", "/donation-funds#winter-support"],
  ["General donation", "/donation-funds#general-donation"],
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebook },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
];

function FooterLinks({
  title,
  links,
  moreHref,
  moreLabel,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
  moreHref?: string;
  moreLabel?: string;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
        {moreHref && moreLabel && (
          <li className="pt-1">
            <Link
              href={moreHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#EAF6FB] transition-colors hover:text-white"
            >
              {moreLabel} <span aria-hidden="true">→</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#174A70] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr_1.2fr] lg:gap-8">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">One World Hands</p>
            <p className="mt-4 text-sm leading-6 text-white/75">
              For the world, with a magic touch. We empower individuals and
              support communities through education, direct action, and
              collaboration.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/75">
              A global initiative for humanity, unity, and hope.
            </p>
          </div>

          <FooterLinks title="Explore" links={quickLinks} />
          <FooterLinks
            title="Programs"
            links={programLinks}
            moreHref="/programs"
            moreLabel="All programs"
          />
          <FooterLinks
            title="Donation funds"
            links={fundLinks}
            moreHref="/donation-funds"
            moreLabel="All funds"
          />

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-0.5 shrink-0 text-[#EAF6FB]" aria-hidden="true" />
                <a className="transition-colors hover:text-white" href="mailto:hello@oneworldhands.org">
                  hello@oneworldhands.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="mt-0.5 shrink-0 text-[#EAF6FB]" aria-hidden="true" />
                <a className="transition-colors hover:text-white" href="tel:+10000000000">
                  +1 (000) 000-0000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapPin className="mt-0.5 shrink-0 text-[#EAF6FB]" aria-hidden="true" />
                <span>City, Country</span>
              </li>
            </ul>

            <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              Follow our work
            </h3>
            <div className="mt-3 flex gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} One World Hands. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
