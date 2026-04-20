import { useState } from "react";
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Filter,
} from "lucide-react";

function AlertsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const alerts = [
    {
      id: 1,
      type: "price_rise",
      player: "Erling Haaland",
      team: "Manchester City",
      price: "£15.4m",
      change: "+0.3m",
      changePercent: "2%",
      reason: "Status changed from Unavailable to Available",
      timestamp: "2 hours ago",
      priority: "HIGH",
      badgeColor: "bg-green-900",
      textColor: "text-green-400",
    },
    {
      id: 2,
      type: "price_drop",
      player: "Cole Palmer",
      team: "Chelsea",
      price: "£10.3m",
      change: "-0.2m",
      changePercent: "2%",
      reason: "Form dip: 2 consecutive poor performances",
      timestamp: "5 hours ago",
      priority: "MEDIUM",
      badgeColor: "bg-yellow-900",
      textColor: "text-yellow-400",
    },
    {
      id: 3,
      type: "fixture_alert",
      player: "Gameweek 14 Deadline",
      team: "All Teams",
      price: "4 hours and 23 minutes",
      change: "Approaching",
      changePercent: "⏰",
      reason:
        "The deadline for GW14 is fast approaching. Make your final transfers!",
      timestamp: "Just now",
      priority: "CRITICAL",
      badgeColor: "bg-red-900",
      textColor: "text-red-400",
    },
  ];

  const marketTrends = [
    {
      name: "Richardson",
      price: "£7.2m",
      change: "+0.1m",
      trend: "up",
      owners: "15K+",
      prediction: "Expected to rise",
    },
    {
      name: "Salah",
      price: "£13.9m",
      change: "-0.2m",
      trend: "down",
      owners: "52K+",
      prediction: "Risk of further drops",
    },
    {
      name: "Palmer",
      price: "£10.3m",
      change: "-0.1m",
      trend: "down",
      owners: "28K+",
      prediction: "Stabilizing",
    },
  ];

  const yourTransfers = [
    {
      id: 1,
      player: "Cole Palmer",
      team: "Chelsea",
      action: "Sell",
      reason: "Good fixture run ending",
      daysLeft: 3,
    },
    {
      id: 2,
      player: "Rico Henry",
      team: "Arsenal",
      action: "Buy",
      reason: "Great fixtures ahead",
      daysLeft: 7,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Smart Alerts</h1>
          <p className="text-slate-400 mt-1">
            Stay ahead with real-time notifications
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4d2f70] bg-[#241239] text-emerald-400 hover:border-emerald-400/50 transition">
          <Filter size={16} />
          Filter Alerts
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#3c2458]">
        {["all", "price", "news", "fixture"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-semibold uppercase tracking-wider transition ${
              activeTab === tab
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab === "all"
              ? "All Alerts"
              : tab === "price"
                ? "Price Changes"
                : tab === "news"
                  ? "Squad News"
                  : "Fixture Watch"}
          </button>
        ))}
      </div>

      {/* Alert Items */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-xl border border-[#3d245b] bg-[#1e102f] p-4 hover:border-emerald-400/30 transition overflow-hidden relative`}
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 ${alert.badgeColor} opacity-5 blur-2xl rounded-full`}
            ></div>

            <div className="relative flex items-start gap-4">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-lg ${alert.badgeColor} bg-opacity-20 flex items-center justify-center flex-shrink-0`}
              >
                {alert.type === "price_rise" ? (
                  <TrendingUp className={alert.textColor} size={20} />
                ) : alert.type === "price_drop" ? (
                  <TrendingDown className={alert.textColor} size={20} />
                ) : (
                  <Clock className={alert.textColor} size={20} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-white">{alert.player}</h3>
                    <p className="text-xs text-slate-400 mt-1">{alert.team}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded ${
                      alert.priority === "CRITICAL"
                        ? "bg-red-900/50 text-red-300"
                        : alert.priority === "HIGH"
                          ? "bg-emerald-900/50 text-emerald-300"
                          : "bg-yellow-900/50 text-yellow-300"
                    }`}
                  >
                    {alert.priority}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 my-3">
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="text-sm font-semibold text-white mt-1">
                      {alert.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Change</p>
                    <p
                      className={`text-sm font-semibold mt-1 ${
                        alert.change.startsWith("+")
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {alert.change} ({alert.changePercent})
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">When</p>
                    <p className="text-sm text-slate-300 mt-1">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 p-2 bg-[#241239] rounded border border-[#4d2f70]">
                  {alert.reason}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 ml-4">
                <button className="px-3 py-1 text-xs font-bold rounded bg-emerald-400/20 text-emerald-300 hover:bg-emerald-400/30 transition whitespace-nowrap">
                  View Info
                </button>
                <button className="px-3 py-1 text-xs font-bold rounded border border-slate-600 text-slate-300 hover:border-slate-400 transition whitespace-nowrap">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Your Injures & Load Alerts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            🏥 Your Injuries & News
          </h2>
          <div className="space-y-2">
            <div className="p-3 rounded-lg border border-yellow-900/50 bg-yellow-900/20">
              <p className="text-xs font-bold text-yellow-300">
                MODERATE RISK: Salah
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Confirmed available but may need rest rotation
              </p>
            </div>
            <div className="p-3 rounded-lg border border-green-900/50 bg-green-900/20">
              <p className="text-xs font-bold text-green-300">
                ALL CLEAR: Team
              </p>
              <p className="text-xs text-slate-300 mt-1">
                No major injuries in your squad
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h2 className="text-lg font-bold text-white mb-4">
            📊 Suggested Transfers
          </h2>
          <div className="space-y-3">
            {yourTransfers.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-lg border border-[#4d2f70] bg-[#241239]"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {t.player}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{t.reason}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      t.action === "Sell"
                        ? "bg-rose-900/50 text-rose-300"
                        : "bg-emerald-900/50 text-emerald-300"
                    }`}
                  >
                    {t.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Trends */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        <h2 className="text-lg font-bold text-white mb-4">
          💹 Price Prediction
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {marketTrends.map((trend, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-[#4d2f70] bg-[#241239] hover:border-emerald-400/50 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{trend.name}</h4>
                {trend.trend === "up" ? (
                  <TrendingUp className="text-emerald-400" size={16} />
                ) : (
                  <TrendingDown className="text-rose-400" size={16} />
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current</span>
                  <span className="text-white font-semibold">
                    {trend.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Change</span>
                  <span
                    className={`font-semibold ${
                      trend.change.startsWith("+")
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {trend.change}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Owners</span>
                  <span className="text-emerald-300">{trend.owners}</span>
                </div>
                <div className="p-2 bg-emerald-900/20 rounded border border-emerald-700/50 text-xs text-emerald-300 mt-2">
                  {trend.prediction}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AlertsPage;
