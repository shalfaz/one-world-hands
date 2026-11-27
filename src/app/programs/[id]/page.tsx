import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import T from "@/components/T";
import {
  ProgramCategoryLabel,
  ProgramTranslatedField,
} from "@/components/i18n/ProgramsHelpers";
import { getPublishedPrograms } from "@/lib/services/programService";
import {
  FaArrowRight,
  FaBookOpen,
  FaBriefcase,
  FaCircleCheck,
  FaHeartPulse,
  FaLifeRing,
  FaLocationDot,
  FaTag,
  FaUsers,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const categoryIcons: Record<string, IconType> = {
  health: FaHeartPulse,
  education: FaBookOpen,
  community: FaUsers,
  livelihood: FaBriefcase,
  relief: FaLifeRing,
  other: FaTag,
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const programs = await getPublishedPrograms();
  const program = programs.find((p) => p._id === id);

  if (!program) {
    return {
      title: "Program Not Found",
      description: "The program you are looking for does not exist.",
    };
  }

  return {
    title: `${String(program.title)} | One World Hands`,
    description: String(program.description),
    openGraph: {
      title: `${String(program.title)} | One World Hands`,
      description: String(program.description),
      url: `https://oneworldhands.org/programs/${program._id}`,
    },
  };
};

export const generateStaticParams = async () => {
  const programs = await getPublishedPrograms();
  return programs.map((program) => ({
    id: String(program._id),
  }));
};

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const programs = await getPublishedPrograms();
  const program = programs.find((p) => p._id === id);

  if (!program) {
    notFound();
  }

  const category = String(program.category || "other");
  const CategoryIcon = categoryIcons[category] || FaTag;
  const createdBy = program.createdBy as Record<string, unknown>;
  const createdDate = new Date(String(program.createdAt));

  // Get related programs (same category)
  const relatedPrograms = programs
    .filter((p) => p.category === category && p._id !== program._id)
    .slice(0, 3);

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/programs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#174A70] transition-colors hover:text-[#009EDB]"
        >
          <T k="programs.detail.backToPrograms" />
        </Link>

        {/* Main Content */}
        <article className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-9">
          {/* Header */}
          <div className="mb-8 rounded-xl bg-[#F7FAFC] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#009EDB] shadow-sm">
                  <CategoryIcon aria-hidden="true" className="text-lg" />
                </span>
                <h1 className="text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
                  <ProgramTranslatedField
                    field="title"
                    programTitle={String(program.title)}
                    fallback={String(program.title)}
                  />
                </h1>
              </div>
              <div className="shrink-0 whitespace-nowrap rounded-full bg-[#EAF6FB] px-3 py-1.5 text-xs font-semibold text-[#174A70]">
                <ProgramCategoryLabel category={category} />
              </div>
            </div>
          </div>

          {program.imageUrl && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl bg-[#EAF6FB]">
              <Image
                src={String(program.imageUrl)}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Meta Information */}
          <div className="mb-8 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500"><T k="programs.detail.location" /></p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-neutral-900">
                <FaLocationDot aria-hidden="true" className="text-[#009EDB]" />
                <ProgramTranslatedField
                  field="location"
                  programTitle={String(program.title)}
                  fallback={String(program.location)}
                />
              </p>
            </div>
            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500"><T k="programs.detail.status" /></p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#009EDB]">
                <FaCircleCheck aria-hidden="true" />
                <T k="programs.detail.activeProgram" />
              </p>
            </div>
          </div>

          {/* Description */}
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-[#174A70]">
              <T k="programs.detail.aboutTitle" />
            </h2>
            <p className="text-base leading-7 text-[#475569] whitespace-pre-wrap">
              <ProgramTranslatedField
                field="description"
                programTitle={String(program.title)}
                fallback={String(program.description)}
              />
            </p>
          </section>

          {/* Creator Info */}
          <section className="mb-10 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-6">
            <h3 className="mb-4 text-base font-semibold text-[#174A70]">
              <T k="programs.detail.infoTitle" />
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500"><T k="programs.detail.managedBy" /></p>
                <p className="text-neutral-900 font-semibold">
                  {createdBy?.name ? String(createdBy.name) : <T k="programs.detail.defaultOrg" />}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500"><T k="programs.detail.started" /></p>
                <p className="text-neutral-900 font-semibold">
                  {createdDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-10 rounded-xl bg-[#174A70] p-6 text-white sm:p-8">
            <h2 className="mb-3 text-xl font-semibold"><T k="programs.detail.supportTitle" /></h2>
            <p className="mb-6 max-w-2xl text-sm leading-6 text-white/75">
              <T k="programs.detail.supportDescription" />
            </p>
            <Link
              href="/donation-funds"
              className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#EAF6FB] px-6 text-sm font-semibold text-[#174A70] transition-colors hover:bg-white"
            >
              <T k="programs.detail.donateNow" /> <FaArrowRight aria-hidden="true" className="text-xs" />
            </Link>
          </section>

          {/* Resources Link */}
          <section className="rounded-xl border border-[#D9E2EC] p-6 sm:p-8">
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-[#174A70]">
              <T k="programs.detail.learnMoreTitle" />
            </h2>
            <p className="mb-5 text-sm leading-6 text-[#475569]">
              <T k="programs.detail.learnMoreDescription" />
            </p>
            <Link
              href="/resources"
              className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-[#D9E2EC] px-5 text-sm font-semibold text-[#174A70] transition-colors hover:bg-[#EAF6FB]"
            >
              <T k="programs.detail.viewResources" /> <FaArrowRight aria-hidden="true" className="text-xs" />
            </Link>
          </section>
        </article>

        {/* Related Programs */}
        {relatedPrograms.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#174A70]">
              <T k="programs.detail.similarTitle" />
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPrograms.map((relatedProgram) => {
                const RelatedIcon =
                  categoryIcons[String(relatedProgram.category)] || FaTag;
                return (
                  <Link
                    key={String(relatedProgram._id)}
                    href={`/programs/${relatedProgram._id}`}
                    className="group rounded-xl border border-[#D9E2EC] bg-white p-5 transition-all hover:border-[#009EDB] hover:shadow-md"
                  >
                    <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF6FB] text-[#009EDB]">
                      <RelatedIcon aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold text-[#174A70] transition-colors group-hover:text-[#009EDB]">
                      <ProgramTranslatedField
                        field="title"
                        programTitle={String(relatedProgram.title)}
                        fallback={String(relatedProgram.title)}
                      />
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#475569]">
                      <ProgramTranslatedField
                        field="description"
                        programTitle={String(relatedProgram.title)}
                        fallback={String(relatedProgram.description)}
                      />
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Back to all programs */}
        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-6 py-3 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB]"
          >
            <T k="programs.detail.exploreAll" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
