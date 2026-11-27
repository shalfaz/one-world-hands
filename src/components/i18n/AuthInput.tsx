"use client";

import type { InputHTMLAttributes } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/context/i18n-utils";

type AuthInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> & {
  placeholderKey: TranslationKey;
};

export default function AuthInput({ placeholderKey, ...props }: AuthInputProps) {
  const { tr } = useLanguage();
  return <input {...props} placeholder={tr(placeholderKey)} />;
}
