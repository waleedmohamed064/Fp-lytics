import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ element }) {
  try {
    const authUserJson = localStorage.getItem("authUser");
    const authUser = authUserJson ? JSON.parse(authUserJson) : null;
    const isAdmin = authUser?.is_admin || false;

    // If user is not authenticated or is not admin, redirect to home
    if (!authUser || !isAdmin) {
      return <Navigate to="/" replace />;
    }

    // User is admin, render the component
    return element;
  } catch (error) {
    // If localStorage is corrupted, redirect to home
    return <Navigate to="/" replace />;
  }
}
