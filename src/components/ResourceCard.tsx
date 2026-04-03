import Link from "next/link";

type ResourceCardType = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  previewUrl?: string;
  accent: {
    bg: string;
    text: string;
  };
};

export default function ResourceCard({
  resource,
  categoryLabelOverride,
}: {
  resource: ResourceCardType;
  categoryLabelOverride?: string;
}) {
  const hasPreview = Boolean(resource.previewUrl);

  return (
    <article
      className={[
        "group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:shadow-md",
        resource.accent.bg,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {categoryLabelOverride ?? resource.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
            {resource.title}
          </h3>
        </div>

        <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-neutral-200">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${resource.accent.text}`}
            fill="none"
          >
            <path
              d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M14 3v5h5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {hasPreview && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <img
            src={resource.previewUrl}
            alt={resource.title}
            className="h-56 w-full object-cover"
          />
        </div>
      )}

      <p className="mt-4 text-sm leading-6 text-neutral-700">
        {resource.description}
      </p>

      <div className="mt-6">
        <Link
          href={resource.href || "#"}
          target={resource.href?.startsWith("http") ? "_blank" : undefined}
          rel={resource.href?.startsWith("http") ? "noreferrer" : undefined}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          aria-label={`Open ${resource.category}: ${resource.title}`}
        >
          View
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-sky-700"
            fill="none"
          >
            <path
              d="M5 12h12M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}