import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login"; // ملف الـ Login اللي انت عملته
import DashboardLayout from "./DashboardLayout";
import { Home, Squad, Transfers, Stats, Alerts, More } from "./Pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* مسار الـ Login لوحده من غير القائمة الجانبية */}
        <Route path="/login" element={<Login />} />

        {/* باقي البروجكت ملفوف جوه الـ DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/squad" element={<Squad />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/more" element={<More />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
