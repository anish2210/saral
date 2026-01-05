import { clerkClient, requireAuth } from '@clerk/express';
import Tutor from '../models/Tutor.js';

// Clerk's requireAuth middleware - validates session
export { requireAuth };

// Middleware to load tutor from database after Clerk auth
export const loadTutor = async (req, res, next) => {
  console.log('[loadTutor] Starting for:', req.method, req.originalUrl);

  try {
    // Use req.auth() as a function (Clerk v5+)
    const auth = req.auth();
    console.log('[loadTutor] auth:', JSON.stringify(auth, null, 2));

    const clerkUserId = auth?.userId;
    console.log('[loadTutor] clerkUserId:', clerkUserId);

    if (!clerkUserId) {
      console.log('[loadTutor] No clerkUserId found - returning 401');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('[loadTutor] Looking up tutor in DB...');
    const tutor = await Tutor.findOne({ clerkUserId });
    console.log('[loadTutor] Tutor found:', tutor ? tutor._id : 'null');

    if (!tutor) {
      // Tutor not found - they need to complete onboarding
      console.log('[loadTutor] Tutor not found - needs onboarding');
      req.tutor = null;
      req.needsOnboarding = true;
    } else {
      console.log('[loadTutor] Tutor loaded successfully:', tutor.name);
      req.tutor = tutor;
      req.needsOnboarding = false;
    }

    next();
  } catch (error) {
    console.error('[loadTutor] Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware that requires a completed tutor profile
export const requireTutor = async (req, res, next) => {
  console.log('[requireTutor] Checking tutor:', req.tutor ? 'exists' : 'null');
  if (!req.tutor) {
    console.log('[requireTutor] No tutor - returning 403 ONBOARDING_REQUIRED');
    return res.status(403).json({
      error: 'Profile not complete',
      code: 'ONBOARDING_REQUIRED'
    });
  }
  next();
};
