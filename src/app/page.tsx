import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ResourceCard from "@/components/ResourceCard";
import UpdatesSection from "@/components/UpdatesSection";
import CTASection from "@/components/CTASection";
import QuickDonationBox from "@/components/QuickDonationBox";
import ProgramsCarousel from "@/components/ProgramsCarousel";
import DonationFundsCarousel from "@/components/DonationFundsCarousel";
import {
  getPublicDonationFunds,
  getQuickDonationFunds,
} from "@/lib/data/donationFunds";
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
              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
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
            <h2
              id="about-preview-title"
              className="text-3xl font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent sm:text-4xl"
            >
              Our Vision & Mission
            </h2>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="group relative overflow-hidden rounded-2xl border-2 border-sky-300 bg-linear-to-br from-white to-sky-50 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-linear-to-br from-sky-200 to-blue-300 opacity-10" />
                
                <div className="relative flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-blue-600 ring-4 ring-sky-100 shadow-lg">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-white"
                      fill="none"
                    >
                      <path
                        d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-lg font-bold text-neutral-900">Vision</p>
                </div>

                <p className="mt-6 text-base leading-8 text-neutral-700">
                  A world where every human being has opportunity, dignity, and
                  support to live a better life.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-linear-to-br from-white to-emerald-50 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-linear-to-br from-emerald-200 to-green-300 opacity-10" />
                
                <div className="relative flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-emerald-600 ring-4 ring-emerald-100 shadow-lg">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-white"
                      fill="none"
                    >
                      <path
                        d="M20 6L10 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-lg font-bold text-neutral-900">Mission</p>
                </div>

                <p className="mt-6 text-base leading-8 text-neutral-700">
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
                📖 Know More
              </a>
            </div>
          </div>
        </section>

        <ProgramsCarousel programs={[]} />

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
                  icon: (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-rose-500"
                      fill="none"
                    >
                      <path
                        d="M20.8 4.6c-1.4-1.4-3.7-1.4-5.1 0L12 8.3 8.3 4.6c-1.4-1.4-3.7-1.4-5.1 0-1.4 1.4-1.4 3.7 0 5.1L12 18.5l8.8-8.8c1.4-1.4 1.4-3.7 0-5.1Z"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-rose-50 to-pink-50",
                  border: "border-rose-300",
                  bgIcon: "from-rose-500 to-pink-600",
                },
                {
                  title: "Transparent Giving",
                  body: "Clear updates and learning notes so donors can see progress, challenges, and next steps.",
                  icon: (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-emerald-500"
                      fill="none"
                    >
                      <path
                        d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4Z"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 12l2 2 4-5"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-emerald-50 to-green-50",
                  border: "border-emerald-300",
                  bgIcon: "from-emerald-500 to-green-600",
                },
                {
                  title: "Community-Focused Impact",
                  body: "Programs designed with local people—so solutions fit the context and strengthen long-term capacity.",
                  icon: (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-indigo-500"
                      fill="none"
                    >
                      <path
                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 21v-2a4 4 0 0 0-3-3.87"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 3.13a4 4 0 0 1 0 7.75"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  gradient: "from-indigo-50 to-purple-50",
                  border: "border-indigo-300",
                  bgIcon: "from-indigo-500 to-purple-600",
                },
                {
                  title: "Sustainable Change",
                  body: "We support practices that endure—training, stewardship, and collaboration that help communities continue after the initial support.",
                  icon: (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-teal-500"
                      fill="none"
                    >
                      <path
                        d="M21 10c0 7-9 13-9 13S3 17 3 10a6 6 0 0 1 18 0Z"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11c1.5 1.5 4.5 1.5 6 0"
                        stroke="currentColor"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  gradient: "from-teal-50 to-cyan-50",
                  border: "border-teal-300",
                  bgIcon: "from-teal-500 to-cyan-600",
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className={`group relative overflow-hidden rounded-2xl border-2 ${pillar.border} bg-linear-to-br ${pillar.gradient} p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-linear-to-br opacity-10" />
                  
                  <div className="relative flex items-start gap-4">
                    <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${pillar.bgIcon} ring-4 ring-offset-2 text-white shadow-lg`}>
                      {pillar.icon}
                    </span>
                    <h3 className="text-base font-bold text-neutral-950 pt-1">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-700">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-linear-to-b from-neutral-50 to-blue-50/30 border-y-2 border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <UpdatesSection updates={[]} limit={3} />
          </div>
        </div>

        <section aria-labelledby="resources-title">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div>
              <h2
                id="resources-title"
                className="text-3xl font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent sm:text-4xl"
              >
                📚 Resources Preview
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
                Explore reports, publications, learning notes, and media from
                across our programs.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Resources will be loaded from MongoDB */}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}