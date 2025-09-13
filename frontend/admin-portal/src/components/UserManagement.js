import React, { useState } from 'react';

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' }
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>User Management</h2>
      <div style={{ 
        background: 'white', 
        padding: '25px', 
        borderRadius: '15px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px 12px' }}>{user.name}</td>
                <td style={{ padding: '15px 12px' }}>{user.email}</td>
                <td style={{ padding: '15px 12px' }}>{user.role}</td>
                <td style={{ padding: '15px 12px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    background: user.status === 'Active' ? '#dcfce7' : '#fef2f2',
                    color: user.status === 'Active' ? '#166534' : '#dc2626'
                  }}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
