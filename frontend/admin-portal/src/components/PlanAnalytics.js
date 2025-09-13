import React, { useState } from 'react';
import './PlanAnalytics.css';

const PlanAnalytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('subscriptions');

  // Sample analytics data
  const analyticsData = {
    popularPlans: [
      { name: 'Pro Plan', subscriptions: 1234, engagement: 89, revenue: 24678 },
      { name: 'Basic Plan', subscriptions: 856, engagement: 76, revenue: 8504 },
      { name: 'Enterprise', subscriptions: 423, engagement: 94, revenue: 21147 },
      { name: 'Starter', subscriptions: 234, engagement: 45, revenue: 1170 }
    ],
    monthlyTrends: [
      { month: 'Jan', active: 1200, cancelled: 89, new: 156 },
      { month: 'Feb', active: 1267, cancelled: 76, new: 143 },
      { month: 'Mar', active: 1334, cancelled: 45, new: 112 },
      { month: 'Apr', active: 1401, cancelled: 67, new: 134 },
      { month: 'May', active: 1468, cancelled: 52, new: 119 },
      { month: 'Jun', active: 1535, cancelled: 71, new: 138 }
    ],
    engagementMetrics: {
      highEngagement: 67,
      mediumEngagement: 24,
      lowEngagement: 9
    }
  };

  const exportAnalytics = (format) => {
    console.log(`Exporting analytics in ${format} format`);
    alert(`Analytics exported as ${format.toUpperCase()} file!`);
  };

  return (
    <div className="plan-analytics">
      {/* Header */}
      <div className="analytics-header">
        <div className="header-content">
          <h2>Plan Analytics & Insights</h2>
          <p>Analyze user subscriptions, track trends, and optimize your service offerings</p>
        </div>
        <div className="header-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-selector"
          >
            <option value="weekly">Last 7 Days</option>
            <option value="monthly">Last 30 Days</option>
            <option value="quarterly">Last 3 Months</option>
            <option value="yearly">Last Year</option>
          </select>
          <div className="export-group">
            <button onClick={() => exportAnalytics('csv')} className="export-btn">
              📊 Export CSV
            </button>
            <button onClick={() => exportAnalytics('pdf')} className="export-btn">
              📄 Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="metrics-overview">
        <div className="metric-card highlight">
          <h3>Total Active Subscriptions</h3>
          <div className="metric-value">1,535</div>
          <div className="metric-change positive">+4.6% this month</div>
        </div>
        <div className="metric-card">
          <h3>Monthly Churn Rate</h3>
          <div className="metric-value">4.6%</div>
          <div className="metric-change negative">-0.8% improvement</div>
        </div>
        <div className="metric-card">
          <h3>Average Revenue Per User</h3>
          <div className="metric-value">$23.45</div>
          <div className="metric-change positive">+$2.10 increase</div>
        </div>
        <div className="metric-card">
          <h3>Customer Lifetime Value</h3>
          <div className="metric-value">$247</div>
          <div className="metric-change positive">+8.2% growth</div>
        </div>
      </div>

      {/* Popular vs Low Engagement Plans */}
      <div className="analytics-section">
        <div className="section-header">
          <h3>Plan Performance Analysis</h3>
          <p>Most popular plans and those with low engagement</p>
        </div>
        
        <div className="plans-performance">
          {analyticsData.popularPlans.map((plan, index) => (
            <div key={index} className={`performance-card ${plan.engagement < 50 ? 'low-engagement' : ''}`}>
              <div className="plan-header">
                <h4>{plan.name}</h4>
                <span className={`engagement-badge ${plan.engagement >= 80 ? 'high' : plan.engagement >= 60 ? 'medium' : 'low'}`}>
                  {plan.engagement >= 80 ? 'High Engagement' : plan.engagement >= 60 ? 'Medium' : 'Low Engagement'}
                </span>
              </div>
              
              <div className="plan-metrics">
                <div className="metric">
                  <span className="metric-label">Subscriptions</span>
                  <span className="metric-value">{plan.subscriptions.toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Engagement Score</span>
                  <span className="metric-value">{plan.engagement}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Monthly Revenue</span>
                  <span className="metric-value">${plan.revenue.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="engagement-bar">
                <div 
                  className="engagement-fill" 
                  style={{ width: `${plan.engagement}%` }}
                ></div>
              </div>
              
              {plan.engagement < 50 && (
                <div className="improvement-suggestion">
                  <span className="suggestion-icon">💡</span>
                  <span>Consider feature improvements or pricing adjustments</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="analytics-section">
        <div className="section-header">
          <h3>Active vs Cancelled Subscriptions Trend</h3>
          <p>Monthly analysis of subscription changes</p>
        </div>
        
        <div className="trends-container">
          <div className="trend-chart">
            <div className="chart-header">
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="metric-selector"
              >
                <option value="active">Active Subscriptions</option>
                <option value="cancelled">Cancelled Subscriptions</option>
                <option value="new">New Subscriptions</option>
              </select>
            </div>
            
            <div className="chart-area">
              {analyticsData.monthlyTrends.map((data, index) => {
                const maxValue = Math.max(...analyticsData.monthlyTrends.map(d => d.active));
                const height = (data[selectedMetric] / maxValue) * 100;
                
                return (
                  <div key={index} className="chart-bar-group">
                    <div className="chart-bar-container">
                      <div 
                        className={`chart-bar ${selectedMetric}`}
                        style={{ height: `${height}%` }}
                        title={`${data.month}: ${data[selectedMetric]}`}
                      ></div>
                    </div>
                    <span className="chart-label">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="trend-summary">
            <h4>Key Insights</h4>
            <div className="insight-list">
              <div className="insight-item">
                <span className="insight-icon">📈</span>
                <div className="insight-content">
                  <strong>Growth Trend:</strong>
                  <p>Active subscriptions increased by 27% over the past 6 months</p>
                </div>
              </div>
              <div className="insight-item">
                <span className="insight-icon">📉</span>
                <div className="insight-content">
                  <strong>Churn Analysis:</strong>
                  <p>Cancellation rate decreased by 18% after recent feature updates</p>
                </div>
              </div>
              <div className="insight-item">
                <span className="insight-icon">🎯</span>
                <div className="insight-content">
                  <strong>Acquisition:</strong>
                  <p>New subscriptions remain steady with seasonal fluctuations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Distribution */}
      <div className="analytics-section">
        <div className="section-header">
          <h3>Customer Engagement Distribution</h3>
          <p>Breakdown of user engagement levels across all plans</p>
        </div>
        
        <div className="engagement-distribution">
          <div className="engagement-chart">
            <div className="engagement-segment high" style={{ width: `${analyticsData.engagementMetrics.highEngagement}%` }}>
              <span className="segment-label">High Engagement</span>
              <span className="segment-value">{analyticsData.engagementMetrics.highEngagement}%</span>
            </div>
            <div className="engagement-segment medium" style={{ width: `${analyticsData.engagementMetrics.mediumEngagement}%` }}>
              <span className="segment-label">Medium</span>
              <span className="segment-value">{analyticsData.engagementMetrics.mediumEngagement}%</span>
            </div>
            <div className="engagement-segment low" style={{ width: `${analyticsData.engagementMetrics.lowEngagement}%` }}>
              <span className="segment-label">Low</span>
              <span className="segment-value">{analyticsData.engagementMetrics.lowEngagement}%</span>
            </div>
          </div>
          
          <div className="engagement-actions">
            <h4>Recommended Actions</h4>
            <div className="action-list">
              <div className="action-item">
                <span className="action-priority high">High Priority</span>
                <p>Re-engage {analyticsData.engagementMetrics.lowEngagement}% of low-engagement users through targeted campaigns</p>
              </div>
              <div className="action-item">
                <span className="action-priority medium">Medium Priority</span>
                <p>Optimize features for {analyticsData.engagementMetrics.mediumEngagement}% medium-engagement users</p>
              </div>
              <div className="action-item">
                <span className="action-priority low">Monitor</span>
                <p>Maintain satisfaction for {analyticsData.engagementMetrics.highEngagement}% high-engagement users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAnalytics;
