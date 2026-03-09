import { useAuth, SignIn } from '@clerk/react';

const KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? '';
const AUTH_ENABLED = KEY.length > 20 && !KEY.includes('replace_me');

export function AuthGate({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!AUTH_ENABLED) {
    return children;
  }

  if (!isLoaded) {
    return <div className="auth-loading">Loading…</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="auth-screen">
        <div className="auth-header">
          <h1>Chrono Intervention</h1>
          <p>Sign in to track your progress across devices</p>
        </div>
        <SignIn />
      </div>
    );
  }

  return children;
}
