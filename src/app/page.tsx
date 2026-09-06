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
  const publicFunds = getPublicDonationFunds();
  const quickDonationFunds = getQuickDonationFunds();
  const programs = await getPublishedProgramsForCarousel();

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-foreground">
      <div className="w-full border-b border-sky-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 text-center text-sm font-bold text-[#0084d1] sm:px-6 lg:px-8">
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
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2
                id="about-preview-title"
                className="text-3xl font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent sm:text-4xl"
              >
                Our Vision & Mission
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-30px_rgba(15,23,42,0.28)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-sky-500" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Vision
                </p>
                <p className="mt-5 text-lg leading-8 text-neutral-700 sm:text-xl">
                  A world where every human being has opportunity, dignity, and
                  support to live a better life.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-30px_rgba(15,23,42,0.28)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-emerald-500" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Mission
                </p>
                <p className="mt-5 text-lg leading-8 text-neutral-700 sm:text-xl">
                  To empower individuals, support communities, and address social,
                  economic, and environmental challenges through direct action,
                  education, and collaboration.
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-600 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Know More
              </a>
            </div>
          </div>
        </section>

        <ProgramsCarousel programs={programs} />

        <DonationFundsCarousel funds={publicFunds} />

        <section aria-labelledby="why-support-title">
          <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div>
              <h2
                id="why-support-title"
                className="text-3xl font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent sm:text-4xl"
              >
                Why Support Us
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
                Trust is built through consistent care, transparency, and
                measurable learning.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-30px_rgba(15,23,42,0.24)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-sky-500" />
                  <h3 className="text-lg font-bold leading-7 text-neutral-950">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-700">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="resources-title">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2
              id="resources-title"
              className="text-3xl font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent sm:text-4xl"
            >
              Resources Preview
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
              Explore reports, publications, learning notes, and media from
              across our programs.
            </p>

            <div className="mt-8">
              <div className="grid w-full grid-cols-2 gap-2 rounded-full bg-sky-500 p-2 text-white sm:grid-cols-3 lg:grid-cols-7">
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
                    className="flex items-center justify-center rounded-full px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
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