import Link from "next/link";
import {
  FaArrowRight,
  FaChartLine,
  FaGraduationCap,
  FaHandshake,
  FaHeartPulse,
} from "react-icons/fa6";
import { MdGroupWork } from "react-icons/md";

const commitments = [
  {
    label: "Dignity first",
    detail: "Every step guided by respect",
    icon: FaHandshake,
  },
  {
    label: "Community led",
    detail: "Local partners shape our work",
    icon: MdGroupWork,
  },
  {
    label: "Accountable",
    detail: "Clear reporting and learning",
    icon: FaChartLine,
  },
];

const areas = [
  { label: "Rapid response", icon: FaChartLine },
  { label: "Education and skills", icon: FaGraduationCap },
  { label: "Health and wellbeing", icon: FaHeartPulse },
];

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-[#D9E2EC] bg-[#F7FAFC]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9E2EC] bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-[#174A70]">
            <span className="h-2 w-2 rounded-full bg-[#009EDB]" aria-hidden="true" />
            Community-led humanitarian support
          </div>

          <h1
            id="hero-title"
            className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-[#174A70] sm:text-5xl lg:text-6xl"
          >
            One World Hands
          </h1>

          <p className="mt-5 max-w-xl text-xl font-medium leading-8 text-[#334E68] sm:text-2xl">
            For the World, with a{" "}
            <span className="text-[#009EDB]">Magic Touch.</span>
          </p>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#475569] sm:text-lg sm:leading-8">
            Where magic hands unite, wonders arise. We empower individuals and
            support communities through direct action, education, and
            collaboration with dignity-first approaches.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about-us"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
            >
              About our work
              <FaArrowRight aria-hidden="true" className="text-xs" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#D9E2EC] bg-white px-6 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
            >
              Explore programs
            </Link>
          </div>

          <ul className="mt-10 grid gap-4 border-t border-[#D9E2EC] pt-6 sm:grid-cols-3 sm:gap-5">
            {commitments.map(({ label, detail, icon: Icon }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 shrink-0 text-base text-[#009EDB]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#174A70]">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-[#627D98]">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside
          aria-label="Our impact"
          className="relative overflow-hidden rounded-2xl border border-[#D9E2EC] bg-white p-6 shadow-[0_24px_70px_-45px_rgba(23,74,112,0.25)] sm:p-8 lg:ml-auto lg:max-w-xl"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-[#009EDB]" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
            Our impact
          </p>
          <h2 className="mt-3 max-w-md text-2xl font-semibold leading-snug tracking-tight text-[#174A70] sm:text-3xl">
            Practical support, shaped around people.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-[#475569]">
            We work alongside communities with dignity-first, evidence-led
            programs that create lasting change.
          </p>

          <div className="mt-8 divide-y divide-[#D9E2EC] border-y border-[#D9E2EC]">
            {areas.map(({ label, icon: Icon }, index) => (
              <div key={label} className="flex items-center gap-4 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF6FB] text-[#009EDB]">
                  <Icon aria-hidden="true" />
                </span>
                <p className="flex-1 text-sm font-semibold text-[#174A70]">{label}</p>
                <span className="text-xs font-medium tabular-nums text-[#627D98]">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#EAF6FB] p-4">
            <FaHandshake className="mt-0.5 shrink-0 text-[#009EDB]" aria-hidden="true" />
            <p className="text-sm leading-6 text-[#475569]">
              Local insight guides our response, and learning helps us improve
              how we work.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
