import Link from "next/link";
import { FaHandshake, FaHeartPulse, FaGraduationCap, FaChartLine } from "react-icons/fa6";
import { MdGroupWork } from "react-icons/md";

function Illustration() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-sky-200/60 via-green-100/60 to-white blur-2xl" />
      <div className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-lg">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <FaHandshake className="text-3xl text-sky-600" />
            <h3 className="text-lg font-bold text-neutral-900">Our Impact</h3>
          </div>

          <div className="mt-6 rounded-2xl bg-linear-to-br from-sky-50 via-white to-green-50 p-4 sm:p-6">
            <p className="text-sm font-semibold text-neutral-900">
              Magic touch, real-world support.
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              We work alongside communities with dignity-first, evidence-led
              programs that create lasting change.
            </p>
          </div>
        </div>
        <div className="space-y-3 px-6 sm:px-8 pb-6 sm:pb-8">
            {[
              { label: "Rapid response", icon: FaChartLine, color: "text-sky-700", bg: "bg-sky-50" },
              { label: "Education & skills", icon: FaGraduationCap, color: "text-green-700", bg: "bg-green-50" },
              { label: "Health & wellbeing", icon: FaHeartPulse, color: "text-indigo-700", bg: "bg-indigo-50" },
            ].map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`text-lg ${row.color}`} />
                    <p className={`text-sm font-medium ${row.color}`}>{row.label}</p>
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-sky-100 to-green-100 ring-1 ring-neutral-200">
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
              );
            })}
          </div>

        <div className="pointer-events-none absolute inset-0 opacity-40">
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
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-green-200/20 rounded-full blur-3xl" />
      
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-12 sm:px-6 lg:gap-12 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:shadow-md transition-shadow">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Trustworthy, community-led humanitarian support
          </div>

          {/* Main heading */}
          <h1
            id="hero-title"
            className="mt-6 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl"
          >
            One World<span className="block text-sky-600">Hands</span>
          </h1>

          {/* Subheading */}
          <h2 className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-neutral-700 sm:text-balance">
            For the World, with a <span className="text-sky-600">Magic Touch.</span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-base leading-8 text-neutral-600 sm:text-lg sm:leading-8">
            Where magic hands unite, wonders arise. We empower individuals and support communities through direct action, education, and collaboration with dignity-first approaches.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/about-us"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-md hover:shadow-lg hover:bg-sky-700 transition-all active:scale-95"
            >
              <FaHandshake className="text-lg" />
              Know More
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neutral-300 bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-neutral-900 hover:border-sky-600 hover:text-sky-600 hover:bg-sky-50 transition-all"
            >
              <FaChartLine className="text-lg" />
              Explore Programs
            </Link>
          </div>

          {/* Stats/Features Grid */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:gap-6">
            {[
              { 
                label: "Dignity-first", 
                description: "Every step guided by respect",
                icon: FaHandshake
              },
              { 
                label: "Community-led", 
                description: "Partners help shape outcomes",
                icon: MdGroupWork
              },
              { 
                label: "Accountable", 
                description: "Clear reporting & learning",
                icon: FaChartLine
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group rounded-xl border border-neutral-200 bg-linear-to-br from-white to-neutral-50 px-4 sm:px-5 py-5 sm:py-6 hover:shadow-lg hover:border-sky-200 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="text-lg text-sky-600 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-600 group-hover:text-sky-600">
                      {item.label}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Illustration Section */}
        <div className="lg:justify-self-end w-full max-w-md mx-auto lg:max-w-none">
          <Illustration />
        </div>
      </div>
    </section>
  );
}

