import Link from "next/link";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  health: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  education: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  community: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  livelihood: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  relief: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  other: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
  },
};

const categoryIcons: Record<string, string> = {
  health: "🏥",
  education: "📚",
  community: "👥",
  livelihood: "💼",
  relief: "🆘",
  other: "📌",
};

export default function ProgramCard({
  program,
}: {
  program: Record<string, unknown>;
}) {
  const category = String(program.category || "other");
  const colors = categoryColors[category];
  const icon = categoryIcons[category];

  return (
    <Link href={`/programs/${program._id}`}>
      <div className="group h-full cursor-pointer overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-sky-400">
        {/* Header with icon and category */}
        <div className={`${colors.bg} px-6 py-4`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 group-hover:text-sky-600 transition-colors">
                {icon} {String(program.title)}
              </h3>
            </div>
          </div>
          <div className={`mt-3 inline-flex rounded-full ${colors.bg} border-2 ${colors.border} px-3 py-1`}>
            <span className={`text-xs font-semibold ${colors.text}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-neutral-600 line-clamp-2">
            {String(program.description)}
          </p>

          {/* Location */}
          <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
            <span>📍</span>
            <span>{String(program.location)}</span>
          </div>

          {/* Footer with date */}
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-neutral-100">
            <span className="text-xs text-neutral-500">
              {new Date(String(program.createdAt)).toLocaleDateString()}
            </span>
            <span className="text-sky-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
              Learn More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
