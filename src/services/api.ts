const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : `http://${window.location.hostname}:5000/api`;

// Store auth token
let authToken: string | null = localStorage.getItem('authToken');

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => authToken;

// Export setAuthToken for OAuth callback
export { setAuthToken as setToken };

// API call wrapper
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
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

// Auth API
export const authAPI = {
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
    setAuthToken(data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    return data;
  },

  login: async (credentials: { phone: string; password: string }) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setAuthToken(data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
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
    setAuthToken(data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    return data;
  },

  resetPassword: async (resetData: { phone: string; otp: string; newPassword: string }) => {
    return await apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData),
    });
  },

  logout: () => {
    setAuthToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('profileMeasurements');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('profileImage');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setAuthToken: setAuthToken,
};

// Orders API
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

// Payments API
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
