import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import DashboardLayout from "./DashboardLayout";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import {
  Home,
  Squad,
  Stats,
  ComparePage,
  PremiumPage,
  CheckoutPage,
  AdminPage,
} from "./Pages";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Authentication routes - NO sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard routes WITH sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/squad" element={<Squad />} />
          <Route path="/dashboard/stats" element={<Stats />} />
          <Route path="/dashboard/compare" element={<ComparePage />} />
          <Route path="/dashboard/premium" element={<PremiumPage />} />
          <Route path="/dashboard/checkout" element={<CheckoutPage />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>

        {/* Admin route - protected WITH sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/admin" element={<ProtectedAdminRoute element={<AdminPage />} />} />
        </Route>

        {/* Fallback redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
