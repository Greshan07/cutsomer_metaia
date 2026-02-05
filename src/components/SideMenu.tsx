import { useState, useEffect } from 'react';
import { X, User, Package, History, Settings, HelpCircle, Info, LogOut, Mail, Phone, MapPin, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { authAPI } from '../services/api';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  isDarkMode?: boolean;
}

export function SideMenu({ isOpen, onClose, onNavigate, isDarkMode = false }: SideMenuProps) {
  const [customer, setCustomer] = useState({
    name: 'User',
    phone: '',
    email: '',
    address: 'Not set',
    totalOrders: 0
  });
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const user = authAPI.getCurrentUser();
    if (user) {
      setCustomer({
        name: user.name || 'User',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || 'Not set',
        totalOrders: user.totalOrders || 0
      });
      setProfileImage(user.profileImage || localStorage.getItem('profileImage') || '');
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
          onClick={onClose}
        ></div>
      )}

      {/* Side Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 shadow-2xl z-50 transform transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#1a0a0a] via-[#2d1515] to-[#1a0a0a]' 
            : 'bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37]'
        }`}
        style={{ 
          paddingTop: 'var(--safe-area-inset-top)',
          paddingBottom: 'var(--safe-area-inset-bottom)'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, ${isDarkMode ? '#D4AF37' : '#7A1F1F'} 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className={`p-6 border-b-2 ${isDarkMode ? 'border-[#D4AF37]/30' : 'border-[#D4AF37]/30'}`}>
            <div className="flex items-center justify-between mb-4">
              <ImageWithFallback 
                src={logo}
                alt="METAIA Logo"
                className="w-12 h-12 object-contain"
              />
              <button 
                onClick={onClose}
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-[#D4AF37] hover:text-white' 
                    : 'text-[#7A1F1F] hover:text-[#D4AF37]'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Customer Profile */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>{customer.name}</h3>
              </div>
            </div>
          </div>

          {/* Scrollable Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Customer Details Section */}
            <div className="mb-6">
              <h4 className={`text-xs font-semibold uppercase mb-3 px-2 ${
                isDarkMode ? 'text-white/50' : 'text-[#7A1F1F]/60'
              }`}>Customer Details</h4>
              <div className={`backdrop-blur-sm rounded-2xl p-4 space-y-3 border-2 ${
                isDarkMode 
                  ? 'bg-white/10 border-[#D4AF37]/30' 
                  : 'bg-white/80 border-[#D4AF37]/20'
              }`}>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] mt-0.5" />
                  <div>
                    <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-[#7A1F1F]/60'}`}>Phone</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] mt-0.5" />
                  <div>
                    <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-[#7A1F1F]/60'}`}>Email</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5" />
                  <div>
                    <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-[#7A1F1F]/60'}`}>Address</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>{customer.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Stats */}
            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] rounded-2xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70">Total Orders</p>
                    <p className="text-2xl font-bold">{customer.totalOrders}</p>
                  </div>
                  <Package className="w-8 h-8 text-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div className="space-y-2">
              <h4 className={`text-xs font-semibold uppercase mb-3 px-2 ${
                isDarkMode ? 'text-white/50' : 'text-[#7A1F1F]/60'
              }`}>Menu</h4>
              
              <button 
                onClick={() => {
                  onNavigate('profile');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105 active:scale-95' 
                    : 'bg-white/70 hover:bg-white/90 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                <User className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>My Profile</span>
              </button>

              <button 
                onClick={() => {
                  onNavigate('orders');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105 active:scale-95' 
                    : 'bg-white/70 hover:bg-white/90 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                <Package className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>My Orders</span>
              </button>

              <button 
                onClick={() => {
                  onNavigate('orderHistory');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105 active:scale-95' 
                    : 'bg-white/70 hover:bg-white/90 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                <History className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>Order History</span>
              </button>

              <button 
                onClick={() => {
                  onNavigate('reviews');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 group ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105 active:scale-95' 
                    : 'bg-white/70 hover:bg-white/90 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                <Star className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>My Reviews</span>
              </button>

              <button 
                onClick={() => {
                  onNavigate('settings');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all group ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 border-[#D4AF37]/30 hover:border-[#D4AF37]' 
                    : 'bg-white/70 hover:bg-white/90 border-[#D4AF37]/20 hover:border-[#D4AF37]'
                }`}
              >
                <Settings className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>Settings</span>
              </button>

              <button 
                onClick={() => {
                  onNavigate('help');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all group ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 border-[#D4AF37]/30 hover:border-[#D4AF37]' 
                    : 'bg-white/70 hover:bg-white/90 border-[#D4AF37]/20 hover:border-[#D4AF37]'
                }`}
              >
                <HelpCircle className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>Help & Support</span>
              </button>

              <button 
                onClick={() => {
                  onNavigate('about');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all group ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 border-[#D4AF37]/30 hover:border-[#D4AF37]' 
                    : 'bg-white/70 hover:bg-white/90 border-[#D4AF37]/20 hover:border-[#D4AF37]'
                }`}
              >
                <Info className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-[#7A1F1F]'}`}>About METAIA</span>
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className={`p-4 border-t-2 ${isDarkMode ? 'border-[#D4AF37]/30' : 'border-[#D4AF37]/30'}`}>
            <button 
              onClick={() => {
                authAPI.logout();
                onNavigate('login');
                onClose();
              }}
              className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-[#7A1F1F] hover:bg-[#5A1515] text-white transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}