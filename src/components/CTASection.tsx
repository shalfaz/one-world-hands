"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="get-involved-title" className="my-14 sm:my-18 lg:my-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#D9E2EC] bg-[#EAF6FB] px-6 py-10 sm:px-10 sm:py-12 lg:px-12">

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <div className="inline-flex items-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
                {t.home.cta.badge}
              </div>

              <h2
                id="get-involved-title"
                className="mt-5 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl"
              >
                {t.home.cta.title}
              </h2>

              <p className="mt-4 text-base leading-7 text-[#475569]">
                {t.home.cta.body}
              </p>

              <ul className="mt-8 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#009EDB]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#174A70]">{t.home.cta.point1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#009EDB]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#174A70]">{t.home.cta.point2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#17634B]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#174A70]">{t.home.cta.point3}</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="rounded-xl border border-[#D9E2EC] bg-white p-4 sm:p-5">
                <div className="grid gap-3 sm:gap-4">
                  <Link
                    href="/donation-funds"
                    className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                  >
                    {t.home.cta.donateButton}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-8 text-sm font-semibold text-[#174A70] transition-colors hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                  >
                    {t.home.cta.volunteerButton}
                  </Link>
                  <Link
                    href="/updates"
                    className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-8 text-sm font-semibold text-[#174A70] transition-colors hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                  >
                    {t.home.cta.updatesButton}
                  </Link>
                </div>

                <p className="mt-5 border-t border-[#D9E2EC] pt-4 text-xs leading-5 text-neutral-500">
                  {t.home.cta.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

