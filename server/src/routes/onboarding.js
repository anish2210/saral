import express from 'express';
import Tutor from '../models/Tutor.js';
import { requireAuth, loadTutor } from '../middleware/auth.js';

const router = express.Router();

// POST /api/onboarding - Complete tutor profile after Clerk auth
router.post('/', requireAuth(), loadTutor, async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;

    // Check if tutor already exists
    if (req.tutor) {
      return res.status(400).json({
        error: 'Profile already exists',
        tutor: req.tutor
      });
    }

    const { name, phone } = req.body;

    if (!name || !name.trim()) {
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

    await tutor.save();

    res.status(201).json({
      message: 'Profile created successfully',
      tutor
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// GET /api/me - Get current tutor profile
router.get('/me', requireAuth(), loadTutor, async (req, res) => {
  if (req.needsOnboarding) {
    return res.status(200).json({
      needsOnboarding: true,
      tutor: null
    });
  }

  res.json({
    needsOnboarding: false,
    tutor: req.tutor
  });
});

export default router;
