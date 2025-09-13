import axios from 'axios';
import { mockPlanAPI, mockAnalyticsAPI } from './mockApi';

// Check if we should use mock APIs
const USE_MOCK_API = !process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL.includes('localhost:3001');

// Base API configuration (only used for real APIs)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Plan Management APIs
export const planAPI = USE_MOCK_API ? mockPlanAPI : {
  getPlans: () => api.get('/admin/plans'),
  createPlan: (planData) => api.post('/admin/plans', planData),
  updatePlan: (planId, planData) => api.put(`/admin/plans/${planId}`, planData),
  deletePlan: (planId) => api.delete(`/admin/plans/${planId}`)
};

// Analytics APIs
export const analyticsAPI = USE_MOCK_API ? mockAnalyticsAPI : {
  getTopPlans: (period) => api.get(`/admin/analytics/top-plans?period=${period}`),
  getPlanAnalytics: (timeRange) => api.get(`/admin/analytics/plans?timeRange=${timeRange}`),
  exportAnalytics: (format) => api.get(`/admin/analytics/export?format=${format}`, { responseType: 'blob' })
};

export default api;
