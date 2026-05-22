import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import DashboardLayout from "./DashboardLayout";
import {
  Home,
  Squad,
  Transfers,
  Stats,
  Alerts,
  More,
  ComparePage,
  PremiumPage,
  CheckoutPage,
  AdminPage,
} from "./Pages";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Dashboard and its nested routes */}
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="squad" element={<Squad />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="stats" element={<Stats />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="more" element={<More />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="premium" element={<PremiumPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Prevent blank screen when URL does not match */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
