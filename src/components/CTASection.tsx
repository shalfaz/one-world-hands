import Link from "next/link";

export default function CTASection() {
  return (
    <section aria-labelledby="get-involved-title" className="my-12 sm:my-16 lg:my-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border-2 border-sky-300 bg-linear-to-br from-sky-50 via-white to-emerald-50 px-6 py-12 shadow-xl sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-linear-to-br from-sky-200 to-blue-300 opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-linear-to-br from-emerald-200 to-green-300 opacity-20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2
                id="get-involved-title"
                className="text-3xl font-bold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-800 to-neutral-700 bg-clip-text text-transparent sm:text-4xl"
              >
                🤝 Get Involved: Make Support Feel Like Home
              </h2>
              <p className="mt-4 text-base leading-8 text-neutral-700">
                Whether you donate, volunteer, or share our updates, you help us
                build dignity-first outcomes. Join a community of people making
                humanitarian support happen.
              </p>

              <ul className="mt-8 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-600 text-white ring-2 ring-green-200 shrink-0 shadow-md">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-base font-medium text-neutral-800">Help fund programs and emergency response.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-white ring-2 ring-sky-200 shrink-0 shadow-md">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-base font-medium text-neutral-800">Volunteer support and community outreach pathways.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-indigo-400 to-purple-600 text-white ring-2 ring-indigo-200 shrink-0 shadow-md">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-base font-medium text-neutral-800">Stay informed with transparent learning notes.</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="grid gap-3 sm:gap-4">
                <Link
                  href="/donation-funds"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-600 to-blue-600 px-8 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  💰 Donate Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-sky-300 bg-white px-8 text-base font-bold text-sky-700 shadow-md transition-all hover:shadow-lg hover:bg-sky-50 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  🙋 Volunteer
                </Link>
                <Link
                  href="/updates"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-neutral-300 bg-white px-8 text-base font-bold text-neutral-900 transition-all hover:shadow-lg hover:bg-neutral-50 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  📬 Get Updates
                </Link>
              </div>

              <p className="mt-6 text-sm font-medium leading-6 text-neutral-600">
                ✨ We only use your email for NGO communications. No spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

