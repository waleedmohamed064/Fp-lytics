import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, AlertCircle, Zap } from "lucide-react";

function Home() {
  const [selectedCaptain, setSelectedCaptain] = useState("haaland");

  const captainData = {
    haaland: {
      name: "Erling Haaland",
      team: "Manchester City",
      opponent: "Manchester City vs Everton (H)",
      xgRating: "0.94",
      goalPercent: "68%",
      aiScore: "3.4",
      image: "E",
      badge: "AI RECOMMENDED CAPTAIN",
      color: "from-blue-500/30 to-blue-600/20",
    },
  };

  const captain = captainData[selectedCaptain];

  const marketTrends = [
    { name: "Richarlison", price: "£7.2m", change: "UP", trend: 0.15 },
    { name: "Salah", price: "£13.8m", change: "DOWN", trend: -0.12 },
    { name: "Palmer", price: "£5.9m", change: "UP", trend: 0.08 },
  ];

  const availabilityAlerts = [
    { name: "Kevin De Bruyne", status: "INJURED", color: "text-rose-400 bg-rose-900/20 border-rose-900/50" },
    { name: "Ivan Toney", status: "SUSPENDED", color: "text-slate-300 bg-slate-900/20 border-slate-900/50" },
    { name: "Son Heung-min", status: "INTERNATIONAL DUTY", color: "text-blue-400 bg-blue-900/20 border-blue-900/50" },
  ];

  // Mock chart data
  const chartData = [
    { gw: "GW15", points: 15 },
    { gw: "GW16", points: 20 },
    { gw: "GW17", points: 18 },
    { gw: "GW18", points: 25 },
    { gw: "GW19", points: 22 },
    { gw: "GW20", points: 28 },
    { gw: "GW21", points: 26 },
    { gw: "GW22", points: 32 },
    { gw: "GW23", points: 29 },
    { gw: "GW24", points: 35 },
  ];

  return (
    <section className="min-h-screen bg-[#130b20] text-slate-100 p-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* LEFT COLUMN - CAPTAIN & PERFORMANCE */}
          <div className="space-y-6">
          {/* AI Recommended Captain Card */}
          <div className="relative rounded-3xl border border-[#3d245b] bg-gradient-to-br from-[#2d1a4a] to-[#1a0f2a] overflow-hidden p-6">
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${captain.color} blur-2xl opacity-30`}></div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/20 border border-emerald-400/50 px-3 py-1 mb-4">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {captain.badge}
                </span>
              </div>

              {/* Player Name */}
              <h2 className="text-4xl font-bold text-white mb-2">{captain.name}</h2>

              {/* Opponent */}
              <p className="text-slate-400 text-sm mb-6">{captain.opponent}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-lg bg-[#1e102f] border border-[#3c2458] p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    XG Rating
                  </p>
                  <p className="text-xl font-bold text-emerald-400">
                    {captain.xgRating}
                  </p>
                </div>
                <div className="rounded-lg bg-[#1e102f] border border-[#3c2458] p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    Goal %
                  </p>
                  <p className="text-xl font-bold text-emerald-400">
                    {captain.goalPercent}
                  </p>
                </div>
                <div className="rounded-lg bg-[#1e102f] border border-[#3c2458] p-3 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    AI Score
                  </p>
                  <p className="text-xl font-bold text-emerald-400">
                    {captain.aiScore}
                  </p>
                </div>
              </div>

              {/* Player Image Placeholder */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 h-48 flex items-center justify-center border border-[#3c2458]">
                <div className="text-6xl font-bold text-slate-600">
                  {captain.image}
                </div>
              </div>
            </div>
          </div>

          {/* Your Team Performance Chart */}
          <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
              Your Team Performance
            </h3>

            {/* Chart Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Your Points
                </p>
                <p className="text-2xl font-bold text-white">42</p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Avg Points
                </p>
                <p className="text-2xl font-bold text-slate-300">38</p>
              </div>
              <div
                className="px-4 py-2 rounded-lg bg-emerald-400 text-[#072015] font-bold text-sm uppercase tracking-wider"
              >
                Pending
              </div>
              <div className="text-center flex-1">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Rank
                </p>
                <p className="text-2xl font-bold text-slate-300">#2,341</p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                  Value
                </p>
                <p className="text-2xl font-bold text-slate-300">£102.5m</p>
              </div>
            </div>

            {/* Simple Line Chart */}
            <div className="h-56 flex items-end justify-between gap-1 px-2">
              {chartData.map((item, idx) => {
                const maxPoints = 40;
                const height = (item.points / maxPoints) * 100;
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center group"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-emerald-400 to-cyan-400 rounded-t transition-all group-hover:opacity-80"
                      style={{ height: `${height}%`, minHeight: "4px" }}
                    ></div>
                    <span className="text-[10px] text-slate-500 mt-2 group-hover:text-slate-300 transition">
                      {item.gw}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - CARDS & TRENDS */}
        <div className="space-y-6">
          {/* Top Buy & Top Sell Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Top Buy */}
            <div className="relative rounded-2xl border border-[#3d245b] bg-[#1e102f] overflow-hidden">
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/20 border border-emerald-400/50 px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Top Buy
                </span>
              </div>
              <div className="flex items-end h-full">
                <div className="w-full p-6 pt-14">
                  <p className="text-sm text-slate-400 mb-1">Chelsea • Midfielder</p>
                  <h3 className="text-2xl font-bold text-white mb-2">Cole Palmer</h3>
                  <p className="text-3xl font-bold text-emerald-400">£5.9m</p>
                  <div className="mt-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-emerald-400" />
                    <span className="text-sm text-emerald-300 font-semibold">
                      +2.1% All Transfers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Sell */}
            <div className="relative rounded-2xl border border-[#3d245b] bg-[#1e102f] overflow-hidden">
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-500/50 px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                  Top Sell
                </span>
              </div>
              <div className="flex items-end h-full">
                <div className="w-full p-6 pt-14">
                  <p className="text-sm text-slate-400 mb-1">Liverpool • Midfielder</p>
                  <h3 className="text-2xl font-bold text-white mb-2">Mohamed Salah</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-2xl font-bold text-slate-400 line-through">
                      £13.1m
                    </p>
                    <p className="text-3xl font-bold text-rose-400">£13.0m</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingDown size={16} className="text-rose-400" />
                    <span className="text-sm text-rose-300 font-semibold">
                      -4.3 PROJ. POINTS LOSS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Alert & Market Trends */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Availability Alert */}
            <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-rose-400" />
                <span className="uppercase tracking-wider">
                  Availability Alert
                </span>
              </h3>
              <div className="space-y-3">
                {availabilityAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border p-3 flex items-center justify-between ${alert.color}`}
                  >
                    <span className="font-semibold text-sm">{alert.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {alert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Trends */}
            <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">
                Market Trends
              </h3>
              <div className="space-y-4">
                {marketTrends.map((trend, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${trend.change === "UP" ? "bg-emerald-400" : "bg-rose-400"}`}></div>
                      <span className="font-semibold text-slate-200">
                        {trend.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-300">
                        {trend.price}
                      </p>
                      <p className={`text-xs font-bold uppercase tracking-wider ${trend.change === "UP" ? "text-emerald-400" : "text-rose-400"}`}>
                        {trend.change === "UP" ? "▲" : "▼"} {Math.abs(trend.trend * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 rounded-lg border border-[#3c2458] bg-[#1a0f2a] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-400 hover:text-white uppercase tracking-wider">
                View Full Market Analysis
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
