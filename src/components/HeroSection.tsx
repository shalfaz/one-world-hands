"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaChartLine,
  FaGraduationCap,
  FaHandshake,
  FaHeartPulse,
} from "react-icons/fa6";
import { MdGroupWork } from "react-icons/md";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const isBn = lang === "bn";

  const commitments = [
    {
      id: "dignity",
      label: t.home.hero.commitments.dignityLabel,
      detail: t.home.hero.commitments.dignityDetail,
      icon: FaHandshake,
    },
    {
      id: "community",
      label: t.home.hero.commitments.communityLabel,
      detail: t.home.hero.commitments.communityDetail,
      icon: MdGroupWork,
    },
    {
      id: "accountable",
      label: t.home.hero.commitments.accountableLabel,
      detail: t.home.hero.commitments.accountableDetail,
      icon: FaChartLine,
    },
  ];

  const areas = [
    { id: "rapidResponse", label: t.home.hero.areas.rapidResponse, icon: FaChartLine },
    { id: "educationSkills", label: t.home.hero.areas.educationSkills, icon: FaGraduationCap },
    { id: "healthWellbeing", label: t.home.hero.areas.healthWellbeing, icon: FaHeartPulse },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-transparent bg-[#F7FAFC]"
    >
      <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="flex max-w-2xl flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-[#174A70]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#009EDB]" aria-hidden="true" />
              {t.home.hero.badge}
            </div>

            <h1
              id="hero-title"
              className={`mt-6 text-4xl font-semibold tracking-tight text-[#174A70] sm:text-5xl lg:text-6xl ${
                isBn ? "leading-[1.25]" : "leading-[1.08]"
              }`}
            >
              {t.home.hero.title}
            </h1>

            <p
              className={`mt-5 max-w-xl text-xl font-medium text-[#334E68] sm:text-2xl ${
                isBn ? "leading-relaxed" : "leading-8"
              }`}
            >
              {t.home.hero.taglineBefore}{" "}
              <span className="text-[#009EDB]">{t.home.hero.taglineHighlight}</span>
            </p>

            <p
              className={`mt-5 max-w-xl text-base text-[#475569] sm:text-lg ${
                isBn ? "leading-relaxed" : "leading-7 sm:leading-8"
              }`}
            >
              {t.home.hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about-us"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
              >
                {t.home.hero.aboutButton}
                <FaArrowRight aria-hidden="true" className="text-xs" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-6 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
              >
                {t.home.hero.programsButton}
              </Link>
            </div>
          </div>

          <ul className="mt-10 grid gap-4 border-t border-[#D9E2EC] pt-6 sm:grid-cols-3 sm:gap-5">
            {commitments.map(({ id, label, detail, icon: Icon }) => (
              <li key={id} className="flex items-start gap-3">
                <Icon className="mt-0.5 shrink-0 text-base text-[#009EDB]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#174A70]">{label}</p>
                  <p className={`mt-1 text-xs text-[#627D98] ${isBn ? "leading-relaxed" : "leading-5"}`}>{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside
          aria-label={t.home.hero.impactLabel}
          className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#D9E2EC] bg-white p-6 shadow-[0_24px_70px_-45px_rgba(23,74,112,0.25)] sm:p-8 lg:ml-auto lg:max-w-xl"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-[#009EDB]" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
              {t.home.hero.impactLabel}
            </p>
            <h2
              className={`mt-3 max-w-md text-2xl font-semibold tracking-tight text-[#174A70] sm:text-3xl ${
                isBn ? "leading-relaxed" : "leading-snug"
              }`}
            >
              {t.home.hero.impactTitle}
            </h2>
            <p className={`mt-4 max-w-lg text-sm text-[#475569] ${isBn ? "leading-relaxed" : "leading-6"}`}>
              {t.home.hero.impactBody}
            </p>

            <div className="mt-8 divide-y divide-[#D9E2EC] border-y border-[#D9E2EC]">
              {areas.map(({ id, label, icon: Icon }, index) => (
                <div key={id} className="flex items-center gap-4 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF6FB] text-[#009EDB]">
                    <Icon aria-hidden="true" />
                  </span>
                  <p className="flex-1 text-sm font-semibold text-[#174A70]">{label}</p>
                  <span className="text-xs font-medium tabular-nums text-[#627D98]">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#EAF6FB] p-4">
            <FaHandshake className="mt-0.5 shrink-0 text-[#009EDB]" aria-hidden="true" />
            <p className={`text-sm text-[#475569] ${isBn ? "leading-relaxed" : "leading-6"}`}>
              {t.home.hero.impactNote}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
