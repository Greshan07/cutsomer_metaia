import { useState } from 'react';
import { User, Phone, Mail, Lock, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { authAPI } from '../services/api';

interface RegistrationScreenProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function RegistrationScreen({ onRegister, onNavigateToLogin }: RegistrationScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: '',
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError('');
    
    try {
      const response = await authAPI.register({
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        password: formData.password,
      });

      console.log('Registration successful:', response.data.user);
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        onRegister();
      }, 1500);
    } catch (error: any) {
      console.error('Registration error:', error);
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] p-6 overflow-y-auto relative">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, #7A1F1F 50px, #7A1F1F 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, #7A1F1F 50px, #7A1F1F 51px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-[#D4AF37]/10"></div>

      {/* Logo and Title */}
      <div className="text-center mt-12 mb-6 relative z-10">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-xl opacity-30 scale-110"></div>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="relative w-20 h-20 object-contain mx-auto mb-3 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] filter brightness-105"
            style={{ mixBlendMode: 'normal' }}
          />
        </div>
        <h1 className="text-2xl font-serif text-[#7A1F1F] mb-1">Create Account</h1>
        <p className="text-xs text-[#7A1F1F]/70">Join METAIA today</p>
      </div>

      {/* Registration Form */}
      <div className="space-y-4 relative z-10 pb-8">
        {/* Full Name */}
        <div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] placeholder-[#7A1F1F]/40"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-600 text-xs mt-1 ml-4">{errors.fullName}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] placeholder-[#7A1F1F]/40"
            />
          </div>
          {errors.mobile && (
            <p className="text-red-600 text-xs mt-1 ml-4">{errors.mobile}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] placeholder-[#7A1F1F]/40"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-xs mt-1 ml-4">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] placeholder-[#7A1F1F]/40"
            />
          </div>
          {errors.password && (
            <p className="text-red-600 text-xs mt-1 ml-4">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1F1F] w-5 h-5" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#D4AF37]/30 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#D4AF37] transition-all text-[#7A1F1F] placeholder-[#7A1F1F]/40"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs mt-1 ml-4">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative mt-1">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded border-2 border-[#D4AF37]/50 bg-white/80 peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] transition-all flex items-center justify-center">
                {formData.agreeToTerms && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </div>
            <span className="text-xs text-[#7A1F1F]/80 leading-relaxed">
              I agree to the{' '}
              <span className="text-[#7A1F1F] font-semibold hover:text-[#D4AF37] transition-colors">
                Terms & Conditions
              </span>{' '}
              and{' '}
              <span className="text-[#7A1F1F] font-semibold hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </span>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-600 text-xs mt-1 ml-4">{errors.agreeToTerms}</p>
          )}
        </div>

        {/* API Error Message */}
        {apiError && (
          <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 animate-fade-in">
            <p className="text-sm text-red-600 font-medium">⚠️ {apiError}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-300 animate-fade-in">
            <p className="text-sm text-green-600 font-medium">✅ {successMessage}</p>
          </div>
        )}

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Registering...
            </span>
          ) : (
            'Register'
          )}
        </button>

        {/* Login Link */}
        <div className="text-center mt-4">
          <span className="text-[#7A1F1F]/70 text-sm">Already have an account? </span>
          <button
            onClick={onNavigateToLogin}
            className="text-[#7A1F1F] font-semibold hover:text-[#D4AF37] transition-colors text-sm"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}