import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getPublishedPrograms } from "@/lib/services/programService";

const categoryColors: Record<string, { bg: string; text: string }> = {
  health: { bg: "bg-red-100", text: "text-red-700" },
  education: { bg: "bg-blue-100", text: "text-blue-700" },
  community: { bg: "bg-green-100", text: "text-green-700" },
  livelihood: { bg: "bg-purple-100", text: "text-purple-700" },
  relief: { bg: "bg-orange-100", text: "text-orange-700" },
  other: { bg: "bg-slate-100", text: "text-slate-700" },
};

const categoryIcons: Record<string, string> = {
  health: "🏥",
  education: "📚",
  community: "👥",
  livelihood: "💼",
  relief: "🆘",
  other: "📌",
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
  const colors = categoryColors[category];
  const icon = categoryIcons[category];
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
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-8"
        >
          ← Back to Programs
        </Link>

        {/* Main Content */}
        <article className="rounded-3xl border-2 border-neutral-200 bg-white p-8 shadow-lg sm:p-10">
          {/* Header */}
          <div className={`${colors.bg} rounded-2xl p-6 mb-8`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-4xl mb-3">{icon}</div>
                <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
                  {String(program.title)}
                </h1>
              </div>
              <div className={`rounded-full ${colors.bg} border-2 border-current px-4 py-2 ${colors.text} font-semibold whitespace-nowrap`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600 font-semibold">Location</p>
              <p className="text-lg text-neutral-900 mt-1">
                📍 {String(program.location)}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600 font-semibold">Status</p>
              <p className="text-lg text-green-700 mt-1 font-semibold">
                ✓ Active Program
              </p>
            </div>
          </div>

          {/* Description */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              About This Program
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {String(program.description)}
            </p>
          </section>

          {/* Creator Info */}
          <section className="mb-10 rounded-xl bg-sky-50 border-2 border-sky-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">
              Program Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Managed By</p>
                <p className="text-neutral-900 font-semibold">
                  {String(createdBy?.name || "One World Hands")}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Started</p>
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
          <section className="bg-linear-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-white mb-10">
            <h2 className="text-2xl font-bold mb-3">Support This Program</h2>
            <p className="mb-6 text-sky-100">
              Your donation directly helps us continue this vital work and expand
              our impact in the community.
            </p>
            <Link
              href="/donation-funds"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-bold text-sky-600 hover:bg-sky-50 transition-all hover:scale-105"
            >
              💝 Donate Now
            </Link>
          </section>

          {/* Resources Link */}
          <section className="border-2 border-neutral-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">
              Learn More
            </h2>
            <p className="text-neutral-700 mb-4">
              Check out our resources section for more information, case studies, and
              impact reports related to this program.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-2.5 text-white font-semibold hover:bg-sky-700 transition-all hover:scale-105"
            >
              📚 View Resources →
            </Link>
          </section>
        </article>

        {/* Related Programs */}
        {relatedPrograms.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Similar Programs
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPrograms.map((relatedProgram) => {
                const relatedIcon = categoryIcons[String(relatedProgram.category)];
                return (
                  <Link
                    key={String(relatedProgram._id)}
                    href={`/programs/${relatedProgram._id}`}
                    className="group rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-md hover:shadow-lg hover:border-sky-400 transition-all"
                  >
                    <div className="text-3xl mb-3">{relatedIcon}</div>
                    <h3 className="font-bold text-neutral-900 group-hover:text-sky-600 transition-colors">
                      {String(relatedProgram.title)}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
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
            className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-neutral-900 font-semibold hover:bg-neutral-200 transition-all"
          >
            ← Explore All Programs
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
