import { useAuth, SignIn } from '@clerk/react';

export function AuthGate({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

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
