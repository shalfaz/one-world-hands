"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FundsListSection({
  children,
}: {
  children: ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <section className="mt-10" aria-label={t.funds.list.listAriaLabel}>
      {children}
    </section>
  );
}
