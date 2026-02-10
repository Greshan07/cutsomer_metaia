import { Home, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'orders' | 'profile';
  onNavigate: (screen: string) => void;
  isDarkMode?: boolean;
}

export function BottomNav({ activeTab, onNavigate, isDarkMode = false }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', screen: 'home' },
    { id: 'orders', icon: ShoppingBag, label: 'Orders', screen: 'orders' },
    { id: 'profile', icon: User, label: 'Profile', screen: 'profile' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    onNavigate(item.screen);
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 ${
        isDarkMode 
          ? 'bg-[#1a0a0a]/95 border-t border-[#D4AF37]/20' 
          : 'bg-white/95 border-t border-[#D4AF37]/30'
      } backdrop-blur-lg shadow-2xl`}
      style={{ 
        paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
        paddingTop: '8px'
      }}
    >
      <div className="flex justify-around items-center px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? isDarkMode
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] scale-110'
                    : 'bg-[#7A1F1F]/10 text-[#7A1F1F] scale-110'
                  : isDarkMode
                    ? 'text-white/60 hover:text-[#D4AF37] hover:scale-105'
                    : 'text-[#7A1F1F]/60 hover:text-[#7A1F1F] hover:scale-105'
              }`}
            >
              <Icon 
                className={`transition-all duration-300 ${
                  isActive ? 'w-6 h-6' : 'w-5 h-5'
                }`} 
              />
              <span className={`text-[10px] font-semibold transition-all ${
                isActive ? 'opacity-100' : 'opacity-70'
              }`}>
                {item.label}
              </span>
              
              {/* Active Indicator Dot */}
              {isActive && (
                <div className={`absolute bottom-0 w-1 h-1 rounded-full ${
                  isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#7A1F1F]'
                } animate-pulse`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
