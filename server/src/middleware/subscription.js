// Middleware to check subscription status for write operations
export const requireActiveSubscription = (req, res, next) => {
  const tutor = req.tutor;

  if (!tutor) {
    return res.status(403).json({ error: 'Tutor profile required' });
  }

  // Check if subscription is locked
  if (tutor.subscriptionStatus === 'locked') {
    return res.status(403).json({
      error: 'Subscription expired',
      code: 'SUBSCRIPTION_LOCKED',
      message: 'Your subscription has expired. Please renew to continue adding or updating data.'
    });
  }

  // Check trial expiry
  if (tutor.subscriptionStatus === 'trial' && tutor.trialExpiry < new Date()) {
    return res.status(403).json({
      error: 'Trial expired',
      code: 'TRIAL_EXPIRED',
      message: 'Your trial period has ended. Please subscribe to continue.'
    });
  }

  // Check plan expiry for active subscriptions
  if (tutor.subscriptionStatus === 'active' && tutor.planExpiry < new Date()) {
    return res.status(403).json({
      error: 'Plan expired',
      code: 'PLAN_EXPIRED',
      message: 'Your subscription has expired. Please renew to continue.'
    });
  }

  next();
};

// Middleware to check if tutor can add more students
export const checkStudentLimit = async (req, res, next) => {
  const tutor = req.tutor;

  if (!tutor) {
    return res.status(403).json({ error: 'Tutor profile required' });
  }

  const canAdd = await tutor.canAddStudent();

  if (!canAdd) {
    return res.status(403).json({
      error: 'Student limit reached',
      code: 'STUDENT_LIMIT_REACHED',
      message: `You have reached your limit of ${tutor.studentLimit} students. Please upgrade your plan to add more.`
    });
  }

  next();
};
