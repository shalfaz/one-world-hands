"use client";

import { useState } from "react";
import { submitContactMessage } from "@/app/contact/actions";
import { useLanguage } from "@/context/LanguageContext";

type MessageKey =
  | "nameRequired"
  | "emailInvalid"
  | "messageTooShort"
  | "sendSuccess"
  | "sendError";

type Status =
  | { kind: "idle" }
  | { kind: "error"; messageKey: MessageKey }
  | { kind: "success"; messageKey: MessageKey };

export default function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const [sending, setSending] = useState(false);

  return (
    <form
      className="grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (sending) return;
        setStatus({ kind: "idle" });

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();

        if (trimmedName.length < 2) {
          setStatus({ kind: "error", messageKey: "nameRequired" });
          return;
        }
        if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
          setStatus({ kind: "error", messageKey: "emailInvalid" });
          return;
        }
        if (trimmedMessage.length < 10) {
          setStatus({
            kind: "error",
            messageKey: "messageTooShort",
          });
          return;
        }

        setSending(true);
        try {
          await submitContactMessage(trimmedName, trimmedEmail, trimmedMessage);
          setStatus({
            kind: "success",
            messageKey: "sendSuccess",
          });
          setName("");
          setEmail("");
          setMessage("");
        } catch {
          setStatus({
            kind: "error",
            messageKey: "sendError",
          });
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor="contact-name" className="text-sm font-semibold text-neutral-900">
            {t.contact.form.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="h-11 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-neutral-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#009EDB]/30 focus:border-[#009EDB]"
            placeholder={t.contact.form.namePlaceholder}
            required
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="contact-email" className="text-sm font-semibold text-neutral-900">
            {t.contact.form.emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
            className="h-11 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-neutral-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#009EDB]/30 focus:border-[#009EDB]"
            placeholder={t.contact.form.emailPlaceholder}
            required
          />
        </div>
      </div>

      <div className="grid gap-1">
        <label htmlFor="contact-message" className="text-sm font-semibold text-neutral-900">
          {t.contact.form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="rounded-lg border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-neutral-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#009EDB]/30 focus:border-[#009EDB]"
          placeholder={t.contact.form.messagePlaceholder}
          required
        />
      </div>

      {status.kind === "error" && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {t.contact.form.messages[status.messageKey]}
        </p>
      )}

      {status.kind === "success" && (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-[#17634B]">
          {t.contact.form.messages[status.messageKey]}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:cursor-not-allowed disabled:bg-[#009EDB]/40"
        >
          {t.contact.form.submitButton}
        </button>

        <p className="text-xs leading-5 text-neutral-600">
          {t.contact.form.responseNote}
        </p>
      </div>
    </form>
  );
}
