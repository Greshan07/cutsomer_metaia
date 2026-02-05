import { ArrowLeft, Crown, Scissors, Users, Award, MapPin, Mail, Phone, Globe, Heart, Sparkles, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { useState, useEffect } from 'react';

interface AboutScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function AboutScreen({ onBack, onNavigate }: AboutScreenProps) {
  // Check if dark mode is enabled
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('metaia_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setIsDark(settings.darkMode || false);
    }
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-[#1a0a0a] via-[#2d1515] to-[#1a0a0a]' 
        : 'bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37]'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, ${isDark ? '#D4AF37' : '#7A1F1F'} 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack} 
            className={`${isDark ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'} hover:text-[#D4AF37] transition-colors`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="w-12 h-12 object-contain"
          />
          <div className="w-6"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="space-y-5">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] rounded-3xl p-8 text-center shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center shadow-lg">
                <Crown className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#D4AF37] mb-2">METAIA</h1>
            <p className="text-white/90 text-sm leading-relaxed">
              Royal Tailoring Excellence Since 2020
            </p>
            <div className="flex justify-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
          </div>

          {/* Our Story */}
          <div className={`${
            isDark ? 'bg-white/10 border-[#D4AF37]/30' : 'bg-white/80 border-[#D4AF37]/20'
          } backdrop-blur-sm rounded-3xl p-6 border-2 shadow-md transition-colors`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-serif font-semibold ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                Our Story
              </h2>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-[#7A1F1F]/80'}`}>
              METAIA was born from a vision to revolutionize the traditional tailoring industry by blending 
              timeless craftsmanship with modern technology. We connect skilled master tailors with customers 
              who appreciate the art of bespoke clothing, creating a seamless bridge between tradition and innovation.
            </p>
          </div>

          {/* What We Offer */}
          <div className={`${
            isDark ? 'bg-white/10 border-[#D4AF37]/30' : 'bg-white/80 border-[#D4AF37]/20'
          } backdrop-blur-sm rounded-3xl p-6 border-2 shadow-md transition-colors`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-serif font-semibold ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                What We Offer
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Scissors className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                    Custom Tailoring
                  </h3>
                  <p className={`text-xs leading-relaxed mt-1 ${isDark ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>
                    Bespoke garments tailored to your exact measurements and preferences
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                    Verified Master Tailors
                  </h3>
                  <p className={`text-xs leading-relaxed mt-1 ${isDark ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>
                    Connect with skilled artisans who bring decades of expertise
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                    Premium Quality
                  </h3>
                  <p className={`text-xs leading-relaxed mt-1 ${isDark ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>
                    We guarantee exceptional craftsmanship in every stitch
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                    Royal Experience
                  </h3>
                  <p className={`text-xs leading-relaxed mt-1 ${isDark ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>
                    Luxurious service from consultation to final fitting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className={`${
            isDark ? 'bg-white/10 border-[#D4AF37]/30' : 'bg-white/80 border-[#D4AF37]/20'
          } backdrop-blur-sm rounded-3xl p-6 border-2 shadow-md transition-colors`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-serif font-semibold ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                Our Mission
              </h2>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-[#7A1F1F]/80'}`}>
              To preserve and promote the heritage of traditional tailoring while making it accessible 
              to everyone through cutting-edge technology. We believe every individual deserves clothing 
              that fits perfectly and reflects their unique personality.
            </p>
          </div>

          {/* Contact Information */}
          <div className={`${
            isDark ? 'bg-white/10 border-[#D4AF37]/30' : 'bg-white/80 border-[#D4AF37]/20'
          } backdrop-blur-sm rounded-3xl p-6 border-2 shadow-md transition-colors`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-serif font-semibold ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                Contact Us
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p className={`text-sm ${isDark ? 'text-white/80' : 'text-[#7A1F1F]/80'}`}>
                  123 Fashion Street, Tailoring District, Mumbai 400001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p className={`text-sm ${isDark ? 'text-white/80' : 'text-[#7A1F1F]/80'}`}>
                  +91 98765 43210
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p className={`text-sm ${isDark ? 'text-white/80' : 'text-[#7A1F1F]/80'}`}>
                  support@metaia.in
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p className={`text-sm ${isDark ? 'text-white/80' : 'text-[#7A1F1F]/80'}`}>
                  www.metaia.in
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`${
              isDark ? 'bg-white/10' : 'bg-white/80'
            } backdrop-blur-sm rounded-2xl p-4 text-center shadow-md`}>
              <p className="text-2xl font-bold text-[#D4AF37]">500+</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>
                Master Tailors
              </p>
            </div>
            <div className={`${
              isDark ? 'bg-white/10' : 'bg-white/80'
            } backdrop-blur-sm rounded-2xl p-4 text-center shadow-md`}>
              <p className="text-2xl font-bold text-[#D4AF37]">50K+</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>
                Happy Customers
              </p>
            </div>
            <div className={`${
              isDark ? 'bg-white/10' : 'bg-white/80'
            } backdrop-blur-sm rounded-2xl p-4 text-center shadow-md`}>
              <p className="text-2xl font-bold text-[#D4AF37]">4.9</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-white/70' : 'text-[#7A1F1F]/70'}`}>
                Average Rating
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] rounded-3xl p-6 text-center shadow-lg">
            <p className="text-white/90 text-sm font-medium mb-2">
              Crafting Excellence, One Stitch at a Time
            </p>
            <p className="text-white/50 text-xs">
              © 2026 METAIA. All rights reserved.
            </p>
            <p className="text-[#D4AF37] text-xs mt-2 font-medium">
              Version 1.0.0
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}