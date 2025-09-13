// Mock API service for preview purposes
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    price: 9.99,
    quotaGb: 10,
    billing: 'monthly',
    features: ['5 Users', '10GB Storage', 'Email Support'],
    active: true,
    subscriberCount: 234,
    createdAt: '2025-01-15'
  },
  {
    id: 2,
    name: 'Pro Plan',
    price: 19.99,
    quotaGb: 50,
    billing: 'monthly',
    features: ['20 Users', '50GB Storage', 'Priority Support', 'Analytics'],
    active: true,
    subscriberCount: 456,
    createdAt: '2025-01-10'
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 49.99,
    quotaGb: 200,
    billing: 'monthly',
    features: ['Unlimited Users', '200GB Storage', '24/7 Support', 'Custom Features'],
    active: false,
    subscriberCount: 123,
    createdAt: '2025-01-05'
  }
];

const mockTopPlans = [
  { id: 2, name: 'Pro Plan', price: 19.99, activeSubscriptions: 456, billing: 'monthly' },
  { id: 1, name: 'Basic Plan', price: 9.99, activeSubscriptions: 234, billing: 'monthly' },
  { id: 3, name: 'Enterprise', price: 49.99, activeSubscriptions: 123, billing: 'monthly' }
];

// Mock Plan API
export const mockPlanAPI = {
  getPlans: async () => {
    await delay(1000); // Simulate network delay
    return {
      data: {
        success: true,
        data: mockPlans
      }
    };
  },

  createPlan: async (planData) => {
    await delay(1500);
    const newPlan = {
      id: Date.now(),
      ...planData,
      subscriberCount: 0,
      createdAt: new Date().toISOString(),
      active: true
    };
    mockPlans.push(newPlan);
    return {
      data: {
        success: true,
        data: newPlan
      }
    };
  },

  updatePlan: async (planId, planData) => {
    await delay(1200);
    const index = mockPlans.findIndex(p => p.id == planId);
    if (index !== -1) {
      mockPlans[index] = { ...mockPlans[index], ...planData };
      return {
        data: {
          success: true,
          data: mockPlans[index]
        }
      };
    }
    throw new Error('Plan not found');
  },

  deletePlan: async (planId) => {
    await delay(1000);
    const index = mockPlans.findIndex(p => p.id == planId);
    if (index !== -1) {
      mockPlans.splice(index, 1);
      return {
        data: {
          success: true,
          message: 'Plan deleted successfully'
        }
      };
    }
    throw new Error('Plan not found');
  }
};

// Mock Analytics API
export const mockAnalyticsAPI = {
  getTopPlans: async (period) => {
    await delay(800);
    return {
      data: {
        success: true,
        data: mockTopPlans
      }
    };
  },

  getPlanAnalytics: async (timeRange) => {
    await delay(1000);
    return {
      data: {
        success: true,
        data: {
          totalRevenue: 156780,
          totalSubscriptions: 813,
          averageRevenuePerUser: 23.45,
          churnRate: 4.6
        }
      }
    };
  },

  exportAnalytics: async (format) => {
    await delay(2000);
    // Simulate file download
    const csvContent = "Plan,Subscribers,Revenue\nBasic,234,2336\nPro,456,9114\nEnterprise,123,6149";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    return { data: blob };
  }
};
