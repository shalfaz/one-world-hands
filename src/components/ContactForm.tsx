"use client";

import { useMemo, useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string };

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && email.trim().length > 3 && message.trim().length >= 10;
  }, [email, message, name]);

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
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

        setStatus({
          kind: "success",
          message: "Thanks for reaching out. We will respond within 2-3 days.",
        });
        setName("");
        setEmail("");
        setMessage("");
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
            className="h-11 rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            className="h-11 rounded-2xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
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
          className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
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
        <p className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-900">
          {status.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
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
