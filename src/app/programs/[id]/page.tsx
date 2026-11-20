import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
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

const categoryColors: Record<string, { bg: string; text: string }> = {
  health: { bg: "bg-rose-50", text: "text-rose-700" },
  education: { bg: "bg-sky-50", text: "text-sky-700" },
  community: { bg: "bg-[#edf5ef]", text: "text-[#45624e]" },
  livelihood: { bg: "bg-amber-50", text: "text-amber-700" },
  relief: { bg: "bg-orange-50", text: "text-orange-700" },
  other: { bg: "bg-neutral-100", text: "text-neutral-700" },
};

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
  const colors = categoryColors[category] || categoryColors.other;
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
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#52715e] transition-colors hover:text-[#176345]"
        >
          ← Back to Programs
        </Link>

        {/* Main Content */}
        <article className="rounded-2xl border border-[#dce5de] bg-white p-6 sm:p-9">
          {/* Header */}
          <div className="mb-8 rounded-xl bg-[#f1f5f0] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#176345] shadow-sm">
                  <CategoryIcon aria-hidden="true" className="text-lg" />
                </span>
                <h1 className="text-3xl font-semibold tracking-tight text-[#183b2c] sm:text-4xl">
                  {String(program.title)}
                </h1>
              </div>
              <div className={`rounded-full px-3 py-1.5 text-xs font-semibold ${colors.bg} ${colors.text}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            </div>
          </div>

          {program.imageUrl && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl bg-[#edf2ed]">
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
            <div className="rounded-xl border border-[#e5ebe5] bg-[#fafcf9] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Location</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-neutral-900">
                <FaLocationDot aria-hidden="true" className="text-[#668570]" />
                {String(program.location)}
              </p>
            </div>
            <div className="rounded-xl border border-[#e5ebe5] bg-[#fafcf9] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Status</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#176345]">
                <FaCircleCheck aria-hidden="true" />
                Active Program
              </p>
            </div>
          </div>

          {/* Description */}
          <section className="mb-10">
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-[#183b2c]">
              About This Program
            </h2>
            <p className="text-base leading-7 text-[#52645a] whitespace-pre-wrap">
              {String(program.description)}
            </p>
          </section>

          {/* Creator Info */}
          <section className="mb-10 rounded-xl border border-[#dce5de] bg-[#f6f8f5] p-6">
            <h3 className="mb-4 text-base font-semibold text-[#183b2c]">
              Program Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Managed by</p>
                <p className="text-neutral-900 font-semibold">
                  {String(createdBy?.name || "One World Hands")}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Started</p>
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
          <section className="mb-10 rounded-xl bg-[#173d30] p-6 text-white sm:p-8">
            <h2 className="mb-3 text-xl font-semibold">Support This Program</h2>
            <p className="mb-6 max-w-2xl text-sm leading-6 text-white/75">
              Your donation directly helps us continue this vital work and expand
              our impact in the community.
            </p>
            <Link
              href="/donation-funds"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#dcebdd] px-6 text-sm font-semibold text-[#173d30] transition-colors hover:bg-white"
            >
              Donate Now <FaArrowRight aria-hidden="true" className="text-xs" />
            </Link>
          </section>

          {/* Resources Link */}
          <section className="rounded-xl border border-[#dce5de] p-6 sm:p-8">
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-[#183b2c]">
              Learn More
            </h2>
            <p className="mb-5 text-sm leading-6 text-[#52645a]">
              Check out our resources section for more information, case studies, and
              impact reports related to this program.
            </p>
            <Link
              href="/resources"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#dce5de] px-5 text-sm font-semibold text-[#365b47] transition-colors hover:bg-[#f1f6f1]"
            >
              View Resources <FaArrowRight aria-hidden="true" className="text-xs" />
            </Link>
          </section>
        </article>

        {/* Related Programs */}
        {relatedPrograms.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#183b2c]">
              Similar Programs
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPrograms.map((relatedProgram) => {
                const RelatedIcon =
                  categoryIcons[String(relatedProgram.category)] || FaTag;
                return (
                  <Link
                    key={String(relatedProgram._id)}
                    href={`/programs/${relatedProgram._id}`}
                    className="group rounded-xl border border-[#dce5de] bg-white p-5 transition-all hover:border-[#b8d2c0] hover:shadow-md"
                  >
                    <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf5ef] text-[#176345]">
                      <RelatedIcon aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold text-[#183b2c] transition-colors group-hover:text-[#176345]">
                      {String(relatedProgram.title)}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5b6d62]">
                      {String(relatedProgram.description)}
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
            className="inline-flex items-center gap-2 rounded-full border border-[#dce5de] bg-white px-6 py-3 text-sm font-semibold text-[#365b47] transition-colors hover:bg-[#f1f6f1]"
          >
            ← Explore All Programs
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
