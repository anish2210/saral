import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useAuth } from './hooks';
import {
  SignInPage,
  SignUpPage,
  OnboardingPage,
  DashboardPage,
  StudentsPage,
  StudentDetailPage,
  StudentFormPage,
  PaymentsPage,
  ProfilePage,
  PublicPaymentPage,
} from './pages';
import { Spinner } from './components/ui';
import CookieConsent from './components/CookieConsent';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
}

function AuthenticatedRoutes() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/students/new" element={<StudentFormPage />} />
      <Route path="/students/:id" element={<StudentDetailPage />} />
      <Route path="/students/:id/edit" element={<StudentFormPage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/p/:token" element={<PublicPaymentPage />} />

          {/* Auth routes - let Clerk handle the full flow including SSO callbacks */}
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />

          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <>
                <SignedOut>
                  <Navigate to="/sign-in" replace />
                </SignedOut>
                <SignedIn>
                  <AuthenticatedRoutes />
                </SignedIn>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
      <CookieConsent />
    </ClerkProvider>
  );
}

export default App;
