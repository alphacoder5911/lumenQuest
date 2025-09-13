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

// Plan Management APIs
export const planAPI = {
  // Get all plans
  getPlans: () => api.get('/plans'),
  
  // Get single plan
  getPlan: (id) => api.get(`/plans/${id}`),
  
  // Create new plan
  createPlan: (planData) => api.post('/plans', planData),
  
  // Update existing plan
  updatePlan: (id, planData) => api.put(`/plans/${id}`, planData),
  
  // Delete plan
  deletePlan: (id) => api.delete(`/plans/${id}`),
  
  // Toggle plan status
  togglePlanStatus: (id, status) => api.patch(`/plans/${id}/status`, { active: status })
};

// Discount Management APIs
export const discountAPI = {
  getDiscounts: () => api.get('/discounts'),
  createDiscount: (discountData) => api.post('/discounts', discountData),
  updateDiscount: (id, discountData) => api.put(`/discounts/${id}`, discountData),
  deleteDiscount: (id) => api.delete(`/discounts/${id}`),
  toggleDiscountStatus: (id, status) => api.patch(`/discounts/${id}/status`, { active: status })
};

// Analytics APIs
export const analyticsAPI = {
  getPlanAnalytics: (timeRange) => api.get(`/analytics/plans?timeRange=${timeRange}`),
  getSubscriptionTrends: (period) => api.get(`/analytics/trends?period=${period}`),
  getEngagementMetrics: () => api.get('/analytics/engagement'),
  exportAnalytics: (format) => api.get(`/analytics/export?format=${format}`, { responseType: 'blob' })
};

// AI Optimization APIs
export const aiAPI = {
  getOptimizationSuggestions: (type) => api.get(`/ai/suggestions?type=${type}`),
  runAIAnalysis: () => api.post('/ai/analyze'),
  implementSuggestion: (suggestionId, action) => api.post(`/ai/suggestions/${suggestionId}/implement`, { action })
};

export default api;
