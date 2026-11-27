import Link from "next/link";
import PageShell from "@/components/PageShell";
import PublicProgramCard from "@/components/PublicProgramCard";
import T from "@/components/T";
import { ProgramsAriaSection } from "@/components/i18n/ProgramsHelpers";
import type { TranslationKey } from "@/context/i18n-utils";
import { getPublishedPrograms } from "@/lib/services/programService";
import {
  FaBookOpen,
  FaBriefcase,
  FaHeartPulse,
  FaLifeRing,
  FaTag,
  FaUsers,
} from "react-icons/fa6";

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
          <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
                  <T k="programs.hero.eyebrow" />
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
                  <T k="programs.hero.title" />
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
                  <T k="programs.hero.description" />
                </p>
                <p className="mt-3 text-sm text-neutral-500">
                  <T k="programs.hero.count" vars={{ count: programs.length }} />
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/donation-funds"
                  className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                >
                  <T k="programs.hero.donateNow" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-6 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                >
                  <T k="programs.hero.exploreResources" />
                </Link>
              </div>
            </div>
          </section>

          {/* Program cards */}
          <ProgramsAriaSection className="mt-10" ariaLabelKey="programs.listAriaLabel">
            {programs.length > 0 ? (
              <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <PublicProgramCard key={String(program._id)} program={program} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#D9E2EC] bg-white p-12 text-center">
                <p className="text-neutral-600 text-lg font-semibold">
                  <T k="programs.empty.title" />
                </p>
                <p className="text-neutral-500 mt-2">
                  <T k="programs.empty.description" />
                </p>
              </div>
            )}
          </ProgramsAriaSection>

          {/* Category explanation */}
          {programs.length > 0 && (
            <section className="mt-12 rounded-2xl border border-[#D9E2EC] bg-[#F7FAFC] p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-[#174A70]">
                <T k="programs.categoriesSection.title" />
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {([
                  { id: "health", titleKey: "programs.categoriesSection.items.health.title", descriptionKey: "programs.categoriesSection.items.health.description", icon: FaHeartPulse },
                  { id: "education", titleKey: "programs.categoriesSection.items.education.title", descriptionKey: "programs.categoriesSection.items.education.description", icon: FaBookOpen },
                  { id: "community", titleKey: "programs.categoriesSection.items.community.title", descriptionKey: "programs.categoriesSection.items.community.description", icon: FaUsers },
                  { id: "livelihood", titleKey: "programs.categoriesSection.items.livelihood.title", descriptionKey: "programs.categoriesSection.items.livelihood.description", icon: FaBriefcase },
                  { id: "relief", titleKey: "programs.categoriesSection.items.relief.title", descriptionKey: "programs.categoriesSection.items.relief.description", icon: FaLifeRing },
                  { id: "other", titleKey: "programs.categoriesSection.items.other.title", descriptionKey: "programs.categoriesSection.items.other.description", icon: FaTag },
                ] as const satisfies readonly { id: string; titleKey: TranslationKey; descriptionKey: TranslationKey; icon: typeof FaHeartPulse }[]).map(({ id, titleKey, descriptionKey, icon: Icon }) => (
                  <div key={id} className="flex items-start gap-3 rounded-xl border border-[#D9E2EC] bg-white p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#EAF6FB] text-[#009EDB]">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#174A70]"><T k={titleKey} /></h3>
                      <p className="mt-1 text-xs leading-5 text-[#627D98]"><T k={descriptionKey} /></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
    </PageShell>
  );
}
