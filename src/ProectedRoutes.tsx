import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = () => {
  //use AuthProvider detrmine if protected routed are accessible
  const { isAuthenticated } = useAuth();
  //return is authenticated or redirect user to sign in page
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
