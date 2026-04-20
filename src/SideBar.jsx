import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  ArrowRightLeft,
  BarChart2,
  Bell,
  MoreHorizontal,
  Shield,
  Zap,
  User,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Squad", path: "/squad", icon: Users },
  { name: "Transfers", path: "/transfers", icon: ArrowRightLeft },
  { name: "Stats", path: "/stats", icon: BarChart2 },
  { name: "Alerts", path: "/alerts", icon: Bell },
  { name: "More", path: "/more", icon: MoreHorizontal },
  { name: "Profile", path: "/profile", icon: User },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#130b20] border-r border-[#3c2458] flex flex-col justify-between p-5 text-slate-300">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
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
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
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

      <div>
        {/* Upgrade Pro Card */}
        <div className="bg-[#1e102f] border border-[#3c2458] rounded-2xl p-4 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full"></div>
          <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
            PRO STATUS{" "}
            <Zap size={14} className="text-emerald-400 fill-emerald-400" />
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Unlock advanced AI tools.
          </p>
          <button className="w-full bg-[#00e676] text-[#072015] font-bold text-xs py-2 rounded-lg transition hover:brightness-105 uppercase tracking-wider shadow-[0_0_15px_rgba(0,230,118,0.2)]">
            Upgrade
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-[#1e102f] rounded-xl transition">
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
        </div>
      </div>
    </aside>
  );
}
