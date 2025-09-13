import React from 'react';
import './Header.css';

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <h1>Admin Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>
        
        <div className="header-actions">
          <button className="notification-btn">🔔</button>
          <div className="user-profile">
            <div className="profile-circle">
              <img src="/api/placeholder/40/40" alt="Profile" />
            </div>
            <span>Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
