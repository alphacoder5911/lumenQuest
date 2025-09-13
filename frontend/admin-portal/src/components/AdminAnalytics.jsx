import React, { useState } from 'react';
import './App.css';

// Import all components from the components folder
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SubsManager from './components/SubsManager';
import ManagePlan from './components/ManagePlan';
import ManageDiscount from './components/ManageDiscount';
import ManageAnalytics from './components/ManageAnalytics';
import PlanAnalytics from './components/PlanAnalytics';
import AIOptimization from './components/AIOptimization';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import AdminAnalytics from './components/AdminAnalytics';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch(activeView) {
      case 'dashboard': 
        return <Dashboard />;
      case 'subs-manager': 
        return <SubsManager />;
      case 'manage-plan': 
        return <ManagePlan />;
      case 'manage-discount': 
        return <ManageDiscount />;
      case 'manage-analytics': 
        return <ManageAnalytics />;
      case 'plan-analytics': 
        return <PlanAnalytics />;
      case 'ai-optimize': 
        return <AIOptimization />;
      case 'users': 
        return <UserManagement />;
      case 'settings': 
        return <Settings />;
      case 'admin-analytics':
        return <AdminAnalytics />;
      default: 
        return <Dashboard />;
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
        <Header 
          setSidebarOpen={setSidebarOpen} 
          sidebarOpen={sidebarOpen} 
        />
        <div className="content-area">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}

export default App;
