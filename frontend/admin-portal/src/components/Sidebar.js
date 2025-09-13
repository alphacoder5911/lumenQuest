import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: '📊', description: 'Main analytics dashboard' },
    { id: 'manage-plan', label: 'Manage Plans & Pricing', icon: '📋', description: 'Add, modify, delete plans' },
    { id: 'manage-discount', label: 'Add & Manage Discounts', icon: '💰', description: 'Promotional offers & conditions' },
    { id: 'plan-analytics', label: 'Track Plan Analytics', icon: '📈', description: 'Subscription trends & insights' },
    { id: 'ai-optimize', label: 'AI-Powered Optimization', icon: '🤖', description: 'Smart recommendations' },
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'System configuration' }
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
            <p>Service Provider Dashboard</p>
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
              title={item.description}
            >
              <span className="nav-icon">{item.icon}</span>
              <div className="nav-content">
                <span className="nav-label">{item.label}</span>
                <span className="nav-description">{item.description}</span>
              </div>
              <span className="nav-arrow">→</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="ai-indicator">
            <span className="ai-icon">🤖</span>
            <div className="ai-status">
              <span className="ai-label">AI Assistant</span>
              <span className="ai-state">Active</span>
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Sidebar;
