import { Navigate } from "react-router-dom";
import { useSocialAuth } from "../hooks/useSocialAuth";

// eslint-disable-next-line react/prop-types
export function PublicRoute({ children }) {
  const { user } = useSocialAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
