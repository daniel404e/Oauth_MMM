import { useSocialAuth } from "../hooks/useSocialAuth";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function PrivateRoute({ children }) {
  const { user } = useSocialAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
