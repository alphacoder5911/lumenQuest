import React, { useState } from 'react';
import { usePlans } from '../hooks/usePlans';
import './ManagePlan.css';

const ManagePlan = () => {
  const {
    plans,
    loading,
    error,
    createPlan,
    updatePlan,
    deletePlan
  } = usePlans();

  const [showAddPlan, setShowAddPlan] = useState(false);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quotaGb: '',
    billing: 'monthly',
    features: '',
    active: true
  });
  const [submitting, setSubmitting] = useState(false);

  const handleAddPlan = async () => {
    if (formData.name && formData.price) {
      setSubmitting(true);
      
      // Format data according to your API expectations
      const planData = {
        name: formData.name,
        price: parseFloat(formData.price),
        quotaGb: parseInt(formData.quotaGb) || 10,
        billing: formData.billing,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        // Add any other fields your API expects
      };

      const result = await createPlan(planData);
      
      if (result.success) {
        resetForm();
        setShowAddPlan(false);
        alert('Plan created successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
      setSubmitting(false);
    }
  };

  const handleUpdatePlan = async () => {
    if (formData.name && formData.price && selectedPlan) {
      setSubmitting(true);
      
      const planData = {
        name: formData.name,
        price: parseFloat(formData.price),
        quotaGb: parseInt(formData.quotaGb) || 10,
        billing: formData.billing,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      };

      // Use the correct ID field (could be 'id' or '_id')
      const planId = selectedPlan.id || selectedPlan._id;
      const result = await updatePlan(planId, planData);
      
      if (result.success) {
        resetForm();
        setShowEditPlan(false);
        setSelectedPlan(null);
        alert('Plan updated successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
      setSubmitting(false);
    }
  };

  const handleDeletePlan = async () => {
    if (selectedPlan) {
      setSubmitting(true);
      
      const planId = selectedPlan.id || selectedPlan._id;
      const result = await deletePlan(planId);
      
      if (result.success) {
        setShowDeleteConfirm(false);
        setSelectedPlan(null);
        alert('Plan deleted successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
      setSubmitting(false);
    }
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name || '',
      price: plan.price?.toString() || '',
      quotaGb: plan.quotaGb?.toString() || '',
      billing: plan.billing || 'monthly',
      features: Array.isArray(plan.features) ? plan.features.join(', ') : '',
      active: plan.active !== undefined ? plan.active : true
    });
    setShowEditPlan(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      quotaGb: '',
      billing: 'monthly',
      features: '',
      active: true
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Plans</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

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
          <div className="stat-number">{plans.filter(p => p.active !== false).length}</div>
          <div className="stat-label">Currently Active</div>
        </div>
        <div className="stat-card">
          <h3>Total Subscribers</h3>
          <div className="stat-number">{plans.reduce((sum, p) => sum + (p.subscriberCount || 0), 0)}</div>
          <div className="stat-label">Across All Plans</div>
        </div>
        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <div className="stat-number">
            ${plans.reduce((sum, p) => sum + ((p.price || 0) * (p.subscriberCount || 0)), 0).toLocaleString()}
          </div>
          <div className="stat-label">Estimated</div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="plans-grid">
        {plans.map(plan => {
          const planId = plan.id || plan._id;
          return (
            <div key={planId} className={`plan-card ${plan.active === false ? 'inactive' : ''}`}>
              <div className="plan-header">
                <div className="plan-title">
                  <h3>{plan.name}</h3>
                  <span className={`status-badge ${plan.active !== false ? 'active' : 'inactive'}`}>
                    {plan.active !== false ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="plan-price">
                  <span className="price">${plan.price}</span>
                  <span className="billing">/{plan.billing || 'month'}</span>
                </div>
              </div>
              
              <div className="plan-metrics">
                <div className="metric">
                  <span className="metric-value">{plan.subscriberCount || 0}</span>
                  <span className="metric-label">Subscribers</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{plan.quotaGb || 0}GB</span>
                  <span className="metric-label">Storage</span>
                </div>
                <div className="metric">
                  <span className="metric-value">${((plan.price || 0) * (plan.subscriberCount || 0)).toLocaleString()}</span>
                  <span className="metric-label">Revenue</span>
                </div>
              </div>

              <div className="plan-features">
                <h4>Features</h4>
                {(plan.features || []).map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="plan-meta">
                <span className="created-date">
                  Created: {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : 'Unknown'}
                </span>
              </div>
              
              <div className="plan-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEditPlan(plan)}
                  disabled={submitting}
                >
                  ✏️ Modify Plan
                </button>
                
                <button 
                  className="delete-btn"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowDeleteConfirm(true);
                  }}
                  disabled={submitting}
                >
                  🗑️ Delete Plan
                </button>
              </div>
            </div>
          );
        })}
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
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Storage Quota (GB)</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.quotaGb}
                    onChange={(e) => setFormData({...formData, quotaGb: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Billing Cycle</label>
                  <select
                    value={formData.billing}
                    onChange={(e) => setFormData({...formData, billing: e.target.value})}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Features (comma-separated)</label>
                <textarea
                  placeholder="e.g., 10 Users, 50GB Storage, Email Support"
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Create Plan'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => { resetForm(); setShowAddPlan(false); }}
                  disabled={submitting}
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
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Storage Quota (GB)</label>
                  <input
                    type="number"
                    value={formData.quotaGb}
                    onChange={(e) => setFormData({...formData, quotaGb: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Billing Cycle</label>
                  <select
                    value={formData.billing}
                    onChange={(e) => setFormData({...formData, billing: e.target.value})}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Features (comma-separated)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn" disabled={submitting}>
                  {submitting ? 'Updating...' : 'Update Plan'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => { resetForm(); setShowEditPlan(false); setSelectedPlan(null); }}
                  disabled={submitting}
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
                  <li>{selectedPlan?.subscriberCount || 0} subscribers will be affected</li>
                  <li>Monthly revenue of ${selectedPlan ? ((selectedPlan.price || 0) * (selectedPlan.subscriberCount || 0)).toLocaleString() : 0} will be lost</li>
                  <li>All plan data will be permanently removed</li>
                </ul>
              </div>
            </div>

            <div className="modal-actions">
              <button className="delete-confirm-btn" onClick={handleDeletePlan} disabled={submitting}>
                {submitting ? 'Deleting...' : 'Yes, Delete Plan'}
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => { setShowDeleteConfirm(false); setSelectedPlan(null); }}
                disabled={submitting}
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
