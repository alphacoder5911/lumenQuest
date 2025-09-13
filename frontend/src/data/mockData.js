// Mock Data for Subscription Management System

export const mockUserData = {
  userId: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  status: "active"
}

export const mockCurrentSubscription = {
  subscriptionId: 1,
  planId: 46,
  planName: "Plan46",
  price: 599, // INR
  status: "active",
  startDate: "2024-04-20",
  lastBilledDate: "2024-01-20",
  lastRenewedDate: "2024-09-06",
  subscriptionType: "monthly",
  dataQuota: 200, // GB
  currentUsage: 145, // GB
  autoRenewal: true,
  nextBillingDate: "2024-10-06"
}

export const mockRecommendation = {
  planId: 78,
  planName: "Plan78",
  price: 799, // INR
  dataQuota: 300,
  reason: "Better quota for your high usage pattern",
  savings: "15% more data for just ₹200 extra",
  confidence: 92
}

export const mockSubscriptionHistory = [
  {
    date: "2024-09-01",
    plan: "Plan46",
    action: "renewed",
    amount: 599, // INR
    usage: "145/200 GB"
  },
  {
    date: "2024-08-01",
    plan: "Plan46", 
    action: "renewed",
    amount: 599, // INR
    usage: "180/200 GB"
  },
  {
    date: "2024-07-01",
    plan: "Plan35",
    action: "upgraded",
    amount: 1299, // INR
    usage: "95/100 GB"
  }
]

export const mockUsageStats = {
  currentMonth: {
    used: 145,
    total: 200,
    unit: "GB"
  },
  averageMonthly: 165,
  peakUsage: 195,
  efficiencyScore: 73
}
