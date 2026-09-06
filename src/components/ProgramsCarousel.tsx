"use client";

import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import HomeProgramCard from "@/components/HomeProgramCard";
import type { Program } from "@/types/ngo";

export default function ProgramsCarousel({
  programs,
}: {
  programs: Program[];
}) {
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
            className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
          >
            Ongoing Programs
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
          <div className="flex select-none">
            {programs.map((program) => (
              <div
                key={program.id}
                className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <div className="h-full">
                  <HomeProgramCard program={program} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/programs"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            Explore All Programs
          </a>
        </div>
      </div>
    </section>
  );
}