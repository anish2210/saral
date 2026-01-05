import { useAuth as useClerkAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { api } from '../lib/api';

export function useAuth() {
  const { getToken, isLoaded, isSignedIn, userId } = useClerkAuth();

  useEffect(() => {
    // Set up the token getter for the API client
    api.setTokenGetter(async () => {
      try {
        return await getToken();
      } catch {
        return null;
      }
    });
  }, [getToken]);

  return {
    isLoaded,
    isSignedIn,
    userId,
    getToken,
  };
}
