import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";

function Home() {
  const [stats, setStats] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Simulate API call - replace with real API when available
    setTimeout(() => {
      setStats({
        gw: "24",
        totalPlayed: "02",
        gamesRemaining: "14",
        pointsScored: "32",
        teamHealth: 82,
        cleanSheetProb: {
          LIV: 42,
          ARS: 38,
          MCI: 36,
        },
      });

      setTopPlayers([
        {
          id: 1,
          name: "Erling Haaland",
          team: "Manchester City",
          price: "14.5m",
          status: "High Form",
          prediction: "+15 points",
          image:
            "https://resources.premierleague.com/premierleague/photos/players/250x250/p287.png",
          badgeColor: "bg-blue-600",
        },
        {
          id: 2,
          name: "Mohamed Salah",
          team: "Liverpool",
          price: "13.2m",
          status: "Hot Form",
          prediction: "+12 points",
          image:
            "https://resources.premierleague.com/premierleague/photos/players/250x250/p1.png",
          badgeColor: "bg-red-600",
        },
      ]);

      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-emerald-300" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Gameweek {stats.gw} Overview
          </h1>
          <p className="text-slate-400 mt-2">Display: Sat 10 Feb, 3:00 AM</p>
        </div>
        <div className="text-right text-slate-300 text-sm">
          <p>Status: Active</p>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Team Health */}
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6 relative overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full"></div>
          <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
            Team Health
          </h3>
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-400 border-t-emerald-200 flex items-center justify-center">
              <div className="text-3xl font-bold text-emerald-400">
                {stats.teamHealth}%
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">Excellent</p>
        </div>

        {/* Reduction in Cost */}
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
            Reduction in Cost
          </h3>
          <div className="mt-4">
            <p className="text-2xl font-bold text-emerald-400">74%</p>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingDown size={12} /> -12%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Budget used</p>
        </div>

        {/* How To Save */}
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
            How To Save
          </h3>
          <div className="mt-4">
            <p className="text-2xl font-bold text-cyan-400">38%</p>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +41%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Potential gain</p>
        </div>

        {/* Direct in Gameweek */}
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
            Direct in Gameweek
          </h3>
          <div className="mt-4">
            <p className="text-2xl font-bold text-yellow-400">94%</p>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +6%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Right Match</p>
        </div>
      </div>

      {/* AI Captaincy Battle & Scout Notes */}
      <div className="grid grid-cols-3 gap-4">
        {/* AI Captaincy Battle */}
        <div className="col-span-2 rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="inline-block">⚡</span> AI Captaincy Battle
            </h2>
            <button
              onClick={() => {}}
              className="text-emerald-400 text-sm hover:text-emerald-300 transition cursor-pointer font-medium"
            >
              View Analysis →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {topPlayers.map((player) => (
              <div
                key={player.id}
                className="rounded-xl border border-[#4d2f70] bg-[#250f3a] p-4 hover:border-emerald-400/50 transition overflow-hidden relative"
              >
                <div
                  className={`absolute inset-0 ${player.badgeColor} opacity-20 blur-2xl`}
                ></div>
                <div className="relative">
                  <div className="flex gap-3 items-start">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-16 h-16 rounded-lg border border-emerald-400/30"
                    />
                    <div>
                      <h3 className="font-bold text-white">{player.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {player.team}
                      </p>
                      <p className="text-xs text-emerald-400 font-semibold mt-2">
                        {player.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#3c2458]">
                    <p className="text-sm text-emerald-300 font-bold">
                      {player.prediction}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Sheet Probabilities */}
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h2 className="text-lg font-bold text-white mb-4">
            Clean Sheet Probabilities
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.cleanSheetProb).map(([team, prob]) => (
              <div key={team}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{team}</span>
                  <span className="text-emerald-400 font-semibold">
                    {prob}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#331c4f] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                    style={{ width: `${prob}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scout Notes & Price Watch */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            📋 Scout Notes & News
          </h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-green-900/50 bg-green-900/20 p-3">
              <p className="text-xs font-semibold text-green-300 mb-1">
                INJURY CONFIRMED: Salah
              </p>
              <p className="text-xs text-slate-300">
                Arsenal confirms Salah availability for GW24 despite injury
                scare
              </p>
            </div>
            <div className="rounded-lg border border-slate-600/50 bg-slate-900/20 p-3">
              <p className="text-xs font-semibold text-slate-300 mb-1">
                HIDDEN GEM: Why Bingham could be the best sub
              </p>
              <p className="text-xs text-slate-400">
                Excellent form and best upcoming fixtures for the next 3-5 GW
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            💹 Price Watch
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-900/50 bg-emerald-900/20">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">📈</span>
                <div>
                  <p className="text-sm font-semibold text-white">Richardson</p>
                  <p className="text-xs text-slate-400">up £7.2m</p>
                </div>
              </div>
              <span className="text-emerald-400 text-sm font-bold">+2</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-rose-900/50 bg-rose-900/20">
              <div className="flex items-center gap-3">
                <span className="text-rose-400">📉</span>
                <div>
                  <p className="text-sm font-semibold text-white">Salah</p>
                  <p className="text-xs text-slate-400">down £13.9m</p>
                </div>
              </div>
              <span className="text-rose-400 text-sm font-bold">-2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
