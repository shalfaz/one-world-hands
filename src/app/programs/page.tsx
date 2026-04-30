import Link from "next/link";
import PageShell from "@/components/PageShell";
import PublicProgramCard from "@/components/PublicProgramCard";
import { getPublishedPrograms } from "@/lib/services/programService";

export const metadata = {
  title: "Humanitarian Programs | One World Hands - Food, Medical & Education Support",
  description:
    "Explore One World Hands programs including food assistance, emergency relief, medical assistance, winter support, and education. Designed with communities for dignity-first humanitarian impact.",
  keywords:
    "humanitarian programs, food assistance, emergency relief, medical assistance, education support, winter support, community programs",
  openGraph: {
    title: "Our Programs | One World Hands Humanitarian Support",
    description:
      "Discover our community-designed programs for food, medical, education, and emergency support.",
    url: "https://oneworldhands.org/programs",
  },
};

export default async function ProgramsPage() {
  const programs = await getPublishedPrograms();

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero intro */}
          <section className="rounded-2xl lg:rounded-3xl border-2 border-neutral-200 bg-linear-to-br from-white to-neutral-50 p-6 shadow-lg sm:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent sm:text-4xl">
                  Programs
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
                  Each program is designed with communities to deliver dignified
                  support, practical education, and lasting community capacity.
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  Discover {programs.length} active programs helping communities worldwide.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/donation-funds"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-sky-600 to-blue-600 px-6 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  🎁 Donate Now
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex h-11 items-center justify-center rounded-full border-2 border-sky-300 bg-white px-6 text-sm font-bold text-sky-700 shadow-md transition-all hover:shadow-lg hover:scale-105 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  📚 Explore Resources
                </Link>
              </div>
            </div>
          </section>

          {/* Program cards */}
          <section className="mt-10" aria-label="Programs list">
            {programs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <PublicProgramCard key={String(program._id)} program={program} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
                <p className="text-neutral-600 text-lg font-semibold">
                  No programs available at the moment
                </p>
                <p className="text-neutral-500 mt-2">
                  Check back soon for updates on our humanitarian programs.
                </p>
              </div>
            )}
          </section>

          {/* Category explanation */}
          {programs.length > 0 && (
            <section className="mt-12 rounded-2xl border-2 border-neutral-200 bg-neutral-50 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Program Categories
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex gap-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Health</h3>
                    <p className="text-sm text-neutral-600">Medical assistance and health support</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Education</h3>
                    <p className="text-sm text-neutral-600">Learning programs and scholarships</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Community</h3>
                    <p className="text-sm text-neutral-600">Community development initiatives</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Livelihood</h3>
                    <p className="text-sm text-neutral-600">Skill training and employment</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">🆘</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Emergency Relief</h3>
                    <p className="text-sm text-neutral-600">Crisis response and disaster aid</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">📌</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Other</h3>
                    <p className="text-sm text-neutral-600">Special initiatives and projects</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
    </PageShell>
  );
}
