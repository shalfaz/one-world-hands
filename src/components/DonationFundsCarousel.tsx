"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import FundCard from "@/components/FundCard";
import { useLanguage } from "@/context/LanguageContext";

type CarouselFund = {
  id: string;
  name: string;
  description: string;
  href: string;
  accent: {
    bg: string;
    ring: string;
    text: string;
    gradientFrom: string;
    gradientTo: string;
  };
};

export default function DonationFundsCarousel({
  funds,
}: {
  funds: CarouselFund[];
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

  if (!funds?.length) return null;

  return (
    <section aria-labelledby="funds-title">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div>
          <h2
            id="funds-title"
            className="text-2xl font-semibold tracking-tight text-[#174A70] sm:text-3xl"
          >
            {t.home.fundsCarousel.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
            {t.home.fundsCarousel.subtitle}
          </p>
        </div>

        <div
          className="mt-8 cursor-grab select-none overflow-hidden [touch-action:pan-y] active:cursor-grabbing"
          ref={emblaRef}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          onTouchStart={stopAutoplay}
          onTouchEnd={startAutoplay}
        >
          <div className="flex items-stretch select-none">
            {funds.map((fund) => (
              <div
                key={fund.id}
                className="flex min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <div className="h-full w-full">
                  <FundCard fund={fund} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/donation-funds"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-6 py-3 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
          >
            {t.home.fundsCarousel.exploreAll}
          </Link>
        </div>
      </div>
    </section>
  );
}