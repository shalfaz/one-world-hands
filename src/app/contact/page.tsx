import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Contact One World Hands | Get in Touch - Partnerships & Volunteering",
  description:
    "Contact One World Hands for partnerships, volunteering opportunities, donations, or questions. Reach out to join our humanitarian mission.",
  keywords:
    "contact One World Hands, NGO contact, volunteer, partnership, donation inquiry, humanitarian organization",
  openGraph: {
    title: "Contact Us | One World Hands",
    description:
      "Get in touch with One World Hands for partnerships, volunteering, or support.",
    url: "https://oneworldhands.org/contact",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
              Get in touch
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70] sm:text-4xl">
              Contact
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
              Reach out for partnerships, volunteering, or questions about our
              donation funds and programs.
            </p>
          </section>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            {/* Contact form */}
            <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-[#174A70]">
                Send a message
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                We’ll respond within 2–3 days. This demo form doesn’t send data yet.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </section>

            {/* Contact info */}
            <aside className="rounded-2xl border border-[#D9E2EC] bg-[#F7FAFC] p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-[#174A70]">
                Get in touch
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Email
                  </p>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">
                    <a
                      className="underline underline-offset-4 decoration-[#D9E2EC] hover:decoration-[#009EDB]"
                      href="mailto:hello@oneworldhands.org"
                    >
                      hello@oneworldhands.org
                    </a>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    Partnerships and general inquiries.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Phone
                  </p>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">
                    <a
                      className="underline underline-offset-4 decoration-[#D9E2EC] hover:decoration-[#009EDB]"
                      href="tel:+10000000000"
                    >
                      +1 (000) 000-0000
                    </a>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    Placeholder number for future updates.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Address
                  </p>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">
                    City, Country (Placeholder)
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    We coordinate with community partners locally.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <p className="text-sm font-semibold text-neutral-900">
                  Social media
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#D9E2EC] bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB]"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#D9E2EC] bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB]"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#D9E2EC] bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB]"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#D9E2EC] bg-white px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB]"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Volunteer / partnership CTA */}
          <section className="mt-10">
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-8 lg:col-span-1">
                <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                  Volunteer with us
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  Help support community outreach and learning sessions. We’ll
                  contact you with next steps.
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                  >
                    Partner / Volunteer
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D9E2EC] bg-[#F7FAFC] p-6 sm:p-8 lg:col-span-2">
                <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                  Partnership opportunities
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  Are you a community group, educator, or supporter looking to
                  collaborate? We welcome thoughtful partnerships aligned with
                  dignity-first outcomes.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/programs"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[#D9E2EC] bg-white px-6 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                  >
                    Explore Programs
                  </Link>
                  <Link
                    href="/donation-funds"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
                  >
                    Support with Donations
                  </Link>
                </div>
              </div>
            </div>
          </section>
      </div>
    </PageShell>
  );
}

