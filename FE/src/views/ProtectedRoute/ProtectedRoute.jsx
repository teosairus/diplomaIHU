import { Navigate } from "react-router-dom";
import { decode } from "string-encode-decode";

const ProtectedRoute = ({ children }) => {
  const token = decode(sessionStorage.getItem("tkn"));

  if (token.length === 0) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
