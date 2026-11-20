"use client";

import { useState } from "react";
import { submitContactMessage } from "@/app/contact/actions";

type Status =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string };

export default function ContactForm() {
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
          setStatus({ kind: "error", message: "Please enter your name." });
          return;
        }
        if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
          setStatus({ kind: "error", message: "Please enter a valid email address." });
          return;
        }
        if (trimmedMessage.length < 10) {
          setStatus({
            kind: "error",
            message: "Please include a short message (at least 10 characters).",
          });
          return;
        }

        setSending(true);
        try {
          await submitContactMessage(trimmedName, trimmedEmail, trimmedMessage);
          setStatus({
            kind: "success",
            message: "Thanks for reaching out. We will respond within 2-3 days.",
          });
          setName("");
          setEmail("");
          setMessage("");
        } catch {
          setStatus({
            kind: "error",
            message: "Something went wrong while sending your message. Please try again.",
          });
        } finally {
          setSending(false);
        }
      }}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor="contact-name" className="text-sm font-semibold text-neutral-900">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="h-11 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-neutral-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#009EDB]/30 focus:border-[#009EDB]"
            placeholder="Your name"
            required
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="contact-email" className="text-sm font-semibold text-neutral-900">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
            className="h-11 rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-neutral-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#009EDB]/30 focus:border-[#009EDB]"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-1">
        <label htmlFor="contact-message" className="text-sm font-semibold text-neutral-900">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="rounded-lg border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-neutral-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#009EDB]/30 focus:border-[#009EDB]"
          placeholder="Tell us how we can help—donations, volunteering, or partnerships."
          required
        />
      </div>

      {status.kind === "error" && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {status.message}
        </p>
      )}

      {status.kind === "success" && (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-[#17634B]">
          {status.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#009EDB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:cursor-not-allowed disabled:bg-[#009EDB]/40"
        >
          Send Message
        </button>

        <p className="text-xs leading-5 text-neutral-600">
          We will respond within 2-3 days.
        </p>
      </div>
    </form>
  );
}
