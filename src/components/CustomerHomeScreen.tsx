import { Scissors, Menu, Bell, User, ChevronRight, Star, Heart, Sparkles, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/84082bc92cff37142f6dde0f419382ae7d6cc386.png';
import { useState, useEffect } from 'react';
import { SideMenu } from './SideMenu';
import { authAPI } from '../services/api';
import { BottomNav } from './BottomNav';
import { HowItWorks } from './HowItWorks';

interface CustomerHomeScreenProps {
  onStartOrder: (category: string, style: string) => void;
  onNavigate: (screen: string) => void;
  shouldOpenMenu?: boolean;
  onMenuOpenChange?: (isOpen: boolean) => void;
  isDarkMode?: boolean;
  userName?: string;
}

export function CustomerHomeScreen({ onStartOrder, onNavigate, shouldOpenMenu = false, onMenuOpenChange, isDarkMode = false, userName: userNameProp }: CustomerHomeScreenProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'Men' | 'Women' | 'Kids'>('Men');
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [userName, setUserName] = useState(userNameProp || '');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Get user name from auth or prop
  useEffect(() => {
    if (userNameProp) {
      setUserName(userNameProp);
    } else {
      const user = authAPI.getCurrentUser();
      if (user) {
        setUserName(user.name);
      }
    }
  }, [userNameProp]);

  // Auto-open menu when returning from submenu
  useEffect(() => {
    if (shouldOpenMenu) {
      setIsMenuOpen(true);
    }
  }, [shouldOpenMenu]);

  // Notify parent when menu state changes
  useEffect(() => {
    if (onMenuOpenChange) {
      onMenuOpenChange(isMenuOpen);
    }
  }, [isMenuOpen, onMenuOpenChange]);

  const handleCategoryChange = (category: 'Men' | 'Women' | 'Kids') => {
    if (category !== selectedCategory) {
      // Determine slide direction based on category order
      const categories = ['Men', 'Women', 'Kids'];
      const currentIndex = categories.indexOf(selectedCategory);
      const newIndex = categories.indexOf(category);
      
      setSlideDirection(newIndex > currentIndex ? 'right' : 'left');
      setIsAnimating(true);
      setExpandedCategory(null); // Reset expanded state when switching categories
      
      setTimeout(() => {
        setSelectedCategory(category);
        setTimeout(() => setIsAnimating(false), 30);
      }, 250);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null); // Collapse if already expanded
    } else {
      setExpandedCategory(categoryName); // Expand clicked category
    }
  };

  const menStyles = [
    // Top Wear
    { 
      name: 'Shirt', 
      category: 'Top Wear',
      image: '/metaia_dataset/METAIA/Designs/MEN/shirt/1.jpg'
    },
    { 
      name: 'T-Shirt', 
      category: 'Casual',
      image: '/metaia_dataset/METAIA/Designs/MEN/shirt/5.jpg'
    },
    { 
      name: 'Kurta', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/MEN/kurtha/1.jpg'
    },
    { 
      name: 'Jacket', 
      category: 'Top Wear',
      image: '/metaia_dataset/METAIA/Designs/MEN/blazer/1.jpg'
    },
    { 
      name: 'Blazer', 
      category: 'Formal',
      image: '/metaia_dataset/METAIA/Designs/MEN/blazer/2.jpg'
    },
    // Bottom Wear
    { 
      name: 'Pants', 
      category: 'Bottom Wear',
      image: '/metaia_dataset/METAIA/Designs/MEN/pants_trousers/1.jpg'
    },
    { 
      name: 'Jeans', 
      category: 'Casual',
      image: '/metaia_dataset/METAIA/Designs/MEN/pants_trousers/2.jpg'
    },
    // Full Body / Formal
    { 
      name: 'Suit', 
      category: 'Formal',
      image: '/metaia_dataset/METAIA/Designs/MEN/pathani suit/1.jpg'
    },
    { 
      name: 'Sherwani', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/MEN/sherwani/1.jpg'
    },
  ];

  const womenStyles = [
    // Top Wear
    { 
      name: 'Blouse', 
      category: 'Top Wear',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/blouse/1.jpg'
    },
    { 
      name: 'Kurti', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/kurthi/1.jpg'
    },
    { 
      name: 'Saree Blouse', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/blouse/2.jpg'
    },
    // Bottom Wear
    { 
      name: 'Palazzo', 
      category: 'Bottom Wear',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/pants_trousers/1.jpg'
    },
    { 
      name: 'Salwar', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/salwar/1.jpg'
    },
    // Full Body
    { 
      name: 'Dress', 
      category: 'Full Body',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/dress/1.jpg'
    },
    { 
      name: 'Lehenga', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/lehenga choli/1.jpg'
    },
    { 
      name: 'Anarkali', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/anarkali/1.jpg'
    },
    { 
      name: 'Salwar Kameez', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/suit/1.jpg'
    },
    { 
      name: 'Gown', 
      category: 'Formal',
      image: '/metaia_dataset/METAIA/Designs/WOMEN/gown/1.jpg'
    },
  ];

  // Customer testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "The fit was perfect! My wedding lehenga turned out exactly how I imagined. The tailor's attention to detail was amazing.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "Got my suit stitched for an important meeting. Professional service, on-time delivery, and excellent quality!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
    },
    {
      name: "Ananya Reddy",
      location: "Bangalore",
      rating: 5,
      text: "Best tailoring app I've used. The express delivery option saved me when I needed a saree blouse urgently. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const childrenStyles = [
    // Casual
    { 
      name: 'T-Shirt', 
      category: 'Casual',
      image: '/metaia_dataset/METAIA/Designs/KIDS/shirt/1.jpg'
    },
    { 
      name: 'Shirt', 
      category: 'Formal',
      image: '/metaia_dataset/METAIA/Designs/KIDS/shirt/2.jpg'
    },
    { 
      name: 'Dress', 
      category: 'Full Body',
      image: '/metaia_dataset/METAIA/Designs/KIDS/dress/1.jpg'
    },
    { 
      name: 'Kurta', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/KIDS/kurtha/1.jpg'
    },
    { 
      name: 'Shorts', 
      category: 'Casual',
      image: '/metaia_dataset/METAIA/Designs/KIDS/shorts/1.jpg'
    },
    { 
      name: 'Lehenga Choli', 
      category: 'Traditional',
      image: '/metaia_dataset/METAIA/Designs/KIDS/ghagra/1.jpg'
    },
  ];

  // Get current styles based on selected category
  const getCurrentStyles = () => {
    switch (selectedCategory) {
      case 'Men':
        return menStyles;
      case 'Women':
        return womenStyles;
      case 'Kids':
        return childrenStyles;
      default:
        return menStyles;
    }
  };

  const currentStyles = getCurrentStyles();

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#2d1a1a] to-[#1a0a0a]' 
        : 'bg-gradient-to-br from-[#B8A890] to-[#E5D4B8]'
    }`} style={{ paddingTop: 'var(--safe-area-inset-top)' }}>
      {/* Side Menu */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onNavigate={onNavigate}
        isDarkMode={isDarkMode}
      />
      
      {/* Header - Fixed with safe area */}
      <div className="sticky top-0 z-50 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm">
        <div className="flex justify-between items-center p-6 pb-4 relative z-10">
        <button className={isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 relative">
          <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-lg opacity-20 scale-125"></div>
          <ImageWithFallback 
            src={logo}
            alt="METAIA Logo"
            className="relative w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] filter brightness-105"
            style={{ mixBlendMode: 'normal' }}
          />
        </div>
        <button className={`${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'} relative`}>
          <Bell className="w-6 h-6" />
          <div className={`absolute -top-1 -right-1 w-3 h-3 ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#7A1F1F]'} rounded-full border border-white`}></div>
        </button>
      </div>
      </div>

      {/* Scrollable Content */}
      <div className="px-6 pb-24 overflow-y-auto relative z-10" style={{ maxHeight: 'calc(100vh - 100px)', paddingBottom: 'calc(var(--safe-area-inset-bottom) + 80px)' }}>
        {/* Welcome Section */}
        <div className={`backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-lg border-2 ${
          isDarkMode 
            ? 'bg-white/10 border-[#D4AF37]/30' 
            : 'bg-white/80 border-[#D4AF37]/20'
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-serif ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>
                Welcome{userName ? `, ${userName}` : ''}!
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-[#7A1F1F]/70'}`}>Your journey begins here</p>
            </div>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-[#7A1F1F]/80'}`}>
            Experience the finest in royal tailoring. Let us craft perfection for you.
          </p>
        </div>

        {/* Category Selector */}
        <div className="mb-6">
          <div className={`backdrop-blur-sm rounded-3xl p-2 shadow-lg border-2 ${
            isDarkMode 
              ? 'bg-white/10 border-[#D4AF37]/30' 
              : 'bg-white/80 border-[#D4AF37]/20'
          }`}>
            <div className="grid grid-cols-3 gap-2">
              {/* Men Category */}
              <button
                onClick={() => handleCategoryChange('Men')}
                className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl transition-all duration-300 hover:scale-125 ${
                  selectedCategory === 'Men'
                    ? 'bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white shadow-md scale-105'
                    : isDarkMode 
                      ? 'bg-white/10 text-[#D4AF37] hover:bg-white/20 scale-90'
                      : 'bg-white/50 text-[#7A1F1F] hover:bg-white/70 scale-90'
                }`}
              >
                <svg className="w-6 h-6 mb-1 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
                <span className="text-[10px] font-semibold">Men</span>
              </button>

              {/* Women Category */}
              <button
                onClick={() => handleCategoryChange('Women')}
                className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl transition-all duration-300 hover:scale-125 ${
                  selectedCategory === 'Women'
                    ? 'bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white shadow-md scale-105'
                    : isDarkMode 
                      ? 'bg-white/10 text-[#D4AF37] hover:bg-white/20 scale-90'
                      : 'bg-white/50 text-[#7A1F1F] hover:bg-white/70 scale-90'
                }`}
              >
                <svg className="w-6 h-6 mb-1 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
                <span className="text-[10px] font-semibold">Women</span>
              </button>

              {/* Kids Category */}
              <button
                onClick={() => handleCategoryChange('Kids')}
                className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl transition-all duration-300 hover:scale-125 ${
                  selectedCategory === 'Kids'
                    ? 'bg-gradient-to-br from-[#7A1F1F] to-[#5A1515] text-white shadow-md scale-105'
                    : isDarkMode 
                      ? 'bg-white/10 text-[#D4AF37] hover:bg-white/20 scale-90'
                      : 'bg-white/50 text-[#7A1F1F] hover:bg-white/70 scale-90'
                }`}
              >
                <svg className="w-6 h-6 mb-1 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7.5C13.38 7.5 14.5 6.38 14.5 5C14.5 3.62 13.38 2.5 12 2.5C10.62 2.5 9.5 3.62 9.5 5C9.5 6.38 10.62 7.5 12 7.5ZM16 15.5L14 9H10L8 15.5V21.5H10V16H14V21.5H16V15.5Z" fill="currentColor"/>
                </svg>
                <span className="text-[10px] font-semibold">Kids</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Collection */}
        <div className="mb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-serif ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'}`}>{selectedCategory}'s Collection</h3>
            <Scissors className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {currentStyles.map((style) => (
              <button
                key={style.name}
                onClick={() => onStartOrder(selectedCategory === 'Kids' ? 'Children' : selectedCategory, style.name)}
                className={`backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group ${
                  isDarkMode 
                    ? 'bg-white/10 border-[#D4AF37]/30 hover:border-[#D4AF37]' 
                    : 'bg-white/80 border-[#D4AF37]/20 hover:border-[#D4AF37]'
                }`}
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback 
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      console.log('Image failed to load:', style.image);
                      e.currentTarget.src = 'https://via.placeholder.com/600/D4AF37/7A1F1F?text=' + encodeURIComponent(style.name);
                    }}
                  />
                </div>
                <p className={`text-xs font-medium text-center py-3 leading-tight ${
                  isDarkMode ? 'text-[#D4AF37]' : 'text-[#7A1F1F]'
                }`}>
                  {style.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab="home" 
        onNavigate={onNavigate} 
        isDarkMode={isDarkMode}
      />
    </div>
  );
}