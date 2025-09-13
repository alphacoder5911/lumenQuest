import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoBackup: true,
    emailAlerts: true
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Settings</h2>
      
      <div style={{ 
        background: 'white', 
        padding: '25px', 
        borderRadius: '15px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#475569' }}>General Settings</h3>
        
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '15px 0',
            borderBottom: '1px solid #f1f5f9'
          }}>
            <span style={{ 
              fontWeight: '600',
              color: '#1e293b',
              textTransform: 'capitalize'
            }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <button
              onClick={() => handleSettingChange(key)}
              style={{
                background: value ? '#667eea' : '#e2e8f0',
                color: value ? 'white' : '#64748b',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              {value ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ 
        background: 'white', 
        padding: '25px', 
        borderRadius: '15px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
      }}>
        <h3 style={{ marginBottom: '20px', color: '#475569' }}>Account Actions</h3>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Save Changes
          </button>
          
          <button style={{
            background: '#f8fafc',
            color: '#64748b',
            border: '2px solid #e2e8f0',
            padding: '12px 24px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
