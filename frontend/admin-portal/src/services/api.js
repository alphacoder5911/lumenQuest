import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Plan Management APIs - Matching your existing endpoints
export const planAPI = {
  // GET /api/admin/plans - Get all plans with subscription statistics
  getPlans: () => api.get('/admin/plans'),
  
  // POST /api/admin/plans - Create a new plan
  createPlan: (planData) => api.post('/admin/plans', planData),
  
  // PUT /api/admin/plans/:planId - Update plan features and pricing
  updatePlan: (planId, planData) => api.put(`/admin/plans/${planId}`, planData),
  
  // DELETE /api/admin/plans/:planId - Soft delete a plan
  deletePlan: (planId) => api.delete(`/admin/plans/${planId}`)
};

// Analytics APIs - Matching your existing endpoints
export const analyticsAPI = {
  // GET /api/admin/analytics/top-plans - Get most popular plans
  getTopPlans: (period = 'current-month') => api.get(`/admin/analytics/top-plans?period=${period}`),
  
  // Additional analytics endpoints you might have
  getPlanAnalytics: (timeRange) => api.get(`/admin/analytics/plans?timeRange=${timeRange}`),
  getSubscriptionTrends: (period) => api.get(`/admin/analytics/trends?period=${period}`),
  exportAnalytics: (format) => api.get(`/admin/analytics/export?format=${format}`, { responseType: 'blob' })
};

export default api;
