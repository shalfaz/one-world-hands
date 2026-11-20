import { Metadata } from 'next';
import ForgotPasswordForm from './ForgotPasswordForm';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Forgot Password | One World Hands',
  description: 'Reset your password',
};

export default function ForgotPasswordPage() {
  return (
    <PageShell>
      <div className="flex min-h-[65vh] items-center justify-center bg-[#f1f5f0] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#dce5de] bg-white p-7 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-[#183b2c]">Forgot Password?</h1>
            <p className="text-sm leading-6 text-[#65766b]">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <ForgotPasswordForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-[#65766b]">
              Remember your password?{' '}
              <a href="/login" className="font-semibold text-[#176345] hover:text-[#104b34]">
                Sign in here
              </a>
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-[#dce5de] bg-[#f6f8f5] p-4">
            <p className="text-sm leading-6 text-[#52645a]">
              <strong>Demo:</strong> Use your registered email address. A reset link will be sent to your inbox.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
