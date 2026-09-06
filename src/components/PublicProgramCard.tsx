import Link from "next/link";

const categoryColors: Record<
  string,
  { bg: string; text: string; border: string; gradientFrom: string; gradientTo: string }
> = {
  health: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    gradientFrom: "from-red-400",
    gradientTo: "to-red-600",
  },
  education: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
  },
  community: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    gradientFrom: "from-green-400",
    gradientTo: "to-green-600",
  },
  livelihood: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600",
  },
  relief: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600",
  },
  other: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    gradientFrom: "from-slate-400",
    gradientTo: "to-slate-600",
  },
};

export default function ProgramCard({
  program,
}: {
  program: Record<string, unknown>;
}) {
  const category = String(program.category || "other");
  const colors = categoryColors[category] || categoryColors.other;

  return (
    <Link href={`/programs/${program._id}`}>
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
          <div
            aria-hidden="true"
            className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br ${colors.gradientFrom} ${colors.gradientTo}`}
          >
            <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-white/25" />
            <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border border-white/20" />
            <div className="h-20 w-20 rounded-full border border-white/35 bg-white/10" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 text-center">
          <h3 className="text-base font-bold leading-snug text-neutral-950 sm:text-lg">
            {String(program.title)}
          </h3>

          <div className="mt-2">
            <span
              className={`inline-flex items-center rounded-full ${colors.bg} ${colors.text} px-3 py-1 text-xs font-semibold`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-neutral-600">
            {String(program.description)}
          </p>

          <p className="mt-3 text-xs font-semibold text-neutral-500">
            {String(program.location)}
          </p>

          <p className="mt-2 text-xs text-neutral-500">
            {new Date(String(program.createdAt)).toLocaleDateString()}
          </p>

          <div className="mt-5 pt-1">
            <span className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#008744] px-6 text-sm font-bold uppercase tracking-wide text-white transition-colors group-hover:bg-[#006b36]">
              Learn More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
