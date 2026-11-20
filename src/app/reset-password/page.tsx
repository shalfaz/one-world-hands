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
        <div className="flex min-h-[65vh] items-center justify-center bg-[#f1f5f0] px-4 py-12">
          <div className="w-full max-w-md rounded-2xl border border-[#dce5de] bg-white p-7 text-center sm:p-8">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[#183b2c]">Invalid Reset Link</h1>
            <p className="mb-6 text-sm leading-6 text-[#65766b]">
              The password reset link is missing or invalid. Please request a new one.
            </p>
            <a href="/forgot-password" className="font-semibold text-[#176345] hover:text-[#104b34]">
              Request New Reset Link
            </a>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="flex min-h-[65vh] items-center justify-center bg-[#f1f5f0] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#dce5de] bg-white p-7 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-[#183b2c]">Reset Password</h1>
            <p className="text-sm leading-6 text-[#65766b]">
              Enter your new password below.
            </p>
          </div>

          <ResetPasswordForm token={token} email={email} />

          <div className="mt-6 text-center">
            <a href="/login" className="text-sm font-semibold text-[#176345] hover:text-[#104b34]">
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
