import React, { useState, useEffect } from 'react';
import './AdminAnalytics.css';

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    revenue: 0,
    growthRate: 0
  });

  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);

  // Mock data simulation
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setAnalyticsData({
          totalUsers: 12549,
          activeSubscriptions: 8432,
          revenue: 145670,
          growthRate: 15.3
        });
        setLoading(false);
      }, 1000);
    };

    fetchAnalyticsData();
  }, [timeRange]);

  const StatCard = ({ title, value, change, icon }) => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
        <span className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
    </div>
  );

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="admin-analytics">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <div className="time-range-selector">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 3 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <StatCard 
          title="Total Users"
          value={analyticsData.totalUsers.toLocaleString()}
          change={12.5}
          icon="👥"
        />
        <StatCard 
          title="Active Subscriptions"
          value={analyticsData.activeSubscriptions.toLocaleString()}
          change={8.2}
          icon="📊"
        />
        <StatCard 
          title="Total Revenue"
          value={`$${analyticsData.revenue.toLocaleString()}`}
          change={15.3}
          icon="💰"
        />
        <StatCard 
          title="Growth Rate"
          value={`${analyticsData.growthRate}%`}
          change={2.1}
          icon="📈"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h2>Revenue Trend</h2>
          <div className="chart-placeholder">
            <div className="chart-mock">
              <div className="chart-bars">
                {[40, 65, 45, 80, 70, 90].map((height, index) => (
                  <div 
                    key={index}
                    className="chart-bar"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="chart-labels">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h2>User Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-dot active"></span>
              <div className="activity-content">
                <p>New user registrations</p>
                <span>+234 this week</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-dot"></span>
              <div className="activity-content">
                <p>Subscription upgrades</p>
                <span>+56 this week</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-dot"></span>
              <div className="activity-content">
                <p>Plan downgrades</p>
                <span>-12 this week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="analytics-table">
        <h2>Plan Performance</h2>
        <table>
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Active Users</th>
              <th>Revenue</th>
              <th>Growth</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Plan</td>
              <td>3,245</td>
              <td>$32,450</td>
              <td className="positive">+12%</td>
              <td><span className="status-badge active">Active</span></td>
            </tr>
            <tr>
              <td>Premium Plan</td>
              <td>2,187</td>
              <td>$65,610</td>
              <td className="positive">+18%</td>
              <td><span className="status-badge active">Active</span></td>
            </tr>
            <tr>
              <td>Enterprise Plan</td>
              <td>892</td>
              <td>$89,200</td>
              <td className="positive">+25%</td>
              <td><span className="status-badge active">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnalytics;
