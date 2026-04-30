import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getPublishedResources } from "@/lib/services/resourceService";
import React from "react";

const typeIcons: Record<string, string> = {
  photo: "📷",
  document: "📄",
  blog: "📝",
  report: "📊",
  webinar: "🎥",
};

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  photo: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
  },
  document: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  blog: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  report: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },
  webinar: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const resources = await getPublishedResources();
  const resource = resources.find((r) => r._id === id);

  if (!resource) {
    return {
      title: "Resource Not Found",
      description: "The resource you are looking for does not exist.",
    };
  }

  return {
    title: `${String(resource.title)} | One World Hands Resources`,
    description: String(resource.description),
    openGraph: {
      title: `${String(resource.title)} | One World Hands Resources`,
      description: String(resource.description),
      url: `https://oneworldhands.org/resources/${resource._id}`,
    },
  };
};

export const generateStaticParams = async () => {
  const resources = await getPublishedResources();
  return resources.map((resource) => ({
    id: String(resource._id),
  }));
};

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resources = await getPublishedResources();
  const resource = resources.find((r) => r._id === id);

  if (!resource) {
    notFound();
  }

  const type = String(resource.type || "other");
  const colors = typeColors[type] || typeColors.document;
  const icon = typeIcons[type] || "📌";
  const createdBy = resource.createdBy as Record<string, unknown>;
  const createdDate = new Date(String(resource.createdAt));

  // Get related resources (same type)
  const relatedResources = resources
    .filter((r) => r.type === type && r._id !== resource._id)
    .slice(0, 4);

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-8"
        >
          ← Back to Resources
        </Link>

        {/* Main Content */}
        <article className="rounded-3xl border-2 border-neutral-200 bg-white p-8 shadow-lg sm:p-10">
          {/* Header */}
          <div className={`${colors.bg} rounded-2xl p-8 mb-8 border-2 ${colors.border}`}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="text-5xl">{icon}</div>
              <div className={`rounded-full ${colors.bg} border-2 ${colors.border} px-4 py-2 ${colors.text} font-semibold whitespace-nowrap`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
              {String(resource.title)}
            </h1>
          </div>

          {/* Meta Information */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600 font-semibold">Created By</p>
              <p className="text-lg text-neutral-900 mt-1">
                {String(createdBy?.name || "One World Hands")}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600 font-semibold">Published</p>
              <p className="text-lg text-neutral-900 mt-1">
                {createdDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Description */}
          {resource.description && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                About This Resource
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {String(resource.description)}
              </p>
            </section>
          )}

          {/* Content for Blog */}
          {type === "blog" && resource.content && (
            <section className="mb-10 rounded-xl bg-slate-50 border-2 border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Blog Content
              </h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                  {String(resource.content)}
                </p>
              </div>
            </section>
          )}

          {/* File Download for Documents */}
          {type === "document" && resource.fileUrl && (
            <section className="mb-10 rounded-xl bg-sky-50 border-2 border-sky-200 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                📥 Download Document
              </h2>
              <p className="text-neutral-700 mb-4">
                Access the {String(resource.fileType || "document").toUpperCase()} file:
              </p>
              <a
                href={String(resource.fileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-8 py-3 text-white font-semibold hover:bg-sky-700 transition-all hover:scale-105"
              >
                📄 Download {String(resource.fileType || "File").toUpperCase()}
              </a>
            </section>
          )}

          {/* YouTube for Webinar */}
          {type === "webinar" && resource.youtubeLink && (
            <section className="mb-10 rounded-xl overflow-hidden border-2 border-red-200">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 px-8 pt-8">
                🎥 Watch Webinar
              </h2>
              <div className="relative w-full pb-[56.25%] h-0 overflow-hidden">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYouTubeEmbedUrl(String(resource.youtubeLink))}
                  title={String(resource.title)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-8">
                <a
                  href={String(resource.youtubeLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold"
                >
                  Watch on YouTube →
                </a>
              </div>
            </section>
          )}

          {/* Photo Display */}
          {type === "photo" && resource.fileUrl && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                📷 Photo Gallery
              </h2>
              <div className="rounded-xl overflow-hidden border-2 border-sky-200 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={String(resource.fileUrl)}
                  alt={String(resource.title)}
                  className="w-full h-auto object-cover max-h-96"
                  loading="lazy"
                />
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="bg-linear-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-white mb-10">
            <h2 className="text-2xl font-bold mb-3">Learn More About Our Work</h2>
            <p className="mb-6 text-sky-100">
              Explore more resources and discover how we&apos;re making an impact in
              communities worldwide.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-bold text-sky-600 hover:bg-sky-50 transition-all hover:scale-105"
            >
              Browse All Resources
            </Link>
          </section>
        </article>

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Related {type.charAt(0).toUpperCase() + type.slice(1)}s
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedResources.map((relatedResource) => (
                <Link
                  key={String(relatedResource._id)}
                  href={`/resources/${relatedResource._id}`}
                  className="group rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-md hover:shadow-lg hover:border-sky-400 transition-all"
                >
                  <div className="text-3xl mb-3">
                    {typeIcons[String(relatedResource.type)] || "📌"}
                  </div>
                  <h3 className="font-bold text-neutral-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {String(relatedResource.title)}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2">
                    {new Date(String(relatedResource.createdAt)).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to all resources */}
        <div className="mt-12 text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-neutral-900 font-semibold hover:bg-neutral-200 transition-all"
          >
            ← Explore All Resources
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

// Helper function to convert YouTube URL to embed URL
function getYouTubeEmbedUrl(url: string): string {
  try {
    // Handle different YouTube URL formats
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  } catch {
    return url;
  }
}
