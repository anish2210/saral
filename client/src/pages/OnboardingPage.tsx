import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button, Input, Card, Spinner } from '../components/ui';
import { api } from '../lib/api';
import { trackActivationComplete } from '../lib/gtm';
import type { OnboardingFormData } from '../types';

function OnboardingPage() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<OnboardingFormData>({
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (!isLoaded) return;

    // Pre-fill name from Clerk if available
    if (user?.fullName) {
      setFormData((prev) => ({ ...prev, name: user.fullName || '' }));
    }

    // Check if user already completed onboarding with retry logic
    const checkOnboarding = async (retryCount = 0): Promise<void> => {
      try {
        const response = await api.getMe();
        console.log('[OnboardingPage] getMe response:', response);

        if ('needsOnboarding' in response && response.needsOnboarding) {
          // User not onboarded yet, show form
          console.log('[OnboardingPage] User needs onboarding, showing form');
          setIsLoading(false);
        } else {
          // User already onboarded, redirect to dashboard
          console.log('[OnboardingPage] User already onboarded, redirecting to dashboard');
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error('[OnboardingPage] Error checking onboarding:', err);
        // Retry up to 2 times with a small delay (handles token not ready race condition)
        if (retryCount < 2) {
          console.log(`[OnboardingPage] Retrying check (attempt ${retryCount + 2})...`);
          setTimeout(() => checkOnboarding(retryCount + 1), 500);
        } else {
          // After retries, show form anyway
          console.log('[OnboardingPage] All retries failed, showing form');
          setIsLoading(false);
        }
      }
    };

    checkOnboarding();
  }, [isLoaded, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.completeOnboarding(formData);
      trackActivationComplete();
      navigate('/', { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete onboarding';
      // If profile already exists, redirect to dashboard instead of showing error
      if (errorMessage.toLowerCase().includes('profile already exists')) {
        console.log('[OnboardingPage] Profile already exists, redirecting to dashboard');
        navigate('/', { replace: true });
        return;
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text-primary">Welcome to Saral</h1>
          <p className="mt-2 text-text-secondary">
            Let's set up your profile to get started
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              hint="We'll use this to contact you about your subscription"
              required
            />

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isSubmitting}
            >
              Continue
            </Button>

            <p className="text-center text-xs text-text-muted">
              By continuing, you agree to our terms of service.
              Your 14-day free trial starts today.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default OnboardingPage;
