import { SignUp, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SignUpPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if fully loaded, signed in, and NOT on a callback route
    const isCallbackRoute = location.pathname.includes('/sso-callback') ||
                           location.pathname.includes('/factor') ||
                           location.pathname.includes('/verify');

    if (isLoaded && isSignedIn && !isCallbackRoute) {
      navigate('/onboarding', { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate, location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary-600">Saral</h1>
        <p className="mt-2 text-text-secondary">Simple fee tracking for tutors</p>
      </div>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'shadow-card rounded-[var(--radius-card)]',
            headerTitle: 'text-text-primary',
            headerSubtitle: 'text-text-secondary',
            socialButtonsBlockButton:
              'border border-gray-300 hover:bg-gray-50',
            formButtonPrimary:
              'bg-primary-500 hover:bg-primary-600 text-white',
            footerActionLink: 'text-primary-600 hover:text-primary-700',
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/onboarding"
      />
    </div>
  );
}

export default SignUpPage;
