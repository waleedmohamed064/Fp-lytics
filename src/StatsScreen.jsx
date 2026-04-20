import { useEffect, useMemo, useState } from "react";
import mockApiData from "./mockApiData";
import PlayerCard from "./PlayerCard";

const PRICE_RANGES = [
  { value: "all", label: "All Prices" },
  { value: "budget", label: "Budget (<= 8.0)" },
  { value: "mid", label: "Mid (8.1 - 11.0)" },
  { value: "premium", label: "Premium (>= 11.1)" },
];

function StatsScreen() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [positionFilter, setPositionFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");

  useEffect(() => {
    setIsLoading(true);

    const timerId = setTimeout(() => {
      // Real API integration point:
      // Replace this with an async fetch/axios request and setPlayers(response.data).
      setPlayers(mockApiData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  const positionOptions = useMemo(
    () => ["all", ...new Set(mockApiData.map((player) => player.position))],
    [],
  );

  const teamOptions = useMemo(
    () => ["all", ...new Set(mockApiData.map((player) => player.team))],
    [],
  );

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesPosition =
        positionFilter === "all" || player.position === positionFilter;
      const matchesTeam = teamFilter === "all" || player.team === teamFilter;

      let matchesPriceRange = true;
      if (priceRangeFilter === "budget") {
        matchesPriceRange = player.price <= 8;
      } else if (priceRangeFilter === "mid") {
        matchesPriceRange = player.price > 8 && player.price <= 11;
      } else if (priceRangeFilter === "premium") {
        matchesPriceRange = player.price > 11;
      }

      return matchesPosition && matchesTeam && matchesPriceRange;
    });
  }, [players, positionFilter, priceRangeFilter, teamFilter]);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(53,25,84,0.9)_0%,rgba(20,10,36,1)_45%,rgba(8,5,18,1)_100%)] p-4 text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className="rounded-2xl border border-[#3b2259] bg-[#1a0f2c]/90 p-5 shadow-[0_18px_40px_rgba(5,0,18,0.5)]">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
            Stats
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Player Performance Explorer
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Use filters to simulate how players are fetched and explored in the
            FPL analytics app.
          </p>
        </header>

        <div className="mt-6 grid gap-4 rounded-2xl border border-[#3b2259] bg-[#160b27]/90 p-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
              Position
            </span>
            <select
              value={positionFilter}
              onChange={(event) => setPositionFilter(event.target.value)}
              className="w-full rounded-lg border border-[#4d2f70] bg-[#23113a] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
            >
              {positionOptions.map((position) => (
                <option key={position} value={position}>
                  {position === "all" ? "All Positions" : position}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
              Price Range
            </span>
            <select
              value={priceRangeFilter}
              onChange={(event) => setPriceRangeFilter(event.target.value)}
              className="w-full rounded-lg border border-[#4d2f70] bg-[#23113a] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
            >
              {PRICE_RANGES.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
              Team
            </span>
            <select
              value={teamFilter}
              onChange={(event) => setTeamFilter(event.target.value)}
              className="w-full rounded-lg border border-[#4d2f70] bg-[#23113a] px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
            >
              {teamOptions.map((team) => (
                <option key={team} value={team}>
                  {team === "all" ? "All Teams" : team}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-[#3b2259] bg-[#1a0f2c]/75">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-300/25 border-t-emerald-400" />
              <p className="mt-4 text-sm font-medium text-emerald-300">
                Loading players...
              </p>
            </div>
          ) : filteredPlayers.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#3b2259] bg-[#1a0f2c]/80 p-8 text-center text-sm text-slate-300">
              No players match the selected filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StatsScreen;
