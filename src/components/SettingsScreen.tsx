import { ArrowLeft, Bell, Globe, Lock, Eye, Moon, Sun, Volume2, User, Shield, Info, ChevronRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { useState, useEffect } from 'react';

interface SettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onDarkModeChange?: (isDark: boolean) => void;
}

export function SettingsScreen({ onBack, onNavigate, onDarkModeChange }: SettingsScreenProps) {
  // Load settings from localStorage or use defaults
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('metaia_settings');
    return saved ? JSON.parse(saved) : {
      darkMode: false,
      notifications: true,
      sound: true,
      showReviews: true
    };
  });

  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Save to localStorage whenever settings change
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    
    localStorage.setItem('metaia_settings', JSON.stringify(settings));
    
    // Notify parent of dark mode change
    if (onDarkModeChange) {
      onDarkModeChange(settings.darkMode);
    }
    
    setShowSaveMessage(true);
    const timer = setTimeout(() => setShowSaveMessage(false), 2000);
    return () => clearTimeout(timer);
  }, [settings, onDarkModeChange]);

  const toggleSetting = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [settings.darkMode]);

  const isDark = settings.darkMode;

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

      {/* Save Message */}
      {showSaveMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
          ✓ Settings Saved
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => onNavigate('home')} 
            className={`${isDark ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'} hover:text-[#D4AF37] transition-colors`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="w-6"></div>
        </div>
        
        <h1 className={`text-2xl font-serif ${isDark ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'} mt-4`}>Settings</h1>
        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#7A1F1F]/70'} mt-1`}>
          Customize your experience
        </p>
      </div>

      {/* Settings List */}
      <div className="relative z-10 px-6 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="space-y-4">
          
          {/* Appearance */}
          <div className={`${
            isDark ? 'bg-white/10 border-[#D4AF37]/30' : 'bg-white/80 border-[#D4AF37]/20'
          } backdrop-blur-sm rounded-3xl p-5 border-2 shadow-md transition-colors`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                Appearance
              </h2>
            </div>
            
            <div className="space-y-4">
              {/* Dark Mode */}
              <div className={`flex items-center justify-between p-4 rounded-2xl ${
                isDark ? 'bg-white/5' : 'bg-white/70'
              }`}>
                <div className="flex items-center gap-3">
                  {isDark ? (
                    <Moon className="w-5 h-5 text-[#D4AF37]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[#D4AF37]" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                      Dark Mode
                    </p>
                    <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#7A1F1F]/60'}`}>
                      {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('darkMode')}
                  className={`relative w-14 h-7 rounded-full transition-all shadow-inner ${
                    isDark ? 'bg-[#D4AF37]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${
                    isDark ? 'left-8' : 'left-1'
                  }`}>
                    {isDark ? (
                      <Moon className="w-3 h-3 text-[#D4AF37] absolute top-1 left-1" />
                    ) : (
                      <Sun className="w-3 h-3 text-gray-400 absolute top-1 left-1" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className={`${
            isDark ? 'bg-white/10 border-[#D4AF37]/30' : 'bg-white/80 border-[#D4AF37]/20'
          } backdrop-blur-sm rounded-3xl p-5 border-2 shadow-md transition-colors`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                Notifications
              </h2>
            </div>
            
            <div className="space-y-3">
              {/* Push Notifications */}
              <div className={`flex items-center justify-between p-4 rounded-2xl ${
                isDark ? 'bg-white/5' : 'bg-white/70'
              }`}>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                      Push Notifications
                    </p>
                    <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#7A1F1F]/60'}`}>
                      Order updates & offers
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('notifications')}
                  className={`relative w-14 h-7 rounded-full transition-all shadow-inner ${
                    settings.notifications ? 'bg-[#D4AF37]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${
                    settings.notifications ? 'left-8' : 'left-1'
                  }`}></div>
                </button>
              </div>

              {/* Sound */}
              <div className={`flex items-center justify-between p-4 rounded-2xl ${
                isDark ? 'bg-white/5' : 'bg-white/70'
              } ${!settings.notifications ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                      Sound
                    </p>
                    <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#7A1F1F]/60'}`}>
                      Notification sounds
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('sound')}
                  disabled={!settings.notifications}
                  className={`relative w-14 h-7 rounded-full transition-all shadow-inner ${
                    settings.sound && settings.notifications ? 'bg-[#D4AF37]' : 'bg-gray-300'
                  } ${!settings.notifications ? 'cursor-not-allowed' : ''}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${
                    settings.sound && settings.notifications ? 'left-8' : 'left-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className={`${
            isDark ? 'bg-white/10 border-[#D4AF37]/30' : 'bg-white/80 border-[#D4AF37]/20'
          } backdrop-blur-sm rounded-3xl p-5 border-2 shadow-md transition-colors`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                Privacy
              </h2>
            </div>
            
            <div className="space-y-3">
              {/* Show Profile */}
              <div className={`flex items-center justify-between p-4 rounded-2xl ${
                isDark ? 'bg-white/5' : 'bg-white/70'
              }`}>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                      Public Reviews
                    </p>
                    <p className={`text-xs ${isDark ? 'text-white/50' : 'text-[#7A1F1F]/60'}`}>
                      {settings.showReviews ? 'Reviews are public' : 'Reviews are private'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('showReviews')}
                  className={`relative w-14 h-7 rounded-full transition-all shadow-inner ${
                    settings.showReviews ? 'bg-[#D4AF37]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${
                    settings.showReviews ? 'left-8' : 'left-1'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* About & Links */}
          <div className={`${
            isDark ? 'bg-white/10 border-[#D4AF37]/30' : 'bg-white/80 border-[#D4AF37]/20'
          } backdrop-blur-sm rounded-3xl p-5 border-2 shadow-md transition-colors`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                More
              </h2>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('help')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                  isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#D4AF37]" />
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                    Help & Support
                  </span>
                </div>
                <ChevronRight className={`w-5 h-5 transition-colors ${
                  isDark ? 'text-white/40 group-hover:text-[#D4AF37]' : 'text-[#7A1F1F]/40 group-hover:text-[#D4AF37]'
                }`} />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                  isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-[#D4AF37]" />
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#7A1F1F]'}`}>
                    About METAIA
                  </span>
                </div>
                <ChevronRight className={`w-5 h-5 transition-colors ${
                  isDark ? 'text-white/40 group-hover:text-[#D4AF37]' : 'text-[#7A1F1F]/40 group-hover:text-[#D4AF37]'
                }`} />
              </button>
            </div>
          </div>

          {/* App Version */}
          <div className="bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] rounded-3xl p-6 text-center shadow-lg">
            <p className="text-white/70 text-sm mb-1">METAIA Version</p>
            <p className="text-3xl font-bold text-[#D4AF37]">1.0.0</p>
            <p className="text-white/50 text-xs mt-3">© 2026 METAIA. All rights reserved.</p>
          </div>

        </div>
      </div>
    </div>
  );
}