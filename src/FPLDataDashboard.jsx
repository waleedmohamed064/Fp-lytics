import React from 'react';

/**
 * FPL Data Dashboard Component
 * Currently disabled - FPL API functions have been removed
 * To restore, restore FPL functions from api.fpl-backup.js
 */
function FPLDataDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">FPL Data Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Fantasy Premier League integration currently disabled
        </p>
      </div>

      <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">
        <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Feature Disabled</h3>
        <p className="text-yellow-300 text-sm mb-4">
          The FPL Data Dashboard has been temporarily disabled. To restore this feature:
        </p>
        <ul className="text-yellow-300 text-sm space-y-2 mb-4">
          <li>• Check the api.fpl-backup.js file for FPL functions</li>
          <li>• Restore the functions to api.js</li>
          <li>• Update imports in this component</li>
        </ul>
        <p className="text-yellow-300 text-xs">
          Use other dashboard features or contact support for more information.
        </p>
      </div>
    </div>
  );
}


        <div className="text-center">
          <Loader2 className="animate-spin text-emerald-300 mx-auto mb-4" size={32} />
          <p className="text-slate-400">Loading FPL Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white">FPL Data Dashboard</h1>
          <p className="text-slate-400 mt-2">
            Real-time Fantasy Premier League statistics and player information
          </p>
        </div>
        
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <h3 className="text-red-400 font-semibold mb-2">Error Loading Data</h3>
          <p className="text-red-300 text-sm mb-4">{error}</p>
          <div className="mb-4 p-4 bg-red-900/30 rounded text-red-200 text-sm">
            <p className="font-semibold mb-2">💡 Troubleshooting Tips:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Check your internet connection</li>
              <li>The FPL API might be temporarily unavailable</li>
              <li>Try clearing browser cache (Ctrl+Shift+Delete)</li>
              <li>Open DevTools (F12 → Console) to see detailed error logs</li>
              <li>If problem persists, try again in a few minutes</li>
            </ul>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              const fetchFPLData = async () => {
                try {
                  setLoading(true);
                  const [bootstrap, fixturesData, standings] = await Promise.all([
                    getFPLBootstrapData(),
                    getFPLFixtures(),
                    getFPLTeamStandings(),
                  ]);

                  setBootstrapData(bootstrap);
                  setFixtures(fixturesData);
                  setTeamStandings(standings);
                  setError(null);
                } catch (err) {
                  console.error("Error fetching FPL data:", err);
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              };
              fetchFPLData();
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentGameweek =
    bootstrapData?.events?.find((e) => e.is_current)?.id || 1;
  const players = bootstrapData?.elements || [];
  const teams = bootstrapData?.teams || [];
  const positions = bootstrapData?.element_types || [];

  // Get top players by points
  const topPlayers = [...players]
    .sort((a, b) => b.total_points - a.total_points)
    .slice(0, 10);

  // Get team lookup
  const teamMap = {};
  teams.forEach((team) => {
    teamMap[team.id] = team;
  });

  // Get position lookup
  const positionMap = {};
  positions.forEach((pos) => {
    positionMap[pos.id] = pos;
  });

  // Get upcoming fixtures
  const upcomingFixtures = fixtures
    .filter((f) => !f.finished)
    .slice(0, 10);

  // Tab Content Components
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Calendar size={24} />}
          label="Current Gameweek"
          value={currentGameweek}
          color="bg-blue-500/10"
        />
        <StatCard
          icon={<Users size={24} />}
          label="Total Players"
          value={players.length}
          color="bg-purple-500/10"
        />
        <StatCard
          icon={<Shield size={24} />}
          label="Total Teams"
          value={teams.length}
          color="bg-cyan-500/10"
        />
        <StatCard
          icon={<Zap size={24} />}
          label="Upcoming Fixtures"
          value={upcomingFixtures.length}
          color="bg-yellow-500/10"
        />
      </div>

      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="text-emerald-300" size={24} />
          Top 10 Players by Points
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400">Rank</th>
                <th className="text-left py-3 px-4 text-slate-400">Player</th>
                <th className="text-left py-3 px-4 text-slate-400">Team</th>
                <th className="text-left py-3 px-4 text-slate-400">Position</th>
                <th className="text-right py-3 px-4 text-slate-400">Points</th>
                <th className="text-right py-3 px-4 text-slate-400">Price</th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player, idx) => (
                <tr
                  key={player.id}
                  className="border-b border-slate-800 hover:bg-slate-900/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-400">{idx + 1}</td>
                  <td className="py-3 px-4 text-white font-semibold">
                    {player.first_name} {player.second_name}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {teamMap[player.team]?.short_name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {positionMap[player.element_type]?.singular || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-emerald-400 font-semibold">
                      {player.total_points}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-300">
                    £{(player.now_cost / 10).toFixed(1)}m
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPlayers = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.slice(0, 30).map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            team={teamMap[player.team]}
            position={positionMap[player.element_type]}
          />
        ))}
      </div>
      <p className="text-slate-400 text-sm">
        Showing 30 of {players.length} players
      </p>
    </div>
  );

  const renderTeams = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="rounded-xl border border-[#3d245b] bg-[#1e102f] p-5 hover:border-emerald-400/50 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-white">{team.name}</h4>
              <p className="text-slate-400 text-sm">{team.short_name}</p>
            </div>
            <span className="text-2xl font-bold text-emerald-400">
              {team.points}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-500">Position</p>
              <p className="text-white font-semibold">{team.position}</p>
            </div>
            <div>
              <p className="text-slate-500">Played</p>
              <p className="text-white font-semibold">{team.played}</p>
            </div>
            <div>
              <p className="text-slate-500">Wins</p>
              <p className="text-emerald-400 font-semibold">{team.win}</p>
            </div>
            <div>
              <p className="text-slate-500">Draws</p>
              <p className="text-yellow-400 font-semibold">{team.draw}</p>
            </div>
            <div>
              <p className="text-slate-500">Goals For</p>
              <p className="text-white">{team.points_for}</p>
            </div>
            <div>
              <p className="text-slate-500">Goals Against</p>
              <p className="text-red-400">{team.points_against}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFixtures = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Upcoming Fixtures</h3>
      <div className="space-y-3">
        {upcomingFixtures.map((fixture) => (
          <div
            key={fixture.id}
            className="rounded-lg border border-[#3d245b] bg-[#1e102f] p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <p className="text-slate-400 text-sm mb-2">
                GW {fixture.event}: {new Date(fixture.kickoff_time).toLocaleString()}
              </p>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {teamMap[fixture.team_h]?.short_name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">vs</span>
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {teamMap[fixture.team_a]?.short_name}
                  </p>
                </div>
              </div>
            </div>
            {fixture.started ? (
              <div className="text-right">
                <p className="text-emerald-400 font-bold text-lg">
                  {fixture.team_h_score} - {fixture.team_a_score}
                </p>
              </div>
            ) : (
              <div className="text-right text-slate-400">Scheduled</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">FPL Data Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Real-time Fantasy Premier League statistics and player information
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "overview", label: "Overview", icon: "📊" },
          { id: "players", label: "Players", icon: "👥" },
          { id: "teams", label: "Teams", icon: "🏆" },
          { id: "fixtures", label: "Fixtures", icon: "⚽" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-emerald-500 text-white"
                : "bg-[#2a1640] text-slate-300 hover:bg-[#3d245b]"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "players" && renderPlayers()}
        {activeTab === "teams" && renderTeams()}
        {activeTab === "fixtures" && renderFixtures()}
      </div>
    </div>
  );
}

// Helper Component: Stat Card
function StatCard({ icon, label, value, color }) {
  return (
    <div className={`rounded-xl border border-[#3d245b] ${color} p-5`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm font-medium">{label}</span>
        <span className="text-emerald-400">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

// Helper Component: Player Card
function PlayerCard({ player, team, position }) {
  return (
    <div className="rounded-lg border border-[#3d245b] bg-[#2a1640]/50 p-4 hover:border-emerald-400/30 transition-colors">
      <div className="mb-3">
        <h4 className="text-white font-bold">
          {player.first_name} {player.second_name}
        </h4>
        <p className="text-slate-400 text-sm">
          {team?.short_name} • {position?.singular}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div>
          <p className="text-slate-500">Points</p>
          <p className="text-emerald-400 font-semibold">{player.total_points}</p>
        </div>
        <div>
          <p className="text-slate-500">Price</p>
          <p className="text-white font-semibold">£{(player.now_cost / 10).toFixed(1)}m</p>
        </div>
        <div>
          <p className="text-slate-500">Form</p>
          <p className="text-white">{parseFloat(player.form).toFixed(1)}</p>
        </div>
        <div>
          <p className="text-slate-500">Status</p>
          <p
            className={`font-semibold text-xs ${
              player.status === "a" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {player.status === "a" ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>
      <div className="text-xs text-slate-500">
        <p>Selected by {player.selected_by_percent}%</p>
      </div>
    </div>
  );
}

export default FPLDataDashboard;
