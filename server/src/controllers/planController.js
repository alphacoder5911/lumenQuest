const planService = require('../services/planService');

exports.getPlansWithStats = async (req, res, next) => {
  try {
    const plans = await planService.getPlansWithStats();
    res.json(plans);
  } catch (err) {
    next(err);
  }
};

exports.createPlan = async (req, res, next) => {
  try {
    const plan = await planService.createPlan(req.body);
    res.status(201).json(plan);
  } catch (err) {
    next(err);
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const plan = await planService.updatePlan(req.params.planId, req.body);
    res.json(plan);
  } catch (err) {
    next(err);
  }
};

exports.softDeletePlan = async (req, res, next) => {
  try {
    const plan = await planService.softDeletePlan(req.params.planId);
    res.json(plan);
  } catch (err) {
    if (err.message === 'Cannot delete plan with active subscriptions') {
      res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
};