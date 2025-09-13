import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Register user
const register = async (userData) => {
  const response = await api.post('/register', userData);

  if (response.data.success) {
    const { user, token } = response.data.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    return { user, token };
  }

  throw new Error(response.data.message || 'Registration failed');
};

// Login user
const login = async (userData) => {
  const response = await api.post('/login', userData);

  if (response.data.success) {
    const { user, token } = response.data.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    return { user, token };
  }

  throw new Error(response.data.message || 'Login failed');
};

// Logout user
const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    // Even if the logout API call fails, we should clear local storage
    console.warn('Logout API call failed:', error);
  } finally {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};

// Verify token
const verifyToken = async () => {
  const response = await api.get('/verify');

  if (response.data.success) {
    const { user } = response.data.data;
    localStorage.setItem('user', JSON.stringify(user));
    return { user };
  }

  throw new Error(response.data.message || 'Token verification failed');
};

const authService = {
  register,
  login,
  logout,
  verifyToken,
};

export default authService;