const analyticsService = require('../services/analyticsService');

exports.getTopPlans = async (req, res, next) => {
  try {
    const data = await analyticsService.getTopPlans();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getTrends = async (req, res, next) => {
  try {
    const data = await analyticsService.getTrends();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getPlanAnalytics = async (req, res, next) => {
  try {
    const data = await analyticsService.getPlanAnalytics();
    res.json(data);
  } catch (err) {
    next(err);
  }
};