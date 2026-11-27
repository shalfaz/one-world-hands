"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
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
  ["home", "/"],
  ["aboutUs", "/about-us"],
  ["programs", "/programs"],
  ["donationFunds", "/donation-funds"],
  ["resources", "/resources"],
  ["updates", "/updates"],
  ["contact", "/contact"],
] as const;

const programLinks = [
  ["foodAssistance", "/programs#food-assistance"],
  ["emergencyRelief", "/programs#emergency-relief"],
  ["medicalAssistance", "/programs#medical-assistance"],
  ["winterSupport", "/programs#winter-support"],
  ["educationSupport", "/programs#education-support"],
] as const;

const fundLinks = [
  ["hungerRelief", "/donation-funds#hunger-relief"],
  ["emergencyRelief", "/donation-funds#emergency-relief"],
  ["medicalAid", "/donation-funds#medical-aid"],
  ["winterSupport", "/donation-funds#winter-support"],
  ["generalDonation", "/donation-funds#general-donation"],
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
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#EAF6FB] transition-colors hover:text-white"
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
  const { t } = useLanguage();
  const quickLinkItems = quickLinks.map(
    ([key, href]) => [t.footer.exploreLinks[key], href] as const
  );
  const programLinkItems = programLinks.map(
    ([key, href]) => [t.footer.programLinks[key], href] as const
  );
  const fundLinkItems = fundLinks.map(
    ([key, href]) => [t.footer.fundLinks[key], href] as const
  );

  return (
    <footer className="border-t border-white/10 bg-[#174A70] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr_1.2fr] lg:gap-8">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">{t.footer.brand}</p>
            <p className="mt-4 text-sm leading-6 text-white/75">
              {t.footer.tagline1}
            </p>
            <p className="mt-4 text-sm leading-6 text-white/75">
              {t.footer.tagline2}
            </p>
          </div>

          <FooterLinks title={t.footer.explore} links={quickLinkItems} />
          <FooterLinks
            title={t.footer.programs}
            links={programLinkItems}
            moreHref="/programs"
            moreLabel={t.footer.allPrograms}
          />
          <FooterLinks
            title={t.footer.donationFunds}
            links={fundLinkItems}
            moreHref="/donation-funds"
            moreLabel={t.footer.allFunds}
          />

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              {t.footer.contact}
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
                <span>{t.footer.cityCountry}</span>
              </li>
            </ul>

            <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              {t.footer.followOurWork}
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
            {t.footer.rights.replace("{year}", String(new Date().getFullYear()))}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              {t.footer.privacy}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              {t.footer.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
