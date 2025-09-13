import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'manage-plan', label: 'Manage Plan', icon: '📋' },
    { id: 'manage-discount', label: 'Manage Discount', icon: '💰' },
    { id: 'manage-analytics', label: 'Manage Analytics', icon: '📈' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Portal</h2>
          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <div className="subs-manager-section">
          <div className="subs-manager-card">
            <h3>Subs Manager</h3>
            <p>Subscription Management Hub</p>
            <div className="manager-stats">
              <div className="stat-item">
                <span className="stat-number">1,234</span>
                <span className="stat-label">Active Subs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$45.6K</span>
                <span className="stat-label">Revenue</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveView(item.id);
                setIsOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              <span className="nav-arrow">→</span>
            </button>
          ))}
        </nav>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Sidebar;
