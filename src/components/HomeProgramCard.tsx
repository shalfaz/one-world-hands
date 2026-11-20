import Link from "next/link";
import Image from "next/image";
import type { Program } from "@/types/ngo";

export default function HomeProgramCard({ program }: { program: Program }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#dce5de] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c5d8c8] hover:shadow-[0_18px_42px_-30px_rgba(24,59,44,0.38)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#edf2ed]">
        {program.imageUrl ? (
          <Image
            src={program.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br ${program.accent.gradientFrom} ${program.accent.gradientTo}`}
          >
            <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border border-white/25" />
            <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full border border-white/20" />
            <div className="h-20 w-20 rounded-full border border-white/35 bg-white/10" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 text-left sm:p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#183b2c]">
          {program.title}
        </h3>

        <div className="mt-2">
          <span
            className="inline-flex items-center rounded-full bg-[#edf5ef] px-3 py-1 text-xs font-semibold text-[#45624e]"
          >
            {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-6 text-[#5b6d62]">
          {program.description}
        </p>

        <p className="mt-3 text-xs font-medium text-neutral-500">
          {program.location}
        </p>

        <div className="mt-5 pt-1">
          <Link
            href={program.href}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#176345] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#104b34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176345] focus-visible:ring-offset-2"
            aria-label={`Learn more about ${program.title}`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
}