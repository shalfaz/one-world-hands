import Link from "next/link";

export default function CTASection() {
  return (
    <section aria-labelledby="get-involved-title" className="my-12 sm:my-16 lg:my-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white px-6 py-12 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.28)] sm:px-10 sm:py-14 lg:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-100 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-14 h-48 w-48 rounded-full bg-emerald-100 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Join Us
              </div>

              <h2
                id="get-involved-title"
                className="mt-5 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl"
              >
                Get Involved: Make Support Feel Like Home
              </h2>

              <p className="mt-4 text-base leading-8 text-neutral-700">
                Whether you donate, volunteer, or share our updates, you help us
                build dignity-first outcomes. Join a community of people making
                humanitarian support happen.
              </p>

              <ul className="mt-8 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-600" aria-hidden="true" />
                  <span className="text-base font-medium text-neutral-800">Help fund programs and emergency response.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                  <span className="text-base font-medium text-neutral-800">Volunteer support and community outreach pathways.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-600" aria-hidden="true" />
                  <span className="text-base font-medium text-neutral-800">Stay informed with transparent learning notes.</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5">
                <div className="grid gap-3 sm:gap-4">
                  <Link
                    href="/donation-funds"
                    className="inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-8 text-base font-semibold text-white transition-all hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-base font-semibold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                  >
                    Volunteer
                  </Link>
                  <Link
                    href="/updates"
                    className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-base font-semibold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                  >
                    Get Updates
                  </Link>
                </div>

                <p className="mt-5 border-t border-slate-200 pt-4 text-sm font-medium leading-6 text-slate-600">
                  We only use your email for NGO communications. No spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

