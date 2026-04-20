import StatsScreen from "./StatsScreen";

// These are simple placeholder pages until we build the real ones
export function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
      <p className="text-slate-400 mt-2">Welcome to your AI FPL Analytics.</p>
    </div>
  );
}

export function Squad() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Squad Management</h1>
    </div>
  );
}

export function Transfers() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Transfers Hub</h1>
    </div>
  );
}

export function Stats() {
  return <StatsScreen />;
}

export function Alerts() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Smart Alerts</h1>
    </div>
  );
}

export function More() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">More Tools</h1>
      <p className="mt-2 text-slate-400">
        Additional AI modules and utilities will appear here.
      </p>
    </div>
  );
}
