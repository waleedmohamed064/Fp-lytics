  import { useEffect, useMemo, useState } from "react";
import { Search, Download, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import mockApiData from "./mockApiData";

const ITEMS_PER_PAGE = 4;

function StatsScreen() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [positionFilter, setPositionFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const teamOptions = useMemo(
    () => ["all", ...new Set(mockApiData.map((player) => player.team))],
    [],
  );

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesPosition =
        positionFilter === "all" || player.position === positionFilter;
      const matchesTeam = teamFilter === "all" || player.team === teamFilter;
      const matchesSearch =
        searchQuery === "" ||
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesPriceRange = true;
      if (priceRangeFilter === "budget") {
        matchesPriceRange = player.price <= 8;
      } else if (priceRangeFilter === "mid") {
        matchesPriceRange = player.price > 8 && player.price <= 11;
      } else if (priceRangeFilter === "premium") {
        matchesPriceRange = player.price > 11;
      }

      return matchesPosition && matchesTeam && matchesPriceRange && matchesSearch;
    });
  }, [players, positionFilter, priceRangeFilter, teamFilter, searchQuery]);

  const displayPlayers = useMemo(() => {
    if (isPremium) {
      return filteredPlayers;
    }
    return filteredPlayers.slice(0, 4);
  }, [filteredPlayers, isPremium]);

  const totalPages = Math.ceil(displayPlayers.length / ITEMS_PER_PAGE);
  const paginatedPlayers = displayPlayers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section className="min-h-screen bg-[#130b20] text-slate-100 p-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search players, teams or metrics..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-xl border border-[#3b2259] bg-[#1a0f2c] py-3 pl-12 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 italic">Differential Gems</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Salah",
                team: "Liverpool",
                position: "MID",
                pred: "112%",
                p0: "0.82",
                pa: "0.45",
                pts: "8.5",
              },
              {
                name: "Haaland",
                team: "Manchester City",
                position: "FWD",
                pred: "58%",
                p0: "1.04",
                pa: "0.12",
                pts: "6.2",
              },
              {
                name: "Son",
                team: "Tottenham",
                position: "MID",
                pred: "87%",
                p0: "0.55",
                pa: "0.38",
                pts: "7.4",
              },
              {
                name: "Raya",
                team: "Arsenal",
                position: "GKP",
                pred: "72%",
                p0: "0",
                pa: "42",
                pts: "5.8",
              },
            ].map((player, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-[#3b2259] bg-[#1e102f] overflow-hidden p-4 hover:border-emerald-400/50 transition"
              >
                <div className="absolute top-3 right-3 bg-emerald-400/20 border border-emerald-400/50 rounded-lg px-2 py-1">
                  <span className="text-xs font-bold text-emerald-300">{player.pred}</span>
                </div>
                <div className="pr-12">
                  <h3 className="font-bold text-white text-lg">{player.name}</h3>
                  <p className="text-xs text-slate-400">
                    {player.team} • {player.position}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#3c2458]">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">PRED G</p>
                      <p className="text-sm font-bold text-slate-300">{player.p0}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">PRED A</p>
                      <p className="text-sm font-bold text-slate-300">{player.pa}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">PRED PTS</p>
                      <p className="text-sm font-bold text-emerald-400">{player.pts}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white uppercase italic tracking-wider">Player Explorer</h2>
              <p className="text-sm text-slate-400 mt-1">
                Advanced statistical filtering and comparative performance data
              </p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg border border-[#3b2259] bg-[#1a0f2c] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-emerald-400/50 hover:text-emerald-400">
                <Download size={16} />
                Export CSV
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-[#3b2259] bg-[#1a0f2c] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-emerald-400/50 hover:text-emerald-400">
                <Share2 size={16} />
                Share View
              </button>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Position</label>
              <div className="flex gap-2 flex-wrap">
                {["ALL", "GKP", "DEF", "MID", "FWD"].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPositionFilter(pos === "ALL" ? "all" : pos)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                      (pos === "ALL" && positionFilter === "all") ||
                      (pos !== "ALL" && positionFilter === pos)
                        ? "bg-emerald-400 text-[#072015] border border-emerald-400"
                        : "border border-[#3b2259] bg-[#1a0f2c] text-slate-300 hover:border-emerald-400/50"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Price Range (£)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value="4.0"
                  readOnly
                  className="w-12 rounded-lg border border-[#3b2259] bg-[#1a0f2c] px-2 py-1 text-xs text-emerald-400 text-center font-bold"
                />
                <span className="text-slate-400">-</span>
                <input
                  type="text"
                  value="13.9"
                  readOnly
                  className="w-12 rounded-lg border border-[#3b2259] bg-[#1a0f2c] px-2 py-1 text-xs text-emerald-400 text-center font-bold"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Team Select</label>
              <select
                value={teamFilter}
                onChange={(event) => setTeamFilter(event.target.value)}
                className="w-full rounded-lg border border-[#3b2259] bg-[#1a0f2c] px-3 py-1 text-xs text-slate-100 outline-none transition focus:border-emerald-400"
              >
                {teamOptions.map((team) => (
                  <option key={team} value={team}>
                    {team === "all" ? "All 20 Teams" : team}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-3 flex gap-2">
              <button
                onClick={() => {
                  setPositionFilter("all");
                  setTeamFilter("all");
                  setPriceRangeFilter("all");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="flex-1 rounded-lg border border-[#3b2259] bg-[#1a0f2c] px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:border-emerald-400/50 hover:text-white"
              >
                Reset Filters
              </button>
              <select className="flex-1 rounded-lg border border-[#3b2259] bg-[#1a0f2c] px-3 py-1 text-xs text-slate-100 outline-none transition focus:border-emerald-400">
                <option>Sort By: Points</option>
                <option>Sort By: Price</option>
                <option>Sort By: Form</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider italic">Performance Breakdown</h3>

          {isLoading ? (
            <div className="flex min-h-96 items-center justify-center rounded-2xl border border-[#3b2259] bg-[#1a0f2c]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-300/25 border-t-emerald-400" />
            </div>
          ) : filteredPlayers.length > 0 ? (
            <>
              <div className="overflow-x-auto rounded-2xl border border-[#3b2259] bg-[#1a0f2c]/75">
                <table className="w-full text-sm">
                  <thead className="border-b border-[#3b2259] bg-[#1a0f2c]/50">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-bold uppercase text-slate-400 tracking-wider">Player Details</th>
                      <th className="px-4 py-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Points</th>
                      <th className="px-4 py-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Predict G</th>
                      <th className="px-4 py-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Predict A</th>
                      <th className="px-4 py-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Predict CS</th>
                      <th className="px-4 py-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Price</th>
                      <th className="px-4 py-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Pred Pts</th>
                      <th className="px-4 py-4 text-center text-xs font-bold uppercase text-slate-400 tracking-wider">Recent Form</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#3b2259]">
                    {paginatedPlayers.map((player, idx) => (
                      <tr key={idx} className="hover:bg-[#1a0f2c]/50 transition">
                        <td className="px-4 py-4 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                            {player.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{player.name}</p>
                            <p className="text-xs text-slate-400">{player.team} • {player.position}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-white font-bold">{Math.floor(Math.random() * 120) + 50}</td>
                        <td className="px-4 py-4 text-center text-slate-300">{(Math.random() * 2).toFixed(1)}</td>
                        <td className="px-4 py-4 text-center text-slate-300">{(Math.random() * 1.5).toFixed(2)}</td>
                        <td className="px-4 py-4 text-center text-cyan-300 font-bold">{(Math.random() * 200).toFixed(1)}</td>
                        <td className="px-4 py-4 text-center text-slate-300">£{player.price.toFixed(1)}m</td>
                        <td className="px-4 py-4 text-center text-emerald-400 font-bold">{(Math.random() * 8).toFixed(1)}</td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex gap-0.5 justify-center">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="w-1.5 h-4 bg-emerald-400 rounded-sm opacity-75"></div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!isPremium && filteredPlayers.length > 4 && (
                <div className="mt-4 text-center py-4 rounded-lg border border-[#3b2259] bg-[#1a0f2c]/50">
                  <p className="text-sm text-slate-300">GO TO PREMIUM TO SHOW TOP {filteredPlayers.length} PLAYERS</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-[#3b2259] bg-[#1a0f2c] p-2 text-slate-400 transition hover:text-emerald-400 disabled:opacity-50"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {getPageNumbers().map((page, idx) => (
                    <button
                      key={idx}
                      onClick={() => typeof page === "number" && setCurrentPage(page)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        page === currentPage
                          ? "bg-emerald-400 text-[#072015] border border-emerald-400"
                          : "border border-[#3b2259] bg-[#1a0f2c] text-slate-300 hover:border-emerald-400/50"
                      } ${page === "..." ? "cursor-default hover:border-[#3b2259]" : "cursor-pointer"}`}
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-[#3b2259] bg-[#1a0f2c] p-2 text-slate-400 transition hover:text-emerald-400 disabled:opacity-50"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-96 items-center justify-center rounded-2xl border border-[#3b2259] bg-[#1a0f2c]">
              <p className="text-slate-400">No players found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StatsScreen;
