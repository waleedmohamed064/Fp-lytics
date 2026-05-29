import { useState } from "react";
import { Download } from "lucide-react";

function PlayerAnalyst() {
  const [sortBy, setSortBy] = useState("form");
  const [statusMessage, setStatusMessage] = useState(
    "Analyzing player metrics for Gameweek 24 Projections."
  );
  const [teamFilter, setTeamFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [predictedGoalsFilter, setPredictedGoalsFilter] = useState("all");

  const players = [
    {
      name: "M. Salah",
      team: "Liverpool",
      position: "MID",
      stats: {
        form: 0.78,
        price: 12.5,
        predictedPoints: 18,
        ownership: 0.92,
      },
      price: 12.5,
      predictedGoals: 2.1,
    },
    {
      name: "E. Haaland",
      team: "Manchester City",
      position: "FWD",
      stats: {
        form: 0.92,
        price: 11.8,
        predictedPoints: 19,
        ownership: 0.88,
      },
      price: 11.8,
      predictedGoals: 2.8,
    },
    {
      name: "C. Palmer",
      team: "Chelsea",
      position: "MID",
      stats: {
        form: 0.85,
        price: 9.2,
        predictedPoints: 15,
        ownership: 0.81,
      },
      price: 9.2,
      predictedGoals: 1.5,
    },
    {
      name: "B. Saka",
      team: "Arsenal",
      position: "MID",
      stats: {
        form: 0.88,
        price: 10.1,
        predictedPoints: 16,
        ownership: 0.79,
      },
      price: 10.1,
      predictedGoals: 1.8,
    },
    {
      name: "K. De Bruyne",
      team: "Manchester City",
      position: "MID",
      stats: {
        form: 0.81,
        price: 11.2,
        predictedPoints: 17,
        ownership: 0.75,
      },
      price: 11.2,
      predictedGoals: 1.9,
    },
  ];

  const radarData = [
    { axis: "Avg Pts Last 3GWs", value: 0.78, color: "#00e676" },
    { axis: "Price", value: 0.72, color: "#00bcd4" },
    { axis: "Predicted Pts", value: 0.88, color: "#9c27b0" },
    { axis: "Consistency", value: 0.78, color: "#ff6b6b" },
    { axis: "Ownership %", value: 0.82, color: "#ffd700" },
  ];

  const keyStats = [
    {
      label: "Avg Points Last 3GWs",
      value: "0.85",
    },
    {
      label: "Price",
      value: "10.96",
    },
    {
      label: "Predicted Points",
      value: "17.00",
    },
    {
      label: "Ownership %",
      value: "0.83",
    },
  ];

  const RadarChart = ({ data }) => {
    const size = 200;
    const center = size / 2;
    const maxValue = 1;
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Player Analyst</h1>
          <p className="text-slate-400 mt-1">
            Comparing performance metrics for Gameweek 24 Projections
          </p>
        </div>
        <button
          onClick={() => {
            const sortOrder = ["form", "price", "predictedPoints", "ownership"];
            const currentIndex = sortOrder.indexOf(sortBy);
            const nextSortBy = sortOrder[(currentIndex + 1) % sortOrder.length];
            setSortBy(nextSortBy);
            setStatusMessage(`Sorted players by ${nextSortBy}.`);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4d2f70] bg-[#241239] text-emerald-400 hover:border-emerald-400/50 transition"
        >
          <Download size={16} />
          Sort Data
        </button>
      </div>

      {/* Key Stats Comparison Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {keyStats.map((stat, idx) => (
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

      {/* Filters Row */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          Filter Options
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Team Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Team</label>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="w-full rounded-lg border border-[#4d2f70] bg-[#241239] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400"
            >
              <option value="all">All Teams</option>
              <option value="liv">Liverpool</option>
              <option value="mci">Manchester City</option>
              <option value="che">Chelsea</option>
              <option value="ars">Arsenal</option>
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Price</label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full rounded-lg border border-[#4d2f70] bg-[#241239] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget (&lt;10)</option>
              <option value="mid">Mid (10-12)</option>
              <option value="premium">&gt;12</option>
            </select>
          </div>

          {/* Position Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Position</label>
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="w-full rounded-lg border border-[#4d2f70] bg-[#241239] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400"
            >
              <option value="all">All Positions</option>
              <option value="mid">Midfielder</option>
              <option value="fwd">Forward</option>
              <option value="def">Defender</option>
            </select>
          </div>

          {/* Predicted Goals Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Predicted Goals</label>
            <select
              value={predictedGoalsFilter}
              onChange={(e) => setPredictedGoalsFilter(e.target.value)}
              className="w-full rounded-lg border border-[#4d2f70] bg-[#241239] px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400"
            >
              <option value="all">All Ranges</option>
              <option value="high">&gt;2.0</option>
              <option value="mid">1.5-2.0</option>
              <option value="low">&lt;1.5</option>
            </select>
          </div>
        </div>
      </div>

      {/* Seasonal Statistics Table */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          Player Statistics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#3c2458]">
                {[
                  "Player",
                  "Team",
                  "Position",
                  "Avg Pts L3GWs",
                  "Price",
                  "Predicted Pts",
                  "Ownership %",
                  "Pred Goals",
                  "Zico Stats",
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
              {players.map((player, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#3c2458] hover:bg-[#241239]/50 transition"
                >
                  <td className="px-4 py-3 font-semibold text-white">
                    {player.name}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{player.team}</td>
                  <td className="px-4 py-3 text-slate-300">{player.position}</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold">
                    {player.stats.form.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-cyan-400">
                    £{player.stats.price.toFixed(2)}m
                  </td>
                  <td className="px-4 py-3 text-purple-400">
                    {player.stats.predictedPoints}
                  </td>
                  <td className="px-4 py-3 text-emerald-300">
                    {(player.stats.ownership * 100).toFixed(0)}%
                  </td>
                  <td className="px-4 py-3 text-yellow-400">
                    {player.predictedGoals.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-blue-400">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="grid gap-4 xl:grid-cols-3">
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
                    {item.value.toFixed(2)}
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
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { metric: "Form", value: "0.85", color: "emerald" },
              { metric: "Price", value: "10.96", color: "cyan" },
              { metric: "Consistency", value: "0.78", color: "purple" },
              { metric: "Predicted Points", value: "17.00", color: "yellow" },
              { metric: "Fixture Difficulty", value: "0.72", color: "rose" },
              { metric: "Ownership %", value: "83%", color: "emerald" },
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

      <div className="rounded-xl border border-[#3d245b] bg-[#1e102f] p-3 text-sm text-slate-300">
        <span className="font-semibold text-white">Status:</span>{" "}
        {statusMessage}
      </div>
    </div>
  );
}

export default PlayerAnalyst;
//     {
//       name: "M. Salah",
//       team: "Liverpool",
//       position: "MID",
//       stats: {
//         form: 0.78,
//         value: 254.2,
//         xPoints: 18,
//         fixtureAvg: 0.92,
//       },
//       image:
//         "https://via.placeholder.com/120x120/1e102f/00e676?text=MS",
//     },
//     {
//       name: "E. Haaland",
//       team: "Manchester City",
//       position: "FWD",
//       stats: {
//         form: 0.92,
//         value: 198.5,
//         xPoints: 19,
//         fixtureAvg: 0.88,
//       },
//       image:
//         "https://via.placeholder.com/120x120/1e102f/00e676?text=EH",
//     },
//     {
//       name: "C. Palmer",
//       team: "Chelsea",
//       position: "MID",
//       stats: {
//         form: 0.85,
//         value: 176.8,
//         xPoints: 15,
//         fixtureAvg: 0.81,
//       },
//       image:
//         "https://via.placeholder.com/120x120/1e102f/00e676?text=CP",
//     },
//   ];

//   const radarData = [
//     { axis: "Form", value: 85, color: "#00e676" },
//     { axis: "Value", value: 72, color: "#00bcd4" },
//     { axis: "xPoints", value: 88, color: "#9c27b0" },
//     { axis: "Consistency", value: 78, color: "#ff6b6b" },
//     { axis: "Fixtures", value: 82, color: "#ffd700" },
//   ];

//   const getSortValue = (player) => {
//     if (sortBy === "value") {
//       return player.stats.value;
//     }
//     if (sortBy === "xPoints") {
//       return player.stats.xPoints;
//     }
//     if (sortBy === "fixtures") {
//       return player.stats.fixtureAvg;
//     }
//     return player.stats.form;
//   };

//   const sortedPlayers = [...players].sort(
//     (left, right) => getSortValue(right) - getSortValue(left),
//   );

//   const selectedPlayerData = players.filter((player) =>
//     selectedPlayers.includes(player.name),
//   );

//   const getAverage = (selector) => {
//     if (selectedPlayerData.length === 0) {
//       return 0;
//     }

//     const total = selectedPlayerData.reduce(
//       (sum, player) => sum + selector(player),
//       0,
//     );
//     return total / selectedPlayerData.length;
//   };

//   const keyStats = [
//     {
//       label: "Form",
//       value: getAverage((player) => player.stats.form).toFixed(2),
//     },
//     {
//       label: "Value",
//       value: getAverage((player) => player.stats.value).toFixed(1),
//     },
//     {
//       label: "xPoints",
//       value: getAverage((player) => player.stats.xPoints).toFixed(1),
//     },
//     {
//       label: "Fixture Avg",
//       value: getAverage((player) => player.stats.fixtureAvg).toFixed(2),
//     },
//   ];

//   // Simple Radar Chart SVG
//   const RadarChart = ({ data }) => {
//     const size = 200;
//     const center = size / 2;
//     const maxValue = 100;
//     const levels = 4;
//     const angleSlice = (Math.PI * 2) / data.length;

//     const getCoordinates = (value, index) => {
//       const angle = angleSlice * index - Math.PI / 2;
//       const radius = (value / maxValue) * (size / 3);
//       const x = center + radius * Math.cos(angle);
//       const y = center + radius * Math.sin(angle);
//       return { x, y };
//     };

//     const getPolygonPoints = () => {
//       return data
//         .map((item, i) => getCoordinates(item.value, i))
//         .map((p) => `${p.x},${p.y}`)
//         .join(" ");
//     };

//     const getAxisPoints = (level) => {
//       return data
//         .map((_, i) => getCoordinates((level / levels) * maxValue, i))
//         .map((p) => `${p.x},${p.y}`)
//         .join(" ");
//     };

//     return (
//       <svg width={size} height={size} className="mx-auto">
//         {/* Grid levels */}
//         {Array.from({ length: levels }).map((_, level) => (
//           <polygon
//             key={`level-${level}`}
//             points={getAxisPoints(level + 1)}
//             fill="none"
//             stroke="rgba(0, 230, 118, 0.1)"
//             strokeWidth="1"
//           />
//         ))}

//         {/* Axes */}
//         {data.map((item, i) => {
//           const coords = getCoordinates(maxValue, i);
//           return (
//             <line
//               key={`axis-${i}`}
//               x1={center}
//               y1={center}
//               x2={coords.x}
//               y2={coords.y}
//               stroke="rgba(0, 230, 118, 0.2)"
//               strokeWidth="1"
//             />
//           );
//         })}

//         {/* Data polygon */}
//         <polygon
//           points={getPolygonPoints()}
//           fill="rgba(0, 230, 118, 0.1)"
//           stroke="#00e676"
//           strokeWidth="2"
//         />

//         {/* Labels */}
//         {data.map((item, i) => {
//           const coords = getCoordinates(maxValue * 1.2, i);
//           return (
//             <text
//               key={`label-${i}`}
//               x={coords.x}
//               y={coords.y}
//               textAnchor="middle"
//               fill="#94a3b8"
//               fontSize="10"
//               className="font-semibold"
//             >
//               {item.axis}
//             </text>
//           );
//         })}
//       </svg>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//         <div>
//           <h1 className="text-4xl font-bold text-white">Player Analyst</h1>
//           <p className="text-slate-400 mt-1">
//             Comparing performance metrics for Gameweek 24 Projections
//           </p>
//         </div>
//         <button
//           onClick={() => {
//             const sortOrder = ["form", "value", "xPoints", "fixtures"];
//             const currentIndex = sortOrder.indexOf(sortBy);
//             const nextSortBy = sortOrder[(currentIndex + 1) % sortOrder.length];
//             setSortBy(nextSortBy);
//             setStatusMessage(`Sorted players by ${nextSortBy}.`);
//           }}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4d2f70] bg-[#241239] text-emerald-400 hover:border-emerald-400/50 transition"
//         >
//           <Download size={16} />
//           Sort Data
//         </button>
//       </div>

//       {/* Player Selection */}
//       <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
//         <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
//           Compare Players
//         </h2>
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
//           {sortedPlayers.map((player, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 setSelectedPlayers((previousPlayers) => {
//                   const exists = previousPlayers.includes(player.name);
//                   if (exists) {
//                     return previousPlayers.filter(
//                       (name) => name !== player.name,
//                     );
//                   }
//                   return [...previousPlayers, player.name];
//                 });
//                 setStatusMessage(`${player.name} toggled in comparison.`);
//               }}
//               className={`p-3 rounded-lg border text-center transition ${
//                 selectedPlayers.includes(player.name)
//                   ? "border-emerald-400 bg-emerald-400/10"
//                   : "border-[#4d2f70] bg-[#241239] hover:border-emerald-400/50"
//               }`}
//             >
//               {!failedImages.has(player.name) && (
//                 <img
//                   src={player.image}
//                   alt={player.name}
//                   className="w-12 h-12 rounded-lg mx-auto mb-2 border border-emerald-400/30 object-cover"
//                   onError={() => {
//                     setFailedImages((prev) => new Set(prev).add(player.name));
//                   }}
//                 />
//               )}
//               {failedImages.has(player.name) && (
//                 <div className="w-12 h-12 rounded-lg mx-auto mb-2 border border-emerald-400/30 bg-emerald-400/10 flex items-center justify-center text-xs font-bold text-emerald-400">
//                   {player.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//               )}
//               <p className="text-xs font-bold text-white">{player.name}</p>
//               <p className="text-[10px] text-emerald-400 mt-1">
//                 {player.position}
//               </p>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Key Stats Comparison */}
//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {keyStats.map((stat, idx) => (
//           <div
//             key={idx}
//             className="rounded-lg border border-[#4d2f70] bg-[#241239] p-4 text-center"
//           >
//             <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
//               {stat.label}
//             </p>
//             <p className="text-2xl font-bold text-emerald-400">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Radar Chart Section */}
//       <div className="grid gap-4 xl:grid-cols-3">
//         {/* Left: Radar */}
//         <div className="col-span-1 rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
//           <h3 className="text-sm font-bold text-white mb-4 uppercase">
//             Statistical Breakdown
//           </h3>
//           <div className="flex flex-col items-center">
//             <RadarChart data={radarData} />
//             <div className="mt-4 space-y-2 w-full">
//               {radarData.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center justify-between text-xs"
//                 >
//                   <span className="text-slate-400">{item.axis}</span>
//                   <span className="text-emerald-300 font-semibold">
//                     {item.value}%
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right: Detailed Stats */}
//         <div className="col-span-2 rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
//           <h3 className="text-sm font-bold text-white mb-4 uppercase">
//             Performance Metrics
//           </h3>
//           <div className="grid gap-4 sm:grid-cols-2">
//             {[
//               { metric: "Form", value: "8.4", color: "emerald" },
//               { metric: "Value", value: "8.2", color: "cyan" },
//               { metric: "Consistency", value: "7.8", color: "purple" },
//               { metric: "xPoints Potential", value: "8.9", color: "yellow" },
//               { metric: "Fixture Difficulty", value: "7.2", color: "rose" },
//               { metric: "Ownership", value: "High (48K+)", color: "emerald" },
//               {
//                 metric: "Recommendation",
//                 value: "Transfer In",
//                 color: "green",
//               },
//               { metric: "Risk Level", value: "Medium", color: "yellow" },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className={`p-3 rounded-lg border border-${item.color}-900/50 bg-${item.color}-900/20`}
//               >
//                 <p className={`text-xs font-bold text-${item.color}-300`}>
//                   {item.metric}
//                 </p>
//                 <p className={`text-lg font-bold text-${item.color}-200 mt-1`}>
//                   {item.value}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="rounded-xl border border-[#3d245b] bg-[#1e102f] p-3 text-sm text-slate-300">
//         <span className="font-semibold text-white">Status:</span>{" "}
//         {statusMessage}
//       </div>

//       {/* Detailed Stats Table */}
//       <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
//         <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
//           Seasonal Statistics
//         </h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-[#3c2458]">
//                 {[
//                   "Player",
//                   "Team",
//                   "PTS",
//                   "xA",
//                   "xG",
//                   "xGI",
//                   "BPS",
//                   "CS%",
//                   "ICT Index",
//                 ].map((header) => (
//                   <th
//                     key={header}
//                     className="px-4 py-3 text-left text-xs font-bold text-emerald-300 uppercase"
//                   >
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 {
//                   player: "Mohamed Salah",
//                   team: "LIV",
//                   pts: "224",
//                   xa: "6.2",
//                   xg: "8.5",
//                   xgi: "14.7",
//                   bps: "1145",
//                   cs: "8.2",
//                   ict: "7.5",
//                 },
//                 {
//                   player: "Erling Haaland",
//                   team: "MCI",
//                   pts: "210",
//                   xa: "3.9",
//                   xg: "12.1",
//                   xgi: "16.0",
//                   bps: "1198",
//                   cs: "8.8",
//                   ict: "8.2",
//                 },
//                 {
//                   player: "Cole Palmer",
//                   team: "CHE",
//                   pts: "198",
//                   xa: "5.5",
//                   xg: "7.3",
//                   xgi: "12.8",
//                   bps: "987",
//                   cs: "7.1",
//                   ict: "6.9",
//                 },
//               ].map((row, idx) => (
//                 <tr
//                   key={idx}
//                   className="border-b border-[#3c2458] hover:bg-[#241239]/50 transition"
//                 >
//                   <td className="px-4 py-3 font-semibold text-white">
//                     {row.player}
//                   </td>
//                   <td className="px-4 py-3 text-slate-400">{row.team}</td>
//                   <td className="px-4 py-3 text-emerald-400 font-semibold">
//                     {row.pts}
//                   </td>
//                   <td className="px-4 py-3 text-cyan-400">{row.xa}</td>
//                   <td className="px-4 py-3 text-purple-400">{row.xg}</td>
//                   <td className="px-4 py-3 text-emerald-300">{row.xgi}</td>
//                   <td className="px-4 py-3 text-yellow-400">{row.bps}</td>
//                   <td className="px-4 py-3 text-blue-400">{row.cs}%</td>
//                   <td className="px-4 py-3 text-rose-400">{row.ict}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PlayerAnalyst;
