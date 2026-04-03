"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import FundCard from "@/components/FundCard";

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
            className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
          >
            Donation Funds
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-700">
            Let&apos;s Make Change Together
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
          <div className="flex select-none">
            {funds.map((fund) => (
              <div
                key={fund.id}
                className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <div className="h-full">
                  <FundCard fund={fund} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/donation-funds"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            Explore All Donation Funds
          </Link>
        </div>
      </div>
    </section>
  );
}