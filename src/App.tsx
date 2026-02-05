import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { OTPVerificationScreen } from './components/OTPVerificationScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { CustomerHomeScreen } from './components/CustomerHomeScreen';
import { OrderFlow } from './components/OrderFlow';
import { MyProfileScreen } from './components/MyProfileScreen';
import { MyOrdersScreen } from './components/MyOrdersScreen';
import { OrderHistoryScreen } from './components/OrderHistoryScreen';
import { MyReviewsScreen } from './components/MyReviewsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { AboutScreen } from './components/AboutScreen';
import { AuthSuccess } from './components/AuthSuccess';
import { authAPI } from './services/api';

type Screen = 'splash' | 'login' | 'otp' | 'register' | 'home' | 'order' | 'profile' | 'orders' | 'orderHistory' | 'reviews' | 'settings' | 'help' | 'about' | 'auth-success' | 'forgot-password';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [shouldOpenMenu, setShouldOpenMenu] = useState(false);
  
  // Global dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('metaia_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      return settings.darkMode || false;
    }
    return false;
  });

  // Check if user is already logged in or if OAuth callback
  useEffect(() => {
    // Check for OAuth callback in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('token')) {
      setCurrentScreen('auth-success');
      return;
    }

    const user = authAPI.getCurrentUser();
    if (user) {
      setUserName(user.name);
      setUserPhone(user.phone);
      if (currentScreen === 'splash' || currentScreen === 'login') {
        setTimeout(() => setCurrentScreen('home'), 2500);
      }
    }
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Auto-transition from splash to login after 2.5 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = (phone: string) => {
    const user = authAPI.getCurrentUser();
    if (user) {
      setUserName(user.name);
      setUserPhone(user.phone);
    }
    setCurrentScreen('home');
  };

  const handleOTPVerified = () => {
    const user = authAPI.getCurrentUser();
    if (user) {
      setUserName(user.name);
      setUserPhone(user.phone);
    }
    setCurrentScreen('home');
  };

  const handleRegister = () => {
    const user = authAPI.getCurrentUser();
    if (user) {
      setUserName(user.name);
      setUserPhone(user.phone);
    }
    setCurrentScreen('home');
  };

  const handleStartOrder = (category: string, style: string) => {
    setSelectedCategory(category);
    setSelectedStyle(style);
    setCurrentScreen('order');
  };

  const handleOrderComplete = () => {
    setCurrentScreen('home');
  };

  const handleAuthSuccess = () => {
    const user = authAPI.getCurrentUser();
    if (user) {
      setUserName(user.name);
      setUserPhone(user.phone || user.email);
    }
    // Clear URL params
    window.history.replaceState({}, document.title, window.location.pathname);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md min-h-screen bg-white shadow-2xl relative overflow-hidden">
        {currentScreen === 'splash' && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <SplashScreen />
          </div>
        )}
        {currentScreen === 'login' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <LoginScreen
              onLogin={handleLogin}
              onNavigateToRegister={() => setCurrentScreen('register')}
              onNavigateToForgotPassword={() => setCurrentScreen('forgot-password')}
            />
          </div>
        )}
        {currentScreen === 'otp' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <OTPVerificationScreen
              phone={userPhone}
              onVerified={handleOTPVerified}
              onBack={() => setCurrentScreen('login')}
            />
          </div>
        )}
        {currentScreen === 'register' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <RegistrationScreen
              onRegister={handleRegister}
              onNavigateToLogin={() => setCurrentScreen('login')}
            />
          </div>
        )}
        {currentScreen === 'forgot-password' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <ForgotPasswordScreen
              onBack={() => setCurrentScreen('login')}
              onSuccess={() => setCurrentScreen('login')}
            />
          </div>
        )}
        {currentScreen === 'home' && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <CustomerHomeScreen 
              onStartOrder={handleStartOrder}
              onNavigate={(screen) => {
                setShouldOpenMenu(true);
                setCurrentScreen(screen as Screen);
              }}
              shouldOpenMenu={shouldOpenMenu}
              onMenuOpenChange={(isOpen) => {
                if (!isOpen) setShouldOpenMenu(false);
              }}
              isDarkMode={isDarkMode}
              userName={userName}
            />
          </div>
        )}
        {currentScreen === 'order' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <OrderFlow 
              onComplete={handleOrderComplete} 
              onBack={() => setCurrentScreen('home')} 
              initialCategory={selectedCategory}
              initialStyle={selectedStyle}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        {currentScreen === 'profile' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <MyProfileScreen 
              onBack={() => setCurrentScreen('home')}
              onNavigate={(screen) => setCurrentScreen(screen as Screen)}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        {currentScreen === 'orders' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <MyOrdersScreen 
              onBack={() => setCurrentScreen('home')}
              onNavigate={(screen) => setCurrentScreen(screen as Screen)}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        {currentScreen === 'orderHistory' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <OrderHistoryScreen 
              onBack={() => setCurrentScreen('home')}
              onNavigate={(screen) => setCurrentScreen(screen as Screen)}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        {currentScreen === 'reviews' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <MyReviewsScreen 
              onBack={() => setCurrentScreen('home')}
              onNavigate={(screen) => setCurrentScreen(screen as Screen)}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
        {currentScreen === 'settings' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <SettingsScreen 
              onBack={() => setCurrentScreen('home')}
              onNavigate={(screen) => setCurrentScreen(screen as Screen)}
              onDarkModeChange={setIsDarkMode}
            />
          </div>
        )}
        {currentScreen === 'about' && (
          <div className="animate-[slideInRight_0.4s_ease-out]">
            <AboutScreen 
              onBack={() => setCurrentScreen('home')}
              onNavigate={(screen) => setCurrentScreen(screen as Screen)}
            />
          </div>
        )}
        {currentScreen === 'auth-success' && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <AuthSuccess onSuccess={handleAuthSuccess} />
          </div>
        )}
      </div>
    </div>
  );
}