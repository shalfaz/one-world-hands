import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getPublishedResources } from "@/lib/services/resourceService";
import React from "react";
import {
  FaArrowRight,
  FaFile,
  FaFileArrowDown,
  FaFileLines,
  FaPhotoFilm,
  FaVideo,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const typeIcons: Record<string, IconType> = {
  photo: FaPhotoFilm,
  document: FaFileLines,
  blog: FaFileLines,
  report: FaFileLines,
  webinar: FaVideo,
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
  const colors = { bg: "bg-[#EAF6FB]", text: "text-[#174A70]" };
  const ResourceIcon = typeIcons[type] || FaFile;
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
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#174A70] transition-colors hover:text-[#009EDB]"
        >
          ← Back to Resources
        </Link>

        {/* Main Content */}
        <article className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-9">
          {/* Header */}
          <div className="mb-8 rounded-xl bg-[#F7FAFC] p-6 sm:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#009EDB] shadow-sm">
                <ResourceIcon aria-hidden="true" className="text-lg" />
              </span>
              <div className={`rounded-full px-3 py-1.5 text-xs font-semibold ${colors.bg} ${colors.text}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
              {String(resource.title)}
            </h1>
          </div>

          {/* Meta Information */}
          <div className="mb-8 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Created by</p>
              <p className="mt-2 text-sm font-medium text-neutral-900">
                {String(createdBy?.name || "One World Hands")}
              </p>
            </div>
            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Published</p>
              <p className="mt-2 text-sm font-medium text-neutral-900">
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
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-[#174A70]">
                About This Resource
              </h2>
              <p className="text-base leading-7 text-[#475569] whitespace-pre-wrap">
                {String(resource.description)}
              </p>
            </section>
          )}

          {/* Content for Blog */}
          {type === "blog" && resource.content && (
            <section className="mb-10 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-6 sm:p-8">
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-[#174A70]">
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
            <section className="mb-10 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-6 sm:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold tracking-tight text-[#174A70]">
                <FaFileArrowDown aria-hidden="true" className="text-[#009EDB]" />
                Download Document
              </h2>
              <p className="text-neutral-700 mb-4">
                Access the {String(resource.fileType || "document").toUpperCase()} file:
              </p>
              <a
                href={String(resource.fileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be]"
              >
                Download {String(resource.fileType || "File").toUpperCase()}
              </a>
            </section>
          )}

          {/* YouTube for Webinar */}
          {type === "webinar" && resource.youtubeLink && (
            <section className="mb-10 overflow-hidden rounded-xl border border-[#D9E2EC]">
              <h2 className="mb-4 px-6 pt-6 text-xl font-semibold tracking-tight text-[#174A70] sm:px-8 sm:pt-8">
                Watch Webinar
              </h2>
              <div className="relative h-0 w-full overflow-hidden pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYouTubeEmbedUrl(String(resource.youtubeLink))}
                  title={String(resource.title)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 sm:p-8">
                <a
                  href={String(resource.youtubeLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#174A70] hover:text-[#009EDB]"
                >
                  Watch on YouTube →
                </a>
              </div>
            </section>
          )}

          {/* Photo Display */}
          {type === "photo" && resource.fileUrl && (
            <section className="mb-10">
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-[#174A70]">
                Photo Gallery
              </h2>
              <div className="overflow-hidden rounded-xl border border-[#D9E2EC]">
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
          <section className="mb-10 rounded-xl bg-[#174A70] p-6 text-white sm:p-8">
            <h2 className="mb-3 text-xl font-semibold">Learn More About Our Work</h2>
            <p className="mb-6 max-w-2xl text-sm leading-6 text-white/75">
              Explore more resources and discover how we&apos;re making an impact in
              communities worldwide.
            </p>
            <Link
              href="/resources"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#EAF6FB] px-6 text-sm font-semibold text-[#174A70] transition-colors hover:bg-white"
            >
              Browse All Resources <FaArrowRight aria-hidden="true" className="text-xs" />
            </Link>
          </section>
        </article>

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#174A70]">
              Related {type.charAt(0).toUpperCase() + type.slice(1)}s
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedResources.map((relatedResource) => (
                <Link
                  key={String(relatedResource._id)}
                  href={`/resources/${relatedResource._id}`}
                  className="group rounded-xl border border-[#D9E2EC] bg-white p-5 transition-all hover:border-[#009EDB] hover:shadow-md"
                >
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF6FB] text-[#009EDB]">
                    {React.createElement(typeIcons[String(relatedResource.type)] || FaFile, { "aria-hidden": true })}
                  </span>
                  <h3 className="line-clamp-2 font-semibold text-[#174A70] transition-colors group-hover:text-[#009EDB]">
                    {String(relatedResource.title)}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#D9E2EC] bg-white px-6 py-3 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB]"
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
