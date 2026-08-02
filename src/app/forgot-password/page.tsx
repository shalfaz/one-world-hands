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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <ForgotPasswordForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Remember your password?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in here
              </a>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Demo:</strong> Use your registered email address. A reset link will be sent to your inbox.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
