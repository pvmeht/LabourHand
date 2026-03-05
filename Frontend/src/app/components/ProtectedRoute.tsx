import { Navigate, Outlet, useLocation } from "react-router";
import { SessionManager } from "../../utils/session";

export function ProtectedRoute() {
  const isAuth = SessionManager.isLoggedIn();
  const location = useLocation();

  if (!isAuth) {
    // Redirect to login but save the attempted URL for redirecting after login
    // Using simple state or just navigating to login
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If authenticated, render child routes (via Outlet)
  return <Outlet />;
}
