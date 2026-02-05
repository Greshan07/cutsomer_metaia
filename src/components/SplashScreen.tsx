import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { Sparkles } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F5E6D3] via-[#D4AF37] to-[#C5A028] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7A1F1F]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#D4AF37]/20 to-transparent"></div>
      
      {/* Subtle pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(122,31,31,0.03) 35px, rgba(122,31,31,0.03) 70px)`
      }}></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* METAIA Logo with enhanced animation */}
        <div className="relative animate-[float_3s_ease-in-out_infinite] mb-8">
          <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-3xl opacity-40 scale-110 animate-pulse"></div>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="relative w-48 h-48 object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.6)] filter brightness-105"
            style={{ mixBlendMode: 'normal' }}
          />
          
          {/* Sparkle decorations */}
          <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-white animate-pulse" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-white/70 animate-pulse delay-500" />
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl font-serif font-bold text-[#7A1F1F] mb-3 tracking-wider animate-[fadeInUp_0.8s_ease-out] drop-shadow-lg">
          METAIA
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-[#7A1F1F]/80 font-light mb-8 animate-[fadeInUp_1s_ease-out] text-center px-8">
          Your Perfect Fit Awaits
        </p>

        {/* Loading indicator */}
        <div className="flex items-center gap-3 animate-[fadeInUp_1.2s_ease-out]">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#7A1F1F] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#7A1F1F] rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-[#7A1F1F] rounded-full animate-bounce delay-200"></div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex items-center gap-8 text-white/90 animate-[fadeInUp_1.4s_ease-out]">
          <div className="text-center">
            <p className="text-2xl font-bold">10K+</p>
            <p className="text-xs opacity-80">Happy Customers</p>
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-center">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-xs opacity-80">Expert Tailors</p>
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-center">
            <p className="text-2xl font-bold">4.8★</p>
            <p className="text-xs opacity-80">Rating</p>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#7A1F1F]/20 to-transparent"></div>
    </div>
  );
}