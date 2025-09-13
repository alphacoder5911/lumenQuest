import { useState, useEffect } from 'react';
import { planAPI } from '../services/api';

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call your existing API endpoint
      const response = await planAPI.getPlans();
      
      // Handle the response based on your API structure
      // Assuming your API returns: { success: true, data: [...plans] }
      const plansData = response.data?.data || response.data;
      setPlans(plansData);
      
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  const createPlan = async (planData) => {
    try {
      // Format data according to your API expectations
      const formattedData = {
        name: planData.name,
        price: parseFloat(planData.price),
        quotaGb: planData.quotaGb || 10, // Add your required fields
        features: planData.features || [],
        billing: planData.billing || 'monthly',
        // Add any other fields your API expects
      };

      const response = await planAPI.createPlan(formattedData);
      
      // Update local state with new plan
      const newPlan = response.data?.data || response.data;
      setPlans(prev => [...prev, newPlan]);
      
      return { success: true, data: newPlan };
    } catch (err) {
      console.error('Error creating plan:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || err.message || 'Failed to create plan'
      };
    }
  };

  const updatePlan = async (planId, planData) => {
    try {
      // Format data according to your API expectations
      const formattedData = {
        name: planData.name,
        price: parseFloat(planData.price),
        quotaGb: planData.quotaGb,
        features: planData.features || [],
        billing: planData.billing || 'monthly',
        // Add any other fields your API expects
      };

      const response = await planAPI.updatePlan(planId, formattedData);
      
      // Update local state
      const updatedPlan = response.data?.data || response.data;
      setPlans(prev => prev.map(plan => 
        plan.id === planId || plan._id === planId ? updatedPlan : plan
      ));
      
      return { success: true, data: updatedPlan };
    } catch (err) {
      console.error('Error updating plan:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || err.message || 'Failed to update plan'
      };
    }
  };

  const deletePlan = async (planId) => {
    try {
      await planAPI.deletePlan(planId);
      
      // Remove from local state (soft delete)
      setPlans(prev => prev.filter(plan => 
        (plan.id !== planId && plan._id !== planId)
      ));
      
      return { success: true };
    } catch (err) {
      console.error('Error deleting plan:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || err.message || 'Failed to delete plan'
      };
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    refetch: fetchPlans,
    createPlan,
    updatePlan,
    deletePlan
  };
};
