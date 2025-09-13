import React, { useState } from 'react';
import './ManageDiscount.css';

const ManageDiscount = () => {
  const [discounts, setDiscounts] = useState([
    { id: 1, code: 'SUMMER20', percentage: 20, expiry: '2025-12-31', active: true, usedCount: 45 },
    { id: 2, code: 'NEWUSER10', percentage: 10, expiry: '2025-10-15', active: true, usedCount: 123 },
    { id: 3, code: 'HOLIDAY50', percentage: 50, expiry: '2025-09-20', active: false, usedCount: 89 }
  ]);

  const [showAddDiscount, setShowAddDiscount] = useState(false);
  const [newDiscount, setNewDiscount] = useState({ code: '', percentage: '', expiry: '' });

  const handleAddDiscount = () => {
    if (newDiscount.code && newDiscount.percentage && newDiscount.expiry) {
      const discount = {
        id: Date.now(),
        code: newDiscount.code.toUpperCase(),
        percentage: parseInt(newDiscount.percentage),
        expiry: newDiscount.expiry,
        active: true,
        usedCount: 0
      };
      setDiscounts([...discounts, discount]);
      setNewDiscount({ code: '', percentage: '', expiry: '' });
      setShowAddDiscount(false);
    }
  };

  const toggleDiscountStatus = (id) => {
    setDiscounts(discounts.map(discount => 
      discount.id === id ? { ...discount, active: !discount.active } : discount
    ));
  };

  const deleteDiscount = (id) => {
    setDiscounts(discounts.filter(discount => discount.id !== id));
  };

  return (
    <div className="manage-discount">
      <div className="page-header">
        <h2>Manage Discounts</h2>
        <button 
          className="add-discount-btn"
          onClick={() => setShowAddDiscount(true)}
        >
          + Create New Discount
        </button>
      </div>

      <div className="discount-stats">
        <div className="stat-card">
          <h3>Total Discounts</h3>
          <div className="stat-number">{discounts.length}</div>
        </div>
        <div className="stat-card">
          <h3>Active Discounts</h3>
          <div className="stat-number">{discounts.filter(d => d.active).length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Usage</h3>
          <div className="stat-number">{discounts.reduce((sum, d) => sum + d.usedCount, 0)}</div>
        </div>
      </div>

      <div className="discounts-table">
        <table>
          <thead>
            <tr>
              <th>Discount Code</th>
              <th>Percentage</th>
              <th>Expiry Date</th>
              <th>Usage Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map(discount => (
              <tr key={discount.id} className={!discount.active ? 'inactive-row' : ''}>
                <td className="discount-code">{discount.code}</td>
                <td>{discount.percentage}%</td>
                <td>{new Date(discount.expiry).toLocaleDateString()}</td>
                <td>{discount.usedCount}</td>
                <td>
                  <span className={`status-badge ${discount.active ? 'active' : 'inactive'}`}>
                    {discount.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="actions">
                  <button 
                    className="toggle-btn"
                    onClick={() => toggleDiscountStatus(discount.id)}
                  >
                    {discount.active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                    className="edit-btn"
                    onClick={() => console.log('Edit discount', discount.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteDiscount(discount.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddDiscount && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Discount</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddDiscount(); }}>
              <input
                type="text"
                placeholder="Discount Code (e.g., SAVE20)"
                value={newDiscount.code}
                onChange={(e) => setNewDiscount({...newDiscount, code: e.target.value})}
              />
              <input
                type="number"
                min="1"
                max="100"
                placeholder="Discount Percentage"
                value={newDiscount.percentage}
                onChange={(e) => setNewDiscount({...newDiscount, percentage: e.target.value})}
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={newDiscount.expiry}
                onChange={(e) => setNewDiscount({...newDiscount, expiry: e.target.value})}
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">Create Discount</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddDiscount(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDiscount;
