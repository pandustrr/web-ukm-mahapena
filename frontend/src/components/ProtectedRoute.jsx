// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Ambil token dari sessionStorage
  const token = sessionStorage.getItem("adminToken");

  // Kalau tidak ada token → redirect ke login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Kalau ada token → izinkan akses
  return children;
};

export default ProtectedRoute;
