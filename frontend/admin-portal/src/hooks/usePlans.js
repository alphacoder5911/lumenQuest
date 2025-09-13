import { useState, useEffect } from 'react';
import { planAPI } from '../services/api';

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await planAPI.getPlans();
      setPlans(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPlan = async (planData) => {
    try {
      const response = await planAPI.createPlan(planData);
      setPlans(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updatePlan = async (id, planData) => {
    try {
      const response = await planAPI.updatePlan(id, planData);
      setPlans(prev => prev.map(plan => 
        plan.id === id ? response.data : plan
      ));
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deletePlan = async (id) => {
    try {
      await planAPI.deletePlan(id);
      setPlans(prev => prev.filter(plan => plan.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const togglePlanStatus = async (id, status) => {
    try {
      await planAPI.togglePlanStatus(id, status);
      setPlans(prev => prev.map(plan => 
        plan.id === id ? { ...plan, active: status } : plan
      ));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
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
    deletePlan,
    togglePlanStatus
  };
};
