import React, { useState } from 'react';
import './ManagePlan.css';

const ManagePlan = () => {
  const [plans, setPlans] = useState([
    { 
      id: 1, 
      name: 'Basic Plan', 
      price: 9.99, 
      billing: 'monthly',
      features: ['5 Users', '10GB Storage', 'Email Support', 'Basic Analytics'],
      active: true,
      subscribers: 234,
      createdDate: '2025-01-15'
    },
    { 
      id: 2, 
      name: 'Pro Plan', 
      price: 19.99, 
      billing: 'monthly',
      features: ['20 Users', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'API Access'],
      active: true,
      subscribers: 456,
      createdDate: '2025-01-10'
    },
    { 
      id: 3, 
      name: 'Enterprise', 
      price: 49.99, 
      billing: 'monthly',
      features: ['Unlimited Users', '1TB Storage', '24/7 Support', 'Custom Features', 'White Label'],
      active: false,
      subscribers: 123,
      createdDate: '2025-01-05'
    }
  ]);

  const [showAddPlan, setShowAddPlan] = useState(false);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    billing: 'monthly',
    features: '',
    active: true
  });

  // Add new plan
  const handleAddPlan = () => {
    if (formData.name && formData.price) {
      const newPlan = {
        id: Date.now(),
        name: formData.name,
        price: parseFloat(formData.price),
        billing: formData.billing,
        features: formData.features.split(',').map(f => f.trim()),
        active: formData.active,
        subscribers: 0,
        createdDate: new Date().toISOString().split('T')
      };
      setPlans([...plans, newPlan]);
      resetForm();
      setShowAddPlan(false);
    }
  };

  // Modify/Edit existing plan
  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      billing: plan.billing,
      features: plan.features.join(', '),
      active: plan.active
    });
    setShowEditPlan(true);
  };

  const handleUpdatePlan = () => {
    if (formData.name && formData.price && selectedPlan) {
      const updatedPlans = plans.map(plan => 
        plan.id === selectedPlan.id 
          ? {
              ...plan,
              name: formData.name,
              price: parseFloat(formData.price),
              billing: formData.billing,
              features: formData.features.split(',').map(f => f.trim()),
              active: formData.active
            }
          : plan
      );
      setPlans(updatedPlans);
      resetForm();
      setShowEditPlan(false);
      setSelectedPlan(null);
    }
  };

  // Delete existing plan
  const handleDeletePlan = (plan) => {
    setSelectedPlan(plan);
    setShowDeleteConfirm(true);
  };

  const confirmDeletePlan = () => {
    if (selectedPlan) {
      setPlans(plans.filter(plan => plan.id !== selectedPlan.id));
      setShowDeleteConfirm(false);
      setSelectedPlan(null);
    }
  };

  const togglePlanStatus = (id) => {
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, active: !plan.active } : plan
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      billing: 'monthly',
      features: '',
      active: true
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="manage-plan">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h2>Manage Subscription Plans</h2>
          <p>Create, modify, and delete subscription plans for your service</p>
        </div>
        <button 
          className="add-plan-btn"
          onClick={() => setShowAddPlan(true)}
        >
          <span className="btn-icon">+</span>
          Add New Plan
        </button>
      </div>

      {/* Plans Overview Stats */}
      <div className="plans-stats">
        <div className="stat-card">
          <h3>Total Plans</h3>
          <div className="stat-number">{plans.length}</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-card">
          <h3>Active Plans</h3>
          <div className="stat-number">{plans.filter(p => p.active).length}</div>
          <div className="stat-label">Currently Active</div>
        </div>
        <div className="stat-card">
          <h3>Total Subscribers</h3>
          <div className="stat-number">{plans.reduce((sum, p) => sum + p.subscribers, 0)}</div>
          <div className="stat-label">Across All Plans</div>
        </div>
        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <div className="stat-number">
            ${plans.reduce((sum, p) => sum + (p.price * p.subscribers), 0).toLocaleString()}
          </div>
          <div className="stat-label">Estimated</div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="plans-grid">
        {plans.map(plan => (
          <div key={plan.id} className={`plan-card ${!plan.active ? 'inactive' : ''}`}>
            <div className="plan-header">
              <div className="plan-title">
                <h3>{plan.name}</h3>
                <span className={`status-badge ${plan.active ? 'active' : 'inactive'}`}>
                  {plan.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="plan-price">
                <span className="price">${plan.price}</span>
                <span className="billing">/{plan.billing}</span>
              </div>
            </div>
            
            <div className="plan-metrics">
              <div className="metric">
                <span className="metric-value">{plan.subscribers}</span>
                <span className="metric-label">Subscribers</span>
              </div>
              <div className="metric">
                <span className="metric-value">${(plan.price * plan.subscribers).toLocaleString()}</span>
                <span className="metric-label">Revenue</span>
              </div>
            </div>

            <div className="plan-features">
              <h4>Features</h4>
              {plan.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  {feature}
                </div>
              ))}
            </div>

            <div className="plan-meta">
              <span className="created-date">Created: {new Date(plan.createdDate).toLocaleDateString()}</span>
            </div>
            
            <div className="plan-actions">
              <button 
                className={`status-btn ${plan.active ? 'active' : 'inactive'}`}
                onClick={() => togglePlanStatus(plan.id)}
                title={plan.active ? 'Deactivate Plan' : 'Activate Plan'}
              >
                {plan.active ? '⏸️ Deactivate' : '▶️ Activate'}
              </button>
              
              <button 
                className="edit-btn"
                onClick={() => handleEditPlan(plan)}
                title="Modify Existing Plan"
              >
                ✏️ Modify Plan
              </button>
              
              <button 
                className="delete-btn"
                onClick={() => handleDeletePlan(plan)}
                title="Delete Existing Plan"
              >
                🗑️ Delete Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Plan Modal */}
      {showAddPlan && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Subscription Plan</h3>
              <button className="close-btn" onClick={() => { resetForm(); setShowAddPlan(false); }}>
                ✕
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddPlan(); }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Plan Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Premium Plan"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Billing Cycle</label>
                  <select
                    value={formData.billing}
                    onChange={(e) => handleInputChange('billing', e.target.value)}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => handleInputChange('active', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Active Plan
                  </label>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Features (comma-separated)</label>
                <textarea
                  placeholder="e.g., 10 Users, 50GB Storage, Email Support"
                  value={formData.features}
                  onChange={(e) => handleInputChange('features', e.target.value)}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn">Create Plan</button>
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => { resetForm(); setShowAddPlan(false); }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {showEditPlan && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Modify Existing Plan</h3>
              <button className="close-btn" onClick={() => { resetForm(); setShowEditPlan(false); setSelectedPlan(null); }}>
                ✕
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleUpdatePlan(); }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Plan Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Billing Cycle</label>
                  <select
                    value={formData.billing}
                    onChange={(e) => handleInputChange('billing', e.target.value)}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => handleInputChange('active', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Active Plan
                  </label>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Features (comma-separated)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => handleInputChange('features', e.target.value)}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn">Update Plan</button>
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => { resetForm(); setShowEditPlan(false); setSelectedPlan(null); }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h3>Delete Existing Plan</h3>
              <button className="close-btn" onClick={() => { setShowDeleteConfirm(false); setSelectedPlan(null); }}>
                ✕
              </button>
            </div>
            
            <div className="delete-content">
              <div className="warning-icon">⚠️</div>
              <h4>Are you sure you want to delete this plan?</h4>
              <p>
                <strong>{selectedPlan?.name}</strong> will be permanently deleted. 
                This action cannot be undone.
              </p>
              <div className="deletion-impact">
                <p><strong>Impact:</strong></p>
                <ul>
                  <li>{selectedPlan?.subscribers} subscribers will be affected</li>
                  <li>Monthly revenue of ${selectedPlan ? (selectedPlan.price * selectedPlan.subscribers).toLocaleString() : 0} will be lost</li>
                  <li>All plan data will be permanently removed</li>
                </ul>
              </div>
            </div>

            <div className="modal-actions">
              <button className="delete-confirm-btn" onClick={confirmDeletePlan}>
                Yes, Delete Plan
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => { setShowDeleteConfirm(false); setSelectedPlan(null); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlan;
