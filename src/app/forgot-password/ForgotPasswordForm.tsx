'use client';

import { useState } from 'react';
import { forgotPasswordAction } from './actions';

export default function ForgotPasswordForm() {
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
          text: result.message || 'Password reset email sent! Check your inbox.',
        });
        setEmail('');
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'An error occurred. Please try again.',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#365b47]">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full rounded-lg border border-[#dce5de] px-4 py-3 text-sm outline-none transition focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#176345] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#104b34] disabled:cursor-not-allowed disabled:bg-[#94b7a0]"
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
