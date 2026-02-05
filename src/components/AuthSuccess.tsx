import { useEffect } from 'react';
import { authAPI } from '../services/api';

interface AuthSuccessProps {
  onSuccess: () => void;
}

export function AuthSuccess({ onSuccess }: AuthSuccessProps) {
  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');

    if (token) {
      // Save token and user info
      authAPI.setAuthToken(token);
      if (name && email) {
        localStorage.setItem('user', JSON.stringify({
          name: decodeURIComponent(name),
          email: decodeURIComponent(email)
        }));
      }

      // Redirect to home
      onSuccess();
    }
  }, [onSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B8] to-[#D4AF37] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#7A1F1F] text-lg font-medium">Completing sign in...</p>
      </div>
    </div>
  );
}
