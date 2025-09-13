const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const auth = require('../middleware/auth');

// Admin-only routes for managing plans
router.get('/admin/plans', auth.admin, planController.getPlansWithStats); // View all plans with stats
router.post('/admin/plans', auth.admin, planController.createPlan);       // Create new plan
router.put('/admin/plans/:planId', auth.admin, planController.updatePlan); // Update plan
router.delete('/admin/plans/:planId', auth.admin, planController.softDeletePlan); // Soft delete

module.exports = router;