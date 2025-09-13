import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '2,543', change: '+12%', color: '#4CAF50' },
    { title: 'Active Sessions', value: '1,234', change: '+5%', color: '#2196F3' },
    { title: 'Revenue', value: '$45,678', change: '+18%', color: '#FF9800' },
    { title: 'Conversion Rate', value: '3.24%', change: '-2%', color: '#F44336' }
  ];

  const recentActivities = [
    'New user registered: john@example.com',
    'Payment processed: $299.99',
    'System backup completed',
    'Security scan passed',
    'New feature deployed'
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <h3>{stat.title}</h3>
              <span className={`change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="chart-card">
            <h3>Performance Overview</h3>
            <div className="chart-placeholder">
              📈 Chart will be rendered here
            </div>
          </div>
        </div>

        <div className="activity-section">
          <div className="activity-card">
            <h3>Recent Activities</h3>
            <ul className="activity-list">
              {recentActivities.map((activity, index) => (
                <li key={index} className="activity-item">
                  <span className="activity-dot"></span>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
