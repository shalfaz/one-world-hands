import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Privacy Policy | One World Hands",
  description:
    "How One World Hands handles personal information when you use our website, donate, or contact us.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#dce5de] bg-white p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">
            Your information
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#183b2c]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Last updated: March 2026. This policy describes how we treat
            information collected through this website. We may update it from
            time to time; the date above will reflect the latest revision.
          </p>

          <div className="mt-10 divide-y divide-[#e7ede7]">
          <section className="pb-7">
            <h2 className="text-lg font-semibold text-[#183b2c]">
              Information we may collect
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#52645a]">
              Depending on how you use our site, we may receive information you
              choose to provide (for example, when you contact us by email or
              through a form) such as your name, email address, and message
              content. If you donate through a third-party payment provider,
              that provider processes payment details according to their own
              policies; we do not store full card numbers on our web servers.
            </p>
          </section>

          <section className="py-7">
            <h2 className="text-lg font-semibold text-[#183b2c]">
              How we use information
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#52645a]">
              We use contact and donation-related information to respond to
              inquiries, acknowledge support, send updates you have opted into,
              and improve our programs and communications. We do not sell your
              personal information.
            </p>
          </section>

          <section className="py-7">
            <h2 className="text-lg font-semibold text-[#183b2c]">
              Cookies and analytics
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#52645a]">
              Our site may use essential cookies to operate securely. If we add
              optional analytics or marketing tools, we will describe them here
              and, where required, ask for your consent.
            </p>
          </section>

          <section className="py-7">
            <h2 className="text-lg font-semibold text-[#183b2c]">
              Your choices
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#52645a]">
              You may contact us to ask questions about this policy, to update
              your contact preferences, or to request reasonable access to
              personal information we hold in connection with this site.
            </p>
          </section>

          <section className="pt-7">
            <h2 className="text-lg font-semibold text-[#183b2c]">Contact</h2>
            <p className="mt-3 text-sm leading-7 text-[#52645a]">
              Questions about privacy:{" "}
              <a
                className="font-medium text-[#176345] underline-offset-4 hover:underline"
                href="mailto:hello@oneworldhands.org"
              >
                hello@oneworldhands.org
              </a>
            </p>
          </section>
        </div>
        </div>
      </div>
    </PageShell>
  );
}
