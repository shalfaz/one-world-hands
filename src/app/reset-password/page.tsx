import { Metadata } from 'next';
import ResetPasswordForm from './ResetPasswordForm';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Reset Password | One World Hands',
  description: 'Reset your password',
};

interface ResetPasswordPageProps {
  searchParams: { token?: string; email?: string };
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token, email } = searchParams;

  if (!token || !email) {
    return (
      <PageShell>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-2">Invalid Reset Link</h1>
            <p className="text-gray-600 mb-6">
              The password reset link is missing or invalid. Please request a new one.
            </p>
            <a href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-semibold">
              Request New Reset Link
            </a>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600">
              Enter your new password below.
            </p>
          </div>

          <ResetPasswordForm token={token} email={email} />

          <div className="mt-6 text-center">
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
