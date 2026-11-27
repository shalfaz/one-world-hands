'use client';

import { useState } from 'react';
import { resetPasswordAction } from '../forgot-password/actions';
import { useLanguage } from '@/context/LanguageContext';

interface ResetPasswordFormProps {
  token: string;
  email: string;
}

export default function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!password || !confirmPassword) {
      setMessage({
        type: 'error',
        text: t.auth.signup.errors.missing,
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: t.auth.signup.errors.mismatch,
      });
      return;
    }

    if (password.length < 8) {
      setMessage({
        type: 'error',
        text: t.auth.signup.errors.shortPassword,
      });
      return;
    }

    setLoading(true);

    try {
      const result = await resetPasswordAction(token, email, password);

      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message,
        });
        setPassword('');
        setConfirmPassword('');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: result.message,
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
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#174A70]">
          {t.auth.fields.newPassword}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.auth.placeholders.passwordMin}
          required
          className="w-full rounded-lg border border-[#D9E2EC] px-4 py-3 text-sm outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-[#174A70]">
          {t.auth.fields.confirmPassword}
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t.auth.placeholders.reenterPassword}
          required
          className="w-full rounded-lg border border-[#D9E2EC] px-4 py-3 text-sm outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full whitespace-nowrap rounded-full bg-[#009EDB] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] disabled:cursor-not-allowed disabled:bg-[#009EDB]/40"
      >
        {loading ? t.auth.resetPassword.resetting : t.auth.resetPassword.resetButton}
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
