import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import PlayerCard from "./PlayerCard";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#130b20] text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main Content Area on the right */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Subtle background glow effect */}
        <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(74,35,120,0.15),transparent_60%)]" />
        <PlayerCard player={{
          name: "Mohamed Salah",
          team: "Liverpool",  
            position: "MID",
            price: 12.5,
            expectedPoints: 6.75,
            totalPoints: 150,
            nextFixture: "vs Manchester United",
            imageUrl: "https://resources.premierleague.com/premierleague/photos/players/250x250/p287.png"
        }} />
        {/* Outlet renders whatever the current page is (Home, Stats, etc.) */}
        <div className="max-w-7xl mx-auto relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
