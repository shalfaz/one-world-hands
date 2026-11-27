import PageShell from "@/components/PageShell";
import T from "@/components/T";

export const metadata = {
  title: "Privacy Policy | One World Hands",
  description:
    "How One World Hands handles personal information when you use our website, donate, or contact us.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
            <T k="privacy.eyebrow" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70]">
            <T k="privacy.title" />
          </h1>
          <p className="mt-3 text-sm leading-6 text-neutral-500">
            <T k="privacy.lastUpdated" />
          </p>

          <div className="mt-10 divide-y divide-[#D9E2EC]">
          <section className="pb-7">
            <h2 className="text-lg font-semibold text-[#174A70]">
              <T k="privacy.sections.collect.title" />
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#475569]">
              <T k="privacy.sections.collect.body" />
            </p>
          </section>

          <section className="py-7">
            <h2 className="text-lg font-semibold text-[#174A70]">
              <T k="privacy.sections.use.title" />
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#475569]">
              <T k="privacy.sections.use.body" />
            </p>
          </section>

          <section className="py-7">
            <h2 className="text-lg font-semibold text-[#174A70]">
              <T k="privacy.sections.cookies.title" />
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#475569]">
              <T k="privacy.sections.cookies.body" />
            </p>
          </section>

          <section className="py-7">
            <h2 className="text-lg font-semibold text-[#174A70]">
              <T k="privacy.sections.choices.title" />
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#475569]">
              <T k="privacy.sections.choices.body" />
            </p>
          </section>

          <section className="pt-7">
            <h2 className="text-lg font-semibold text-[#174A70]">
              <T k="privacy.sections.contact.title" />
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#475569]">
              <T k="privacy.sections.contact.lead" />{" "}
              <a
                className="font-medium text-[#009EDB] underline-offset-4 hover:underline"
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
