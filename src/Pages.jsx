import { useState } from "react";
import Home from "./Home";
import SquadPage from "./SquadPage";
import TransfersPage from "./TransfersPage";
import PlayerAnalyst from "./PlayerAnalyst";
import AlertsPage from "./AlertsPage";
import ComparePage from "./ComparePage";
import PremiumPage from "./PremiumPage";
import CheckoutPage from "./CheckoutPage";
import AdminPage from "./AdminPage";
import { useNavigate } from "react-router-dom";

// ==================== Home Page ====================
export { Home };

// ==================== Squad Page (Players Management) ====================
export function Squad() {
  return <SquadPage />;
}

// ==================== Transfers Page ====================
export function Transfers() {
  return <TransfersPage />;
}

// ==================== Stats Page ====================
export function Stats() {
  return <PlayerAnalyst />;
}

// ==================== Alerts Page ====================
export function Alerts() {
  return <AlertsPage />;
}

// ==================== More Tools Page ====================
export function More() {
  const [selectedTool, setSelectedTool] = useState(null);
  const navigate = useNavigate();

  const tools = [
    {
      title: "AI Injury Predictor",
      desc: "Predict player injuries before they happen",
      icon: "🏥",
      path: "/stats",
    },
    {
      title: "Player Compare",
      desc: "Compare two players with live metrics",
      icon: "📅",
      path: "/compare",
    },
    {
      title: "Premium Plans",
      desc: "Explore the upgraded membership tiers",
      icon: "🔄",
      path: "/premium",
    },
    {
      title: "Secure Checkout",
      desc: "Complete a payment flow with stateful checkout",
      icon: "📊",
      path: "/checkout",
    },
    {
      title: "Admin Console",
      desc: "Manage users and account states",
      icon: "📈",
      path: "/admin",
    },
    {
      title: "API Docs",
      desc: "Developer documentation",
      icon: "📚",
      path: "/profile",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">More Tools</h1>
        <p className="text-slate-400 mt-2">Advanced analytics and utilities</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedTool(tool);
              if (tool.path) {
                navigate(tool.path);
              }
            }}
            className={`rounded-2xl border bg-[#1e102f] p-6 transition text-left group ${
              selectedTool?.title === tool.title
                ? "border-emerald-400"
                : "border-[#3d245b] hover:border-emerald-400/50"
            }`}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition">
              {tool.icon}
            </div>
            <h3 className="font-bold text-white group-hover:text-emerald-400 transition">
              {tool.title}
            </h3>
            <p className="text-sm text-slate-400 mt-2">{tool.desc}</p>
          </button>
        ))}
      </div>

      {selectedTool ? (
        <div className="rounded-xl border border-[#3d245b] bg-[#1e102f] p-4">
          <p className="text-xs uppercase tracking-wider text-emerald-300 font-bold">
            Selected Tool
          </p>
          <h3 className="mt-2 text-lg font-bold text-white">
            {selectedTool.title}
          </h3>
          <p className="mt-1 text-slate-400">{selectedTool.desc}</p>
        </div>
      ) : null}
    </div>
  );
}

export { ComparePage, PremiumPage, CheckoutPage, AdminPage };
