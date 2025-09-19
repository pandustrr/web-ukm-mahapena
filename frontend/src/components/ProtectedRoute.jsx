import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Cek apakah admin sudah login
  const isAuthenticated = localStorage.getItem("adminToken");

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
