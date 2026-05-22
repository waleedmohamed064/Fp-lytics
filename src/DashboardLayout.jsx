import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#130b20] text-slate-100 font-sans selection:bg-emerald-500/30 lg:flex">
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/55 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-label="Close navigation"
        />
      ) : null}

      {/* Sidebar on the left */}
      <Sidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area on the right */}
      <main className="relative flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/8 bg-[#1e102f]/80 px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.2)] lg:hidden">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-emerald-300">
              FPLytics
            </p>
            <p className="text-sm font-semibold text-white">Dashboard</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen((previousState) => !previousState)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-emerald-300/40 hover:bg-white/10"
            aria-label={mobileNavOpen ? "Close sidebar" : "Open sidebar"}
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Subtle background glow effect */}
        <div className="pointer-events-none absolute inset-0 right-0 h-full w-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(74,35,120,0.15),transparent_60%)]" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[radial-gradient(circle_at_bottom_center,rgba(0,230,118,0.08),transparent_60%)]" />
        </div>

        {/* Outlet renders whatever the current page is (Home, Stats, etc.) */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
