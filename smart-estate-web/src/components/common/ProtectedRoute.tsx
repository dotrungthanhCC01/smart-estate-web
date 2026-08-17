import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // For demonstration, auth check is enabled by default.
  // In production, this reads from Jotai authAtom or localStorage token.
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // <Outlet /> renders the matching child route inside the protected route scope
  return <Outlet />;
};
