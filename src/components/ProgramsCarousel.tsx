"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import HomeProgramCard from "@/components/HomeProgramCard";
import type { Program } from "@/types/ngo";
import { useLanguage } from "@/context/LanguageContext";

export default function ProgramsCarousel({
  programs,
}: {
  programs: Program[];
}) {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: false,
  });

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (!emblaApi) return;
    stopAutoplay();

    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  useEffect(() => {
    if (!emblaApi) return;

    startAutoplay();

    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("settle", startAutoplay);

    return () => {
      stopAutoplay();
    };
  }, [emblaApi]);

  return (
    <section aria-labelledby="programs-title">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div>
          <h2
            id="programs-title"
            className="text-2xl font-semibold tracking-tight text-[#174A70] sm:text-3xl"
          >
            {t.home.programsCarousel.title}
          </h2>
        </div>

        <div
          className="mt-8 overflow-hidden select-none [touch-action:pan-y] cursor-grab active:cursor-grabbing"
          ref={emblaRef}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          onTouchStart={stopAutoplay}
          onTouchEnd={startAutoplay}
        >
          <div className="flex items-stretch select-none">
            {programs.map((program) => (
              <div
                key={program.id}
                className="flex min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <div className="h-full w-full">
                  <HomeProgramCard program={program} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/programs"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-6 py-3 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
          >
            {t.home.programsCarousel.exploreAll}
          </Link>
        </div>
      </div>
    </section>
  );
}