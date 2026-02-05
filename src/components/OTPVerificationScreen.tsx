import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { authAPI } from '../services/api';

interface OTPVerificationScreenProps {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}

export function OTPVerificationScreen({ phone, onVerified, onBack }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authAPI.verifyOTP({ phone, otp: otpValue });
      onVerified();
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await authAPI.sendOTP(phone);
      setOtp(['', '', '', '', '', '']);
      setResendTimer(30);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] p-6 flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(30deg, #7A1F1F 12%, transparent 12.5%, transparent 87%, #7A1F1F 87.5%, #7A1F1F), linear-gradient(150deg, #7A1F1F 12%, transparent 12.5%, transparent 87%, #7A1F1F 87.5%, #7A1F1F)`,
          backgroundSize: '80px 140px'
        }}></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-[#7A1F1F] hover:text-[#D4AF37] transition-colors z-10"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Logo */}
      <div className="text-center mt-16 mb-8 relative z-10">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-2xl opacity-30 scale-110"></div>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="relative w-24 h-24 object-contain mx-auto mb-4 drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] filter brightness-105"
            style={{ mixBlendMode: 'normal' }}
          />
        </div>
        <h1 className="text-3xl font-serif text-[#7A1F1F] mb-2">Verify OTP</h1>
        <p className="text-sm text-[#7A1F1F]/70">
          Enter the 6-digit code sent to
        </p>
        <p className="text-sm text-[#7A1F1F] font-semibold mt-1">{phone}</p>
      </div>

      {/* OTP Input */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="space-y-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-semibold rounded-xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F]"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </span>
            ) : (
              'Verify'
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            {resendTimer > 0 ? (
              <p className="text-sm text-[#7A1F1F]/70">
                Resend OTP in {resendTimer}s
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isLoading}
                className="text-sm text-[#7A1F1F] font-semibold hover:text-[#D4AF37] transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}