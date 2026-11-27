import { Metadata } from 'next';
import ForgotPasswordForm from './ForgotPasswordForm';
import PageShell from '@/components/PageShell';
import T from '@/components/T';

export const metadata: Metadata = {
  title: 'Forgot Password | One World Hands',
  description: 'Reset your password',
};

export default function ForgotPasswordPage() {
  return (
    <PageShell>
      <div className="flex min-h-[65vh] items-center justify-center bg-[#F7FAFC] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#D9E2EC] bg-white p-7 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-[#174A70]"><T k="auth.forgotPassword.title" /></h1>
            <p className="text-sm leading-6 text-[#627D98]">
              <T k="auth.forgotPassword.subtitle" />
            </p>
          </div>

          <ForgotPasswordForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-[#627D98]">
              <T k="auth.forgotPassword.rememberPassword" />{' '}
              <a href="/login" className="font-semibold text-[#174A70] hover:text-[#009EDB]">
                <T k="auth.forgotPassword.signInHere" />
              </a>
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] p-4">
            <p className="text-sm leading-6 text-[#475569]">
              <strong><T k="auth.forgotPassword.demoLabel" /></strong> <T k="auth.forgotPassword.demoText" />
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
