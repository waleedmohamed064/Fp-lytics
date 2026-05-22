import { NavLink, useNavigate } from "react-router-dom";
import {
  X,
  Home,
  Users,
  ArrowRightLeft,
  BarChart2,
  Bell,
  MoreHorizontal,
  Shield,
  User,
  Gauge,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Squad", path: "/squad", icon: Users },
  { name: "Transfers", path: "/transfers", icon: ArrowRightLeft },
  { name: "Stats", path: "/stats", icon: BarChart2 },
  { name: "Alerts", path: "/alerts", icon: Bell },
  { name: "More", path: "/more", icon: MoreHorizontal },
  { name: "Compare", path: "/compare", icon: Gauge },
  { name: "Pro", path: "/premium", icon: Shield },
  { name: "Checkout", path: "/checkout", icon: ArrowRightLeft },
  { name: "Admin", path: "/admin", icon: Users },
  { name: "Profile", path: "/profile", icon: User },
];

export default function Sidebar({ mobileOpen = false, onClose }) {
  const navigate = useNavigate();

  const handleProfileShortcut = () => {
    if (typeof onClose === "function") {
      onClose();
    }
    navigate("/profile");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-[#3c2458] bg-[#130b20] p-5 text-slate-300 shadow-[20px_0_60px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:flex lg:w-64 lg:min-h-screen lg:translate-x-0 lg:flex-col lg:justify-between lg:shadow-none ${
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div>
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-3 px-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#23113a] text-emerald-300 shadow-[0_0_15px_rgba(0,230,118,0.15)]">
              <Shield size={18} strokeWidth={2.4} />
            </span>
            <span className="text-xl font-bold tracking-wide text-white">
              FPLytics
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-emerald-300/40 hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Logo */}
        <div className="mb-10 hidden items-center gap-3 px-2 lg:flex">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#23113a] text-emerald-300 shadow-[0_0_15px_rgba(0,230,118,0.15)]">
            <Shield size={18} strokeWidth={2.4} />
          </span>
          <span className="text-xl font-bold tracking-wide text-white">
            FPLytics
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-[#1e102f] text-emerald-400 border border-[#3c2458] shadow-[inset_4px_0_0_#00e676]"
                    : "hover:bg-[#1e102f]/50 hover:text-white"
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-6 lg:mt-0">
        <div className="relative mb-4 overflow-hidden rounded-2xl border border-[#3c2458] bg-[#1e102f] p-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full"></div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300 font-semibold">
                AI Insights
              </p>
              <h4 className="text-sm font-bold text-white mt-1">
                Optimization active
              </h4>
            </div>
            <div className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
              LIVE
            </div>
          </div>

          <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-white/8">
            <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Shield size={13} className="text-emerald-300" />
            Squad health 92%
          </div>
        </div>

        <button
          type="button"
          onClick={handleProfileShortcut}
          className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-[#1e102f]"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 border-2 border-emerald-400 overflow-hidden flex items-center justify-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Walid"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-white">EliteManager_99</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Rank: #1,204
            </p>
          </div>
        </button>
      </div>
    </aside>
  );
}
