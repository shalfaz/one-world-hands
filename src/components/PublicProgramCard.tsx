import Link from "next/link";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

const categoryColors: Record<
  string,
  { bg: string; text: string; border: string; gradientFrom: string; gradientTo: string }
> = {
  health: {
  bg: "bg-rose-50",
  text: "text-rose-700",
  border: "border-rose-200",
  gradientFrom: "from-rose-400",
  gradientTo: "to-rose-600",
  },
  education: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    gradientFrom: "from-sky-400",
    gradientTo: "to-sky-600",
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
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#dce5de] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c5d8c8] hover:shadow-[0_18px_42px_-30px_rgba(24,59,44,0.38)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#edf2ed]">
          {program.imageUrl ? (
            <Image
              src={String(program.imageUrl)}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden="true"
              className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br ${colors.gradientFrom} ${colors.gradientTo}`}
            >
              <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-white/25" />
              <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border border-white/20" />
              <div className="h-20 w-20 rounded-full border border-white/35 bg-white/10" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 text-left sm:p-6">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#183b2c]">
            {String(program.title)}
          </h3>

          <div className="mt-2">
            <span
              className={`inline-flex items-center rounded-full ${colors.bg} ${colors.text} px-3 py-1 text-xs font-semibold`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-[#5b6d62]">
            {String(program.description)}
          </p>

          <p className="mt-3 flex items-center gap-2 text-xs font-medium text-neutral-500">
            <FaLocationDot aria-hidden="true" className="text-[#668570]" />
            {String(program.location)}
          </p>

          <p className="mt-2 text-xs text-neutral-500">
            {new Date(String(program.createdAt)).toLocaleDateString()}
          </p>

          <div className="mt-5 pt-1">
            <span             className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#176345] px-6 text-sm font-semibold text-white transition-colors group-hover:bg-[#104b34]">
              Learn More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
