import { clerkClient, requireAuth } from '@clerk/express';
import Tutor from '../models/Tutor.js';

// Clerk's requireAuth middleware - validates session
export { requireAuth };

// Middleware to load tutor from database after Clerk auth
export const loadTutor = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const tutor = await Tutor.findOne({ clerkUserId });

    if (!tutor) {
      // Tutor not found - they need to complete onboarding
      req.tutor = null;
      req.needsOnboarding = true;
    } else {
      req.tutor = tutor;
      req.needsOnboarding = false;
    }

    next();
  } catch (error) {
    console.error('Error loading tutor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware that requires a completed tutor profile
export const requireTutor = async (req, res, next) => {
  if (!req.tutor) {
    return res.status(403).json({
      error: 'Profile not complete',
      code: 'ONBOARDING_REQUIRED'
    });
  }
  next();
};
