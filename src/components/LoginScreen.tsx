import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { authAPI } from '../services/api';

interface LoginScreenProps {
  onLogin: (phone: string) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onNavigateToRegister, onNavigateToForgotPassword }: LoginScreenProps) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ emailOrPhone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = { emailOrPhone: '', password: '' };
    let isValid = true;

    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Mobile number or email is required';
      isValid = false;
    } else {
      // Check if it's a valid phone or email
      const isPhone = /^\d{10}$/.test(emailOrPhone);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhone);
      
      if (!isPhone && !isEmail) {
        newErrors.emailOrPhone = 'Please enter a valid mobile number (10 digits) or email';
        isValid = false;
      }
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError('');
    
    try {
      const response = await authAPI.login({
        phone: emailOrPhone,
        password: password,
      });

      console.log('Login successful:', response.data.user);
      // Success - proceed to home
      onLogin(emailOrPhone);
    } catch (error: any) {
      console.error('Login error:', error);
      setApiError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth - use dynamic URL based on current host
    const backendUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5000'
      : `http://${window.location.hostname}:5000`;
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  const handleAppleLogin = () => {
    // Redirect to backend Apple OAuth - use dynamic URL based on current host
    const backendUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5000'
      : `http://${window.location.hostname}:5000`;
    window.location.href = `${backendUrl}/api/auth/apple`;
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
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent"></div>

      {/* Logo */}
      <div className="text-center mt-16 mb-8 relative z-10 animate-[fadeIn_0.6s_ease-out]">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-2xl opacity-30 scale-110 animate-[pulse_3s_ease-in-out_infinite]"></div>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="relative w-24 h-24 object-contain mx-auto mb-4 drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] filter brightness-105 hover:scale-110 transition-transform duration-500"
            style={{ mixBlendMode: 'normal' }}
          />
        </div>
        <h1 className="text-3xl font-serif text-[#7A1F1F] mb-1">Welcome to METAIA</h1>
        <p className="text-sm text-[#7A1F1F]/70">Login to your account</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="space-y-5">
          {/* Mobile/Email Input */}
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5 transition-all" />
              <input
                type="text"
                placeholder="Mobile number or Email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 text-[#7A1F1F] placeholder-[#7A1F1F]/40"
              />
            </div>
            {errors.emailOrPhone && (
              <p className="text-red-600 text-xs mt-1 ml-4">{errors.emailOrPhone}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5 transition-all" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 text-[#7A1F1F] placeholder-[#7A1F1F]/40"
              />
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1 ml-4">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button 
              onClick={onNavigateToForgotPassword}
              type="button"
              className="text-sm text-[#7A1F1F] hover:text-[#D4AF37] transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 animate-fade-in">
              <p className="text-sm text-red-600 font-medium">⚠️ {apiError}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#7A1F1F]/20"></div>
            <span className="text-xs text-[#7A1F1F]/50">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-[#7A1F1F]/20"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Google Login */}
            <button 
              onClick={handleGoogleLogin}
              type="button"
              className="py-3.5 px-4 rounded-2xl bg-white border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-[#7A1F1F] group-hover:text-[#D4AF37] transition-colors">Google</span>
            </button>

            {/* Apple Login */}
            <button 
              onClick={handleAppleLogin}
              type="button"
              className="py-3.5 px-4 rounded-2xl bg-white border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md group">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="text-sm font-medium text-[#7A1F1F] group-hover:text-[#D4AF37] transition-colors">Apple</span>
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <span className="text-[#7A1F1F]/70 text-sm">New user? </span>
            <button
              onClick={onNavigateToRegister}
              className="text-[#7A1F1F] font-semibold hover:text-[#D4AF37] transition-colors text-sm"
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Ornamental Pattern at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
        <div className="flex justify-around items-center h-full">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-6 h-6 border-2 border-[#7A1F1F] rotate-45"></div>
          ))}
        </div>
      </div>
    </div>
  );
}