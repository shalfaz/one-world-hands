'use server';

import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/lib/models/User';
import crypto from 'crypto';

interface ForgotPasswordResult {
  success: boolean;
  message: string;
}

export async function forgotPasswordAction(email: string): Promise<ForgotPasswordResult> {
  try {
    // Validate email
    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Please provide a valid email address.',
      };
    }

    // Connect to database
    await connectToDatabase().catch((err) => {
      throw new Error(`Database connection failed: ${err.message}`);
    });

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if email exists (security best practice)
      return {
        success: true,
        message:
          'If an account exists with this email, you will receive a password reset link shortly.',
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    // Save reset token to user
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // In production, send email with reset link
    // For now, we'll log it to console
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    
    console.log(`
    ✅ Password Reset Link Generated:
    Email: ${email}
    Reset Link: ${resetLink}
    Token: ${resetToken}
    Expires in: 1 hour
    `);

    return {
      success: true,
      message:
        'If an account exists with this email, you will receive a password reset link shortly.',
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      success: false,
      message: 'An error occurred while processing your request. Please try again later.',
    };
  }
}

export async function resetPasswordAction(
  token: string,
  email: string,
  newPassword: string
): Promise<ForgotPasswordResult> {
  try {
    // Validate inputs
    if (!token || !email || !newPassword) {
      return {
        success: false,
        message: 'Missing required fields.',
      };
    }

    if (newPassword.length < 8) {
      return {
        success: false,
        message: 'Password must be at least 8 characters long.',
      };
    }

    // Connect to database
    await connectToDatabase();

    // Hash the token
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordToken: resetTokenHash,
      resetPasswordExpiry: { $gt: new Date() },
    });

    if (!user) {
      return {
        success: false,
        message: 'Invalid or expired reset link. Please request a new one.',
      };
    }

    // Hash and update password
    const { hashPassword } = await import('@/lib/password');
    user.password = hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    return {
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.',
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      success: false,
      message: 'An error occurred while resetting your password. Please try again later.',
    };
  }
}
