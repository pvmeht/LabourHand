import { Navigate, Outlet, useLocation } from "react-router";
import { SessionManager } from "../../utils/session";
import { calculateProfileCompleteness } from "../../utils/profile";

export function ProtectedRoute() {
  const isAuth = SessionManager.isLoggedIn();
  const location = useLocation();

  if (!isAuth) {
    // Redirect to login but save the attempted URL for redirecting after login
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  const currentUser = SessionManager.getCurrentUser();
  const completeness = calculateProfileCompleteness(currentUser);

  // If user profile is < 70% complete and they aren't already on the onboarding page
  // @ts-ignore
  if (completeness < 70 && !location.pathname.startsWith('/onboarding') && location.pathname !== '/login') {
    return <Navigate to="/onboarding" replace />;
  }

  // If authenticated and complete, render child routes (via Outlet)
  return <Outlet />;
}
