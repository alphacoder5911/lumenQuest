import { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';

export const useAnalytics = () => {
  const [topPlans, setTopPlans] = useState([]);
  const [planAnalytics, setPlanAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get most popular plans by period
  const fetchTopPlans = async (period = 'current-month') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await analyticsAPI.getTopPlans(period);
      const data = response.data?.data || response.data;
      
      setTopPlans(data);
      return { success: true, data };
    } catch (err) {
      console.error('Error fetching top plans:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch top plans';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanAnalytics = async (timeRange = '30days') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await analyticsAPI.getPlanAnalytics(timeRange);
      const data = response.data?.data || response.data;
      
      setPlanAnalytics(data);
      return { success: true, data };
    } catch (err) {
      console.error('Error fetching plan analytics:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch analytics';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (format = 'csv') => {
    try {
      const response = await analyticsAPI.exportAnalytics(format);
      
      // Create download link for blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `analytics_${Date.now()}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (err) {
      console.error('Error exporting data:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || err.message || 'Failed to export data'
      };
    }
  };

  return {
    topPlans,
    planAnalytics,
    loading,
    error,
    fetchTopPlans,
    fetchPlanAnalytics,
    exportData
  };
};
