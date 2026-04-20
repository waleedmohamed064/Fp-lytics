import { useState } from "react";
import { Users, BarChart3, ArrowLeft, Download } from "lucide-react";

function PlayerAnalyst() {
  const [selectedPlayers, setSelectedPlayers] = useState([
    "Salah",
    "Haaland",
    "Palmer",
  ]);

  const players = [
    {
      name: "M. Salah",
      team: "Liverpool",
      position: "MID",
      stats: {
        form: 0.78,
        value: 254.2,
        xPoints: 18,
        fixtureAvg: 0.92,
      },
      image:
        "https://resources.premierleague.com/premierleague/photos/players/250x250/p1.png",
    },
    {
      name: "E. Haaland",
      team: "Manchester City",
      position: "FWD",
      stats: {
        form: 0.92,
        value: 198.5,
        xPoints: 19,
        fixtureAvg: 0.88,
      },
      image:
        "https://resources.premierleague.com/premierleague/photos/players/250x250/p287.png",
    },
    {
      name: "C. Palmer",
      team: "Chelsea",
      position: "MID",
      stats: {
        form: 0.85,
        value: 176.8,
        xPoints: 15,
        fixtureAvg: 0.81,
      },
      image:
        "https://resources.premierleague.com/premierleague/photos/players/250x250/p223.png",
    },
  ];

  const radarData = [
    { axis: "Form", value: 85, color: "#00e676" },
    { axis: "Value", value: 72, color: "#00bcd4" },
    { axis: "xPoints", value: 88, color: "#9c27b0" },
    { axis: "Consistency", value: 78, color: "#ff6b6b" },
    { axis: "Fixtures", value: 82, color: "#ffd700" },
  ];

  // Simple Radar Chart SVG
  const RadarChart = ({ data }) => {
    const size = 200;
    const center = size / 2;
    const maxValue = 100;
    const levels = 4;
    const angleSlice = (Math.PI * 2) / data.length;

    const getCoordinates = (value, index) => {
      const angle = angleSlice * index - Math.PI / 2;
      const radius = (value / maxValue) * (size / 3);
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    };

    const getPolygonPoints = () => {
      return data
        .map((item, i) => getCoordinates(item.value, i))
        .map((p) => `${p.x},${p.y}`)
        .join(" ");
    };

    const getAxisPoints = (level) => {
      return data
        .map((_, i) => getCoordinates((level / levels) * maxValue, i))
        .map((p) => `${p.x},${p.y}`)
        .join(" ");
    };

    return (
      <svg width={size} height={size} className="mx-auto">
        {/* Grid levels */}
        {Array.from({ length: levels }).map((_, level) => (
          <polygon
            key={`level-${level}`}
            points={getAxisPoints(level + 1)}
            fill="none"
            stroke="rgba(0, 230, 118, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {data.map((item, i) => {
          const coords = getCoordinates(maxValue, i);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={coords.x}
              y2={coords.y}
              stroke="rgba(0, 230, 118, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={getPolygonPoints()}
          fill="rgba(0, 230, 118, 0.1)"
          stroke="#00e676"
          strokeWidth="2"
        />

        {/* Labels */}
        {data.map((item, i) => {
          const coords = getCoordinates(maxValue * 1.2, i);
          return (
            <text
              key={`label-${i}`}
              x={coords.x}
              y={coords.y}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="10"
              className="font-semibold"
            >
              {item.axis}
            </text>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white">Player Analyst</h1>
          <p className="text-slate-400 mt-1">
            Comparing performance metrics for Gameweek 24 Projections
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4d2f70] bg-[#241239] text-emerald-400 hover:border-emerald-400/50 transition">
          <Download size={16} />
          Sort Data
        </button>
      </div>

      {/* Player Selection */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          Compare Players
        </h2>
        <div className="grid grid-cols-6 gap-3">
          {players.map((player, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPlayers([player.name])}
              className={`p-3 rounded-lg border text-center transition ${
                selectedPlayers.includes(player.name)
                  ? "border-emerald-400 bg-emerald-400/10"
                  : "border-[#4d2f70] bg-[#241239] hover:border-emerald-400/50"
              }`}
            >
              <img
                src={player.image}
                alt={player.name}
                className="w-12 h-12 rounded-lg mx-auto mb-2 border border-emerald-400/30"
              />
              <p className="text-xs font-bold text-white">{player.name}</p>
              <p className="text-[10px] text-emerald-400 mt-1">
                {player.position}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Key Stats Comparison */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Form", value: "0.78", trend: "up" },
          { label: "Value", value: "254.2", trend: "up" },
          { label: "xPoints", value: "18", trend: "up" },
          { label: "Fixture Avg", value: "0.92", trend: "down" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-[#4d2f70] bg-[#241239] p-4 text-center"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-emerald-400">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Radar Chart Section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: Radar */}
        <div className="col-span-1 rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h3 className="text-sm font-bold text-white mb-4 uppercase">
            Statistical Breakdown
          </h3>
          <div className="flex flex-col items-center">
            <RadarChart data={radarData} />
            <div className="mt-4 space-y-2 w-full">
              {radarData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-slate-400">{item.axis}</span>
                  <span className="text-emerald-300 font-semibold">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Detailed Stats */}
        <div className="col-span-2 rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h3 className="text-sm font-bold text-white mb-4 uppercase">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { metric: "Form", value: "8.4", color: "emerald" },
              { metric: "Value", value: "8.2", color: "cyan" },
              { metric: "Consistency", value: "7.8", color: "purple" },
              { metric: "xPoints Potential", value: "8.9", color: "yellow" },
              { metric: "Fixture Difficulty", value: "7.2", color: "rose" },
              { metric: "Ownership", value: "High (48K+)", color: "emerald" },
              {
                metric: "Recommendation",
                value: "Transfer In",
                color: "green",
              },
              { metric: "Risk Level", value: "Medium", color: "yellow" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border border-${item.color}-900/50 bg-${item.color}-900/20`}
              >
                <p className={`text-xs font-bold text-${item.color}-300`}>
                  {item.metric}
                </p>
                <p className={`text-lg font-bold text-${item.color}-200 mt-1`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          Seasonal Statistics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#3c2458]">
                {[
                  "Player",
                  "Team",
                  "PTS",
                  "xA",
                  "xG",
                  "xGI",
                  "BPS",
                  "CS%",
                  "ICT Index",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-bold text-emerald-300 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  player: "Mohamed Salah",
                  team: "LIV",
                  pts: "224",
                  xa: "6.2",
                  xg: "8.5",
                  xgi: "14.7",
                  bps: "1145",
                  cs: "8.2",
                  ict: "7.5",
                },
                {
                  player: "Erling Haaland",
                  team: "MCI",
                  pts: "210",
                  xa: "3.9",
                  xg: "12.1",
                  xgi: "16.0",
                  bps: "1198",
                  cs: "8.8",
                  ict: "8.2",
                },
                {
                  player: "Cole Palmer",
                  team: "CHE",
                  pts: "198",
                  xa: "5.5",
                  xg: "7.3",
                  xgi: "12.8",
                  bps: "987",
                  cs: "7.1",
                  ict: "6.9",
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#3c2458] hover:bg-[#241239]/50 transition"
                >
                  <td className="px-4 py-3 font-semibold text-white">
                    {row.player}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{row.team}</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">
                    {row.pts}
                  </td>
                  <td className="px-4 py-3 text-cyan-400">{row.xa}</td>
                  <td className="px-4 py-3 text-purple-400">{row.xg}</td>
                  <td className="px-4 py-3 text-emerald-300">{row.xgi}</td>
                  <td className="px-4 py-3 text-yellow-400">{row.bps}</td>
                  <td className="px-4 py-3 text-blue-400">{row.cs}%</td>
                  <td className="px-4 py-3 text-rose-400">{row.ict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PlayerAnalyst;
