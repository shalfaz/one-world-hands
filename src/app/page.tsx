import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import QuickDonationBox from "@/components/QuickDonationBox";
import ProgramsCarousel from "@/components/ProgramsCarousel";
import DonationFundsCarousel from "@/components/DonationFundsCarousel";
import {
  getPublicDonationFunds,
  getQuickDonationFunds,
} from "@/lib/data/donationFunds";
import { getPublishedProgramsForCarousel } from "@/lib/services/programService";
import { Suspense } from "react";
import T from "@/components/T";
import type { TranslationKey } from "@/context/i18n-utils";


export const metadata = {
  title: "One World Hands | For the World, With a Magic Touch - Humanitarian NGO",
  description:
    "One World Hands empowers individuals and supports communities worldwide through dignity-first humanitarian programs. Donate, volunteer, or partner with us in food assistance, emergency relief, medical aid, education, and more.",
  keywords:
    "humanitarian aid, NGO, community support, global charity, emergency relief, education support, volunteer",
  openGraph: {
    title: "One World Hands | Humanitarian NGO for Global Community Support",
    description:
      "Join us in building dignity-first humanitarian support for communities in need.",
    url: "https://oneworldhands.org",
    siteName: "One World Hands",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One World Hands | Humanitarian NGO",
    description:
      "Empowering communities through dignity-first humanitarian support and education.",
  },
};

export default async function Home() {
  const [publicFunds, quickDonationFunds, programs] = await Promise.all([
    getPublicDonationFunds(),
    getQuickDonationFunds(),
    getPublishedProgramsForCarousel(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <div className="w-full border-b border-[#D9E2EC] bg-[#F7FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-semibold tracking-wide text-[#174A70] sm:px-6 lg:px-8">
          <T k="home.banner" />
        </div>
      </div>

      <Header />

      <main id="main" className="flex-1">
        <HeroSection />

        <div id="quick-donation" className="scroll-mt-28">
          <Suspense
            fallback={
              <div className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold text-neutral-900">
                  <T k="home.quickDonation.loading" />
                </p>
              </div>
            }
          >
            <QuickDonationBox funds={quickDonationFunds} />
          </Suspense>
        </div>

        <section aria-labelledby="about-preview-title">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mb-9 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
                <T k="home.about.eyebrow" />
              </p>
              <h2
                id="about-preview-title"
                className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl"
              >
                <T k="home.about.title" />
              </h2>
            </div>

            <div className="grid items-stretch gap-8 lg:grid-cols-2">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#D9E2EC] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_18px_42px_-30px_rgba(23,74,112,0.25)] sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#009EDB]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
                    <T k="home.about.visionLabel" />
                  </p>
                  <p className="mt-4 text-lg leading-8 text-[#475569] sm:text-xl">
                    <T k="home.about.visionBody" />
                  </p>
                </div>
              </div>

              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#D9E2EC] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_18px_42px_-30px_rgba(23,74,112,0.25)] sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#174A70]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
                    <T k="home.about.missionLabel" />
                  </p>
                  <p className="mt-4 text-lg leading-8 text-[#475569] sm:text-xl">
                    <T k="home.about.missionBody" />
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#009EDB] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
              >
                <T k="home.about.knowMore" />
              </a>
            </div>
          </div>
        </section>

        <ProgramsCarousel programs={programs} />

        <DonationFundsCarousel funds={publicFunds} />

        <section aria-labelledby="why-support-title">
          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
                <T k="home.why.eyebrow" />
              </p>
              <h2
                id="why-support-title"
                className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl"
              >
                <T k="home.why.title" />
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#475569]">
                <T k="home.why.subtitle" />
              </p>
            </div>

            <div className="mt-9 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  {
                    id: "compassion",
                    titleKey: "home.why.pillars.compassionTitle",
                    bodyKey: "home.why.pillars.compassionBody",
                  },
                  {
                    id: "transparent",
                    titleKey: "home.why.pillars.transparentTitle",
                    bodyKey: "home.why.pillars.transparentBody",
                  },
                  {
                    id: "community",
                    titleKey: "home.why.pillars.communityTitle",
                    bodyKey: "home.why.pillars.communityBody",
                  },
                  {
                    id: "sustainable",
                    titleKey: "home.why.pillars.sustainableTitle",
                    bodyKey: "home.why.pillars.sustainableBody",
                  },
                ] satisfies Array<{
                  id: string;
                  titleKey: TranslationKey;
                  bodyKey: TranslationKey;
                }>
              ).map((pillar) => (
                <div
                  key={pillar.id}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#D9E2EC] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_18px_42px_-30px_rgba(23,74,112,0.25)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#009EDB]" />
                  <div>
                    <h3 className="line-clamp-2 min-h-[3.2rem] text-base font-semibold leading-snug text-[#174A70]">
                      <T k={pillar.titleKey} />
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#475569]">
                      <T k={pillar.bodyKey} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="resources-title">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
              <T k="home.resourcesPreview.eyebrow" />
            </p>
            <h2
              id="resources-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl"
            >
              <T k="home.resourcesPreview.title" />
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
              <T k="home.resourcesPreview.subtitle" />
            </p>

            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "photo", labelKey: "home.resourcesPreview.categories.photo", href: "/resources?type=photo" },
                    { id: "video", labelKey: "home.resourcesPreview.categories.video", href: "/resources?type=video" },
                    { id: "blogs", labelKey: "home.resourcesPreview.categories.blogs", href: "/resources?type=blog" },
                    { id: "annualReport", labelKey: "home.resourcesPreview.categories.annualReport", href: "/resources?type=annual%20report" },
                    { id: "publications", labelKey: "home.resourcesPreview.categories.publications", href: "/resources?type=publication" },
                    { id: "webinar", labelKey: "home.resourcesPreview.categories.webinar", href: "/resources?type=webinar" },
                    { id: "document", labelKey: "home.resourcesPreview.categories.document", href: "/resources?type=document" },
                  ] satisfies Array<{
                    id: string;
                    labelKey: TranslationKey;
                    href: string;
                  }>
                ).map((category) => (
                  <a
                    key={category.id}
                    href={category.href}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-4 py-2.5 text-center text-sm font-medium text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                  >
                    <T k={category.labelKey} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}