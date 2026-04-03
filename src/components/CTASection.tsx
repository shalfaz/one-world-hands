import Link from "next/link";

export default function CTASection() {
  return (
    <section aria-labelledby="get-involved-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-gradient-to-br from-sky-50 via-white to-green-50 px-6 py-10 shadow-sm sm:px-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2
                id="get-involved-title"
                className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl"
              >
                Get Involved: Make Support Feel Like Home
              </h2>
              <p className="mt-3 text-base leading-7 text-neutral-700">
                Whether you donate, volunteer, or share our updates, you help us
                build dignity-first outcomes. Join a community of people making
                humanitarian support happen.
              </p>

              <ul className="mt-6 space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-800 ring-1 ring-green-200">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
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
                  <span>Help fund programs and emergency response.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-800 ring-1 ring-sky-200">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
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
                  <span>Volunteer support and community outreach pathways.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-800 ring-1 ring-indigo-200">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
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
                  <span>Stay informed with transparent learning notes.</span>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="grid gap-3 sm:grid-cols-1">
                <Link
                  href="/donation-funds"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  Donate Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  Volunteer
                </Link>
                <Link
                  href="/updates"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  Get Updates
                </Link>
              </div>

              <p className="mt-4 text-xs leading-5 text-neutral-600">
                We only use your email for NGO communications. No spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

