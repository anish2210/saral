import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button, Input, Card, Spinner } from '../components/ui';
import { api } from '../lib/api';
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

    // Check if user already completed onboarding
    const checkOnboarding = async () => {
      try {
        const response = await api.getMe();
        console.log('[OnboardingPage] getMe response:', response);

        if (response.needsOnboarding) {
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
        // On error, show form anyway
        setIsLoading(false);
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
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete onboarding');
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
