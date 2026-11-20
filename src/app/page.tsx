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
      <div className="w-full border-b border-[#e3ebe4] bg-[#f1f5f0]">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-semibold tracking-wide text-[#365b47] sm:px-6 lg:px-8">
          Where Magic Hands Unite, Wonders Arise.
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
                  Preparing donation options...
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">
                Who we are
              </p>
              <h2
                id="about-preview-title"
                className="mt-2 text-3xl font-semibold tracking-tight text-[#183b2c] sm:text-4xl"
              >
                Our Vision & Mission
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="group relative overflow-hidden rounded-2xl border border-[#dce5de] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_18px_42px_-30px_rgba(24,59,44,0.35)] sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#176345]" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">
                  Vision
                </p>
                <p className="mt-4 text-lg leading-8 text-[#42584b] sm:text-xl">
                  A world where every human being has opportunity, dignity, and
                  support to live a better life.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[#dce5de] bg-white p-7 transition-shadow duration-200 hover:shadow-[0_18px_42px_-30px_rgba(24,59,44,0.35)] sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#c99a53]" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">
                  Mission
                </p>
                <p className="mt-4 text-lg leading-8 text-[#42584b] sm:text-xl">
                  To empower individuals, support communities, and address social,
                  economic, and environmental challenges through direct action,
                  education, and collaboration.
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#176345] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#104b34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176345] focus-visible:ring-offset-2"
              >
                Know More
              </a>
            </div>
          </div>
        </section>

        <ProgramsCarousel programs={programs} />

        <DonationFundsCarousel funds={publicFunds} />

        <section aria-labelledby="why-support-title">
          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">
                Our approach
              </p>
              <h2
                id="why-support-title"
                className="mt-2 text-3xl font-semibold tracking-tight text-[#183b2c] sm:text-4xl"
              >
                Why Support Us
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#52645a]">
                Trust is built through consistent care, transparency, and
                measurable learning.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Compassion-Driven Action",
                  body: "Support that starts with dignity and responds to real needs identified by community partners.",
                },
                {
                  title: "Transparent Giving",
                  body: "Clear updates and learning notes so donors can see progress, challenges, and next steps.",
                },
                {
                  title: "Community-Focused Impact",
                  body: "Programs designed with local people—so solutions fit the context and strengthen long-term capacity.",
                },
                {
                  title: "Sustainable Change",
                  body: "We support practices that endure—training, stewardship, and collaboration that help communities continue after the initial support.",
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#dce5de] bg-white p-6 transition-shadow duration-200 hover:shadow-[0_18px_42px_-30px_rgba(24,59,44,0.35)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#176345]" />
                  <h3 className="text-base font-semibold leading-7 text-[#183b2c]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#52645a]">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="resources-title">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">
              Learn and share
            </p>
            <h2
              id="resources-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-[#183b2c] sm:text-4xl"
            >
              Resources Preview
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
              Explore reports, publications, learning notes, and media from
              across our programs.
            </p>

            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Photo", href: "/resources?type=photo" },
                  { label: "Video", href: "/resources?type=video" },
                  { label: "Blogs", href: "/resources?type=blog" },
                  { label: "Annual Report", href: "/resources?type=annual%20report" },
                  { label: "Publications", href: "/resources?type=publication" },
                  { label: "Webinar", href: "/resources?type=webinar" },
                  { label: "Document", href: "/resources?type=document" },
                ].map((category) => (
                  <a
                    key={category.label}
                    href={category.href}
                    className="inline-flex items-center justify-center rounded-full border border-[#dce5de] bg-white px-4 py-2.5 text-center text-sm font-medium text-[#365b47] transition-colors hover:border-[#b8d2c0] hover:bg-[#f1f6f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176345] focus-visible:ring-offset-2"
                  >
                    {category.label}
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