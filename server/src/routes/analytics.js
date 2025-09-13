const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

router.get('/admin/analytics/top-plans', auth.admin, analyticsController.getTopPlans);
router.get('/admin/analytics/trends', auth.admin, analyticsController.getTrends);
router.get('/admin/analytics/plans', auth.admin, analyticsController.getPlanAnalytics);

module.exports = router;