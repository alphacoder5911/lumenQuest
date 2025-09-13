import React, { useState } from 'react';
import './ManageAnalytics.css';

const ManageAnalytics = () => {
  const [dateRange, setDateRange] = useState('30days');
  
  const analyticsData = {
    subscriptionGrowth: [
      { month: 'Jan', subscriptions: 150, revenue: 2250 },
      { month: 'Feb', subscriptions: 180, revenue: 2700 },
      { month: 'Mar', subscriptions: 220, revenue: 3300 },
      { month: 'Apr', subscriptions: 280, revenue: 4200 },
      { month: 'May', subscriptions: 320, revenue: 4800 }
    ],
    topPlans: [
      { plan: 'Pro Plan', subscribers: 450, percentage: 45 },
      { plan: 'Basic Plan', subscribers: 320, percentage: 32 },
      { plan: 'Enterprise', subscribers: 230, percentage: 23 }
    ],
    revenueMetrics: {
      totalRevenue: 156780,
      monthlyGrowth: 12.5,
      averagePerUser: 23.45,
      churnRate: 2.1
    }
  };

  const exportData = (format) => {
    console.log(`Exporting analytics data in ${format} format`);
    alert(`Analytics data exported as ${format.toUpperCase()} file!`);
  };

  const generateReport = () => {
    console.log('Generating comprehensive analytics report...');
    alert('Analytics report generated successfully!');
  };

  return (
    <div className="manage-analytics">
      <div className="page-header">
        <h2>Analytics Dashboard</h2>
        <div className="header-controls">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="date-filter"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <div className="export-buttons">
            <button onClick={() => exportData('csv')} className="export-btn">Export CSV</button>
            <button onClick={() => exportData('pdf')} className="export-btn">Export PDF</button>
          </div>
        </div>
      </div>

      <div className="analytics-overview">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <div className="metric-value">${analyticsData.revenueMetrics.totalRevenue.toLocaleString()}</div>
          <div className="metric-change positive">+{analyticsData.revenueMetrics.monthlyGrowth}%</div>
        </div>
        <div className="metric-card">
          <h3>Average Revenue Per User</h3>
          <div className="metric-value">${analyticsData.revenueMetrics.averagePerUser}</div>
          <div className="metric-change positive">+8.2%</div>
        </div>
        <div className="metric-card">
          <h3>Churn Rate</h3>
          <div className="metric-value">{analyticsData.revenueMetrics.churnRate}%</div>
          <div className="metric-change negative">-0.5%</div>
        </div>
        <div className="metric-card">
          <h3>Active Subscriptions</h3>
          <div className="metric-value">1,234</div>
          <div className="metric-change positive">+15.3%</div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-section">
          <h3>Subscription Growth Trend</h3>
          <div className="chart-container">
            <div className="growth-chart">
              {analyticsData.subscriptionGrowth.map((data, index) => (
                <div key={index} className="chart-bar">
                  <div 
                    className="bar" 
                    style={{height: `${(data.subscriptions / 320) * 100}%`}}
                    title={`${data.month}: ${data.subscriptions} subscriptions`}
                  ></div>
                  <span className="bar-label">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h3>Top Performing Plans</h3>
          <div className="plans-breakdown">
            {analyticsData.topPlans.map((plan, index) => (
              <div key={index} className="plan-row">
                <div className="plan-info">
                  <span className="plan-name">{plan.plan}</span>
                  <span className="plan-count">{plan.subscribers} subscribers</span>
                </div>
                <div className="plan-percentage">
                  <div 
                    className="percentage-bar" 
                    style={{width: `${plan.percentage}%`}}
                  ></div>
                  <span>{plan.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-actions">
        <button className="action-btn primary" onClick={generateReport}>
          Generate Report
        </button>
        <button className="action-btn secondary" onClick={() => alert('Report scheduling feature coming soon!')}>
          Schedule Report
        </button>
        <button className="action-btn secondary" onClick={() => alert('Analytics shared successfully!')}>
          Share Analytics
        </button>
      </div>
    </div>
  );
};

export default ManageAnalytics;
