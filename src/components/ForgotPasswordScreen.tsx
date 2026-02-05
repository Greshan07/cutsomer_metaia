import { useState } from 'react';
import { Mail, ArrowLeft, Lock } from 'lucide-react';
import { authAPI } from '../services/api';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function ForgotPasswordScreen({ onBack, onSuccess }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendOTP = async () => {
    if (!phoneOrEmail.trim()) {
      setError('Please enter your phone number or email');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await authAPI.sendOTP(phoneOrEmail);
      setSuccessMessage('OTP sent successfully!');
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await authAPI.verifyOTP({ phone: phoneOrEmail, otp });
      setSuccessMessage('OTP verified successfully!');
      setStep('reset');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await authAPI.resetPassword({
        phone: phoneOrEmail,
        otp: otp,
        newPassword: newPassword
      });
      setSuccessMessage('Password reset successfully!');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] p-6 flex flex-col relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #7A1F1F 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all shadow-md mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-[#7A1F1F]" />
        </button>
        <h1 className="text-3xl font-serif text-[#7A1F1F] mb-2">Forgot Password</h1>
        <p className="text-sm text-[#7A1F1F]/70">
          {step === 'email' && 'Enter your phone number or email to receive OTP'}
          {step === 'otp' && 'Enter the OTP sent to your phone/email'}
          {step === 'reset' && 'Create a new password for your account'}
        </p>
      </div>

      {/* Form Content */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="space-y-5">
          {/* Success Message */}
          {successMessage && (
            <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-300 animate-fade-in">
              <p className="text-sm text-green-600 font-medium">✓ {successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 animate-fade-in">
              <p className="text-sm text-red-600 font-medium">⚠️ {error}</p>
            </div>
          )}

          {/* Step 1: Email/Phone Input */}
          {step === 'email' && (
            <>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Phone number or Email"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 text-[#7A1F1F] placeholder-[#7A1F1F]/40"
                />
              </div>

              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending OTP...
                  </span>
                ) : (
                  'Send OTP'
                )}
              </button>
            </>
          )}

          {/* Step 2: OTP Input */}
          {step === 'otp' && (
            <>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 text-[#7A1F1F] placeholder-[#7A1F1F]/40 text-center text-2xl tracking-widest"
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </span>
                ) : (
                  'Verify OTP'
                )}
              </button>

              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full text-sm text-[#7A1F1F] hover:text-[#D4AF37] transition-colors"
              >
                Didn't receive OTP? Resend
              </button>
            </>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 text-[#7A1F1F] placeholder-[#7A1F1F]/40"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 text-[#7A1F1F] placeholder-[#7A1F1F]/40"
                />
              </div>

              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Resetting...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
