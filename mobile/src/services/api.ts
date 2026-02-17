import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;

let authToken: string | null = null;

export const initAuthToken = async () => {
  authToken = await AsyncStorage.getItem('authToken');
  return authToken;
};

export const setAuthToken = async (token: string | null) => {
  authToken = token;
  if (token) {
    await AsyncStorage.setItem('authToken', token);
  } else {
    await AsyncStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => authToken;

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const authAPI = {
  setAuthToken: async (token: string | null) => {
    await setAuthToken(token);
    if (token) {
      // Fetch user data after setting token
      try {
        const userData = await apiCall('/auth/me');
        await AsyncStorage.setItem('user', JSON.stringify(userData.data));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
  },

  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    await setAuthToken(data.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
    return data;
  },

  login: async (credentials: { phone: string; password: string }) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    await setAuthToken(data.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
    return data;
  },

  sendOTP: async (phone: string) => {
    return await apiCall('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  verifyOTP: async (otpData: { phone: string; otp: string }) => {
    const data = await apiCall('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
    await setAuthToken(data.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
    return data;
  },

  resetPassword: async (resetData: { phone: string; otp: string; newPassword: string }) => {
    return await apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData),
    });
  },

  logout: async () => {
    await setAuthToken(null);
    await AsyncStorage.multiRemove([
      'user',
      'authToken',
      'profileMeasurements',
      'userProfile',
      'profileImage',
    ]);
  },

  getCurrentUser: async () => {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export const ordersAPI = {
  create: async (orderData: any) => {
    return await apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getMyOrders: async () => {
    return await apiCall('/orders/my-orders');
  },

  getById: async (id: string) => {
    return await apiCall(`/orders/${id}`);
  },
};

export const paymentsAPI = {
  process: async (paymentData: {
    orderId: string;
    paymentMethod: string;
    amount: number;
    paymentDetails: any;
  }) => {
    return await apiCall('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },

  verify: async (transactionId: string, gatewayResponse: any) => {
    return await apiCall('/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ transactionId, gatewayResponse }),
    });
  },
};
