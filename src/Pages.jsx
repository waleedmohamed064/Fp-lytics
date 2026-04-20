import Home from "./Home";
import SquadPage from "./SquadPage";
import TransfersPage from "./TransfersPage";
import PlayerAnalyst from "./PlayerAnalyst";
import AlertsPage from "./AlertsPage";

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">More Tools</h1>
        <p className="text-slate-400 mt-2">Advanced analytics and utilities</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          {
            title: "AI Injury Predictor",
            desc: "Predict player injuries before they happen",
            icon: "🏥",
          },
          {
            title: "Fixture Analyzer",
            desc: "Deep dive into upcoming fixtures",
            icon: "📅",
          },
          {
            title: "Transfer Simulator",
            desc: "Simulate transfers and their impact",
            icon: "🔄",
          },
          {
            title: "Ownership Tracker",
            desc: "Track popular ownership trends",
            icon: "📊",
          },
          {
            title: "Points Projector",
            desc: "Project your points for upcoming weeks",
            icon: "📈",
          },
          {
            title: "API Docs",
            desc: "Developer documentation",
            icon: "📚",
          },
        ].map((tool, idx) => (
          <button
            key={idx}
            className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6 hover:border-emerald-400/50 transition text-left group"
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
    </div>
  );
}
