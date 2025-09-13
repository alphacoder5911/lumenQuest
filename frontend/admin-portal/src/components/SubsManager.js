import React from 'react';
import './SubsManager.css';

const SubsManager = () => {
  const subscriptionStats = {
    totalSubscriptions: 1234,
    activeSubscriptions: 987,
    monthlyRevenue: 45678,
    churnRate: 2.3
  };

  const recentSubscriptions = [
    { id: 1, email: 'user1@example.com', plan: 'Pro Plan', date: '2025-09-10', status: 'Active' },
    { id: 2, email: 'user2@example.com', plan: 'Basic Plan', date: '2025-09-11', status: 'Active' },
    { id: 3, email: 'user3@example.com', plan: 'Enterprise', date: '2025-09-12', status: 'Pending' },
    { id: 4, email: 'user4@example.com', plan: 'Pro Plan', date: '2025-09-13', status: 'Active' }
  ];

  return (
    <div className="subs-manager">
      <div className="page-header">
        <h2>Subscription Manager</h2>
        <p>Comprehensive overview of all subscription activities</p>
      </div>
      
      <div className="subs-overview">
        <div className="subs-stat-card">
          <h3>Total Subscriptions</h3>
          <div className="stat-number">{subscriptionStats.totalSubscriptions.toLocaleString()}</div>
          <div className="stat-trend positive">+15% from last month</div>
        </div>
        
        <div className="subs-stat-card">
          <h3>Active Subscriptions</h3>
          <div className="stat-number">{subscriptionStats.activeSubscriptions.toLocaleString()}</div>
          <div className="stat-trend positive">+8% from last month</div>
        </div>
        
        <div className="subs-stat-card">
          <h3>Monthly Revenue</h3>
          <div className="stat-number">${subscriptionStats.monthlyRevenue.toLocaleString()}</div>
          <div className="stat-trend positive">+22% from last month</div>
        </div>
        
        <div className="subs-stat-card">
          <h3>Churn Rate</h3>
          <div className="stat-number">{subscriptionStats.churnRate}%</div>
          <div className="stat-trend negative">-0.5% from last month</div>
        </div>
      </div>

      <div className="subs-content">
        <div className="recent-subscriptions">
          <h3>Recent Subscriptions</h3>
          <div className="subscription-list">
            {recentSubscriptions.map(sub => (
              <div key={sub.id} className="subscription-item">
                <div className="sub-info">
                  <span className="sub-email">{sub.email}</span>
                  <span className="sub-plan">{sub.plan}</span>
                </div>
                <div className="sub-details">
                  <span className="sub-date">{new Date(sub.date).toLocaleDateString()}</span>
                  <span className={`sub-status ${sub.status.toLowerCase()}`}>{sub.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="subscription-summary">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-button" onClick={() => alert('View all subscriptions')}>
              📊 View All Subscriptions
            </button>
            <button className="action-button" onClick={() => alert('Export subscription data')}>
              📥 Export Data
            </button>
            <button className="action-button" onClick={() => alert('Generate subscription report')}>
              📋 Generate Report
            </button>
            <button className="action-button" onClick={() => alert('Manage billing settings')}>
              ⚙️ Billing Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubsManager;
