import Link from "next/link";

function Illustration() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky-200/60 via-green-100/60 to-white blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
        <div className="p-8">
          

          <div className="mt-6 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-green-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">
              Magic touch, real-world support.
            </p>
            <p className="mt-1 text-sm leading-6 text-neutral-600">
              We work alongside communities with dignity-first, evidence-led
              programs.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3">
            {[
              { label: "Rapid response", color: "text-sky-700" },
              { label: "Education & skills", color: "text-green-700" },
              { label: "Health & wellbeing", color: "text-indigo-700" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-gradient-to-r from-neutral-50 to-white px-4 py-3"
              >
                <p className={`text-sm font-medium ${row.color}`}>{row.label}</p>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white ring-1 ring-neutral-200">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-neutral-700"
                    fill="none"
                  >
                    <path
                      d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>

        <div className="pointer-events-none absolute inset-0 opacity-70">
          <svg
            aria-hidden="true"
            viewBox="0 0 500 300"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              d="M-20,220 C80,140 140,270 240,200 C320,150 390,80 520,130 L520,330 L-20,330 Z"
              fill="url(#g)"
            />
            <circle cx="420" cy="70" r="22" fill="#22c55e" opacity="0.10" />
            <circle cx="90" cy="80" r="18" fill="#38bdf8" opacity="0.10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="max-w-xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
            Trustworthy, community-led humanitarian support
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl"
          >
            One World Hands
          </h1>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-sky-800 sm:text-3xl">
            For the World, with a Magic Touch.
          </h2>

          <p className="mt-4 text-base leading-7 text-neutral-700 sm:text-lg">
            Where magic hands unite, wonders arise: we empower individuals
            and support communities through direct action, education, and
            collaboration......
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/about-us"
              className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Know More
            </Link>
            <Link
              href="/programs"
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Explore Programs
            </Link>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Dignity-first", v: "Every step guided by respect" },
              { k: "Community-led", v: "Partners help shape outcomes" },
              { k: "Accountable", v: "Clear reporting & learning" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  {item.k}
                </dt>
                <dd className="mt-1 text-sm font-medium text-neutral-800">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>

        </div>

        <div className="lg:justify-self-end">
          <Illustration />
        </div>
      </div>
    </section>
  );
}

