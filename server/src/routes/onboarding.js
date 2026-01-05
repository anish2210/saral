import express from 'express';
import Tutor from '../models/Tutor.js';
import { requireAuth, loadTutor } from '../middleware/auth.js';

const router = express.Router();

// POST /api/onboarding - Complete tutor profile after Clerk auth
router.post('/onboarding', requireAuth(), loadTutor, async (req, res) => {
  console.log('[POST /onboarding] Request received');
  console.log('[POST /onboarding] Body:', JSON.stringify(req.body, null, 2));
  console.log('[POST /onboarding] req.tutor:', req.tutor ? 'exists' : 'null');
  console.log('[POST /onboarding] req.needsOnboarding:', req.needsOnboarding);

  try {
    const clerkUserId = req.auth().userId;
    console.log('[POST /onboarding] clerkUserId:', clerkUserId);

    // Check if tutor already exists
    if (req.tutor) {
      console.log('[POST /onboarding] Profile already exists - returning 400');
      return res.status(400).json({
        error: 'Profile already exists',
        tutor: req.tutor
      });
    }

    const { name, phone } = req.body;
    console.log('[POST /onboarding] Creating tutor with name:', name, 'phone:', phone);

    if (!name || !name.trim()) {
      console.log('[POST /onboarding] Name missing - returning 400');
      return res.status(400).json({ error: 'Name is required' });
    }

    // Create new tutor with 14-day trial
    const tutor = new Tutor({
      clerkUserId,
      name: name.trim(),
      phone: phone?.trim() || '',
      planType: 'trial',
      studentLimit: 25,
      subscriptionStatus: 'trial'
    });

    console.log('[POST /onboarding] Saving tutor to DB...');
    await tutor.save();
    console.log('[POST /onboarding] Tutor saved successfully:', tutor._id);

    res.status(201).json({
      message: 'Profile created successfully',
      tutor
    });
  } catch (error) {
    console.error('[POST /onboarding] Error:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// GET /api/me - Get current tutor profile
router.get('/me', requireAuth(), loadTutor, async (req, res) => {
  console.log('[GET /me] Request received');
  console.log('[GET /me] req.needsOnboarding:', req.needsOnboarding);
  console.log('[GET /me] req.tutor:', req.tutor ? req.tutor._id : 'null');

  if (req.needsOnboarding) {
    console.log('[GET /me] Returning needsOnboarding: true');
    return res.status(200).json({
      needsOnboarding: true,
      tutor: null
    });
  }

  console.log('[GET /me] Returning tutor profile');
  res.json({
    needsOnboarding: false,
    tutor: req.tutor
  });
});

export default router;
