'use client';

import { useState } from 'react';
import { forgotPasswordAction } from './actions';
import { useLanguage } from '@/context/LanguageContext';

export default function ForgotPasswordForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const result = await forgotPasswordAction(email);
      
      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message || t.auth.forgotPassword.defaultSuccess,
        });
        setEmail('');
      } else {
        setMessage({
          type: 'error',
          text: result.message || t.auth.forgotPassword.defaultError,
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: t.auth.common.unexpectedError,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#174A70]">
          {t.auth.fields.emailAddress}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.auth.placeholders.yourEmail}
          required
          className="w-full rounded-lg border border-[#D9E2EC] px-4 py-3 text-sm outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full whitespace-nowrap rounded-full bg-[#009EDB] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:cursor-not-allowed disabled:bg-[#009EDB]/40"
      >
        {loading ? t.auth.forgotPassword.sending : t.auth.forgotPassword.sendResetLink}
      </button>

      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-[#17634B] border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
