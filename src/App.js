import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import DashboardLayout from "./DashboardLayout";
import { Home, Squad, Transfers, Stats, Alerts, More } from "./Pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard and its nested routes */}
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="squad" element={<Squad />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="stats" element={<Stats />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="more" element={<More />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
