import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SubsManager from './components/SubsManager';
import ManagePlan from './components/ManagePlan';
import ManageDiscount from './components/ManageDiscount';
import ManageAnalytics from './components/ManageAnalytics';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch(activeView) {
      case 'dashboard': return <Dashboard />;
      case 'subs-manager': return <SubsManager />;
      case 'manage-plan': return <ManagePlan />;
      case 'manage-discount': return <ManageDiscount />;
      case 'manage-analytics': return <ManageAnalytics />;
      case 'users': return <UserManagement />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="content-area">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}

export default App;
