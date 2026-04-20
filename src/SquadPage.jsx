import { useState, useEffect } from "react";
import { Loader2, AlertCircle, Save } from "lucide-react";
import { getPlayers } from "./api";

function SquadPage() {
  const [squad, setSquad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    loadSquadData();
  }, []);

  const loadSquadData = () => {
    setTimeout(() => {
      const formation = {
        gw: "24",
        transfers: "2",
        changesLeft: "1",
        healthScore: 92,
        positions: {
          GK: [
            {
              id: 1,
              name: "Mendy",
              team: "Chelsea",
              price: "5.0m",
              status: "FIT",
            },
          ],
          DEF: [
            {
              id: 2,
              name: "Alexander-Arnold",
              team: "Liverpool",
              price: "8.5m",
              status: "FIT",
            },
            {
              id: 3,
              name: "van Dijk",
              team: "Liverpool",
              price: "8.4m",
              status: "FIT",
            },
            {
              id: 4,
              name: "Walker",
              team: "Man City",
              price: "8.0m",
              status: "FIT",
            },
            {
              id: 5,
              name: "Akanji",
              team: "Man City",
              price: "6.5m",
              status: "FIT",
            },
          ],
          MID: [
            {
              id: 6,
              name: "Salah",
              team: "Liverpool",
              price: "13.2m",
              status: "CAUTION",
            },
            {
              id: 7,
              name: "Saka",
              team: "Arsenal",
              price: "10.1m",
              status: "FIT",
            },
            {
              id: 8,
              name: "Palmer",
              team: "Chelsea",
              price: "10.8m",
              status: "FIT",
            },
            {
              id: 9,
              name: "Gündoğan",
              team: "Man City",
              price: "8.2m",
              status: "FIT",
            },
            {
              id: 10,
              name: "Maddison",
              team: "Tottenham",
              price: "8.6m",
              status: "FIT",
            },
          ],
          FWD: [
            {
              id: 11,
              name: "Haaland",
              team: "Man City",
              price: "14.5m",
              status: "FIT",
            },
            {
              id: 12,
              name: "Isak",
              team: "Newcastle",
              price: "11.8m",
              status: "FIT",
            },
            {
              id: 13,
              name: "Watkins",
              team: "Aston Villa",
              price: "8.9m",
              status: "FIT",
            },
          ],
        },
        bench: [
          {
            id: 14,
            name: "Ramsdale",
            team: "Arsenal",
            price: "5.2m",
            position: "GK",
          },
          {
            id: 15,
            name: "Dalot",
            team: "Man United",
            price: "5.8m",
            position: "DEF",
          },
          {
            id: 16,
            name: "Mount",
            team: "Man United",
            price: "6.5m",
            position: "MID",
          },
          {
            id: 17,
            name: "Solanke",
            team: "Bournemouth",
            price: "7.8m",
            position: "FWD",
          },
        ],
      };
      setSquad(formation);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-emerald-300" size={32} />
      </div>
    );
  }

  const FormationField = () => (
    <div className="rounded-2xl border-4 border-emerald-400 bg-gradient-to-b from-green-700/40 to-green-800/60 p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 150">
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="150"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="75"
            r="15"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
          <rect
            x="40"
            y="5"
            width="20"
            height="20"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
          <rect
            x="40"
            y="125"
            width="20"
            height="20"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="relative space-y-8">
        {/* Goalkeeper */}
        <div className="flex justify-center">
          <div className="flex gap-2">
            {squad.positions.GK.map((p) => (
              <PlayerBadge
                key={p.id}
                player={p}
                onSelect={() => setSelectedPlayer(p)}
              />
            ))}
          </div>
        </div>

        {/* Defenders */}
        <div className="flex justify-center gap-3">
          {squad.positions.DEF.map((p) => (
            <PlayerBadge
              key={p.id}
              player={p}
              onSelect={() => setSelectedPlayer(p)}
            />
          ))}
        </div>

        {/* Midfielders */}
        <div className="flex justify-center gap-2 flex-wrap">
          {squad.positions.MID.map((p) => (
            <PlayerBadge
              key={p.id}
              player={p}
              onSelect={() => setSelectedPlayer(p)}
            />
          ))}
        </div>

        {/* Forwards */}
        <div className="flex justify-center gap-3">
          {squad.positions.FWD.map((p) => (
            <PlayerBadge
              key={p.id}
              player={p}
              onSelect={() => setSelectedPlayer(p)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const PlayerBadge = ({ player, onSelect }) => (
    <button
      onClick={onSelect}
      className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[#1e102f] border-2 border-emerald-400 hover:border-cyan-400 transition cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 border border-emerald-400 flex items-center justify-center">
        <div className="text-xs font-bold text-emerald-300">
          {player.name.split(" ")[0][0]}
        </div>
      </div>
      <p className="text-[10px] font-bold text-white text-center whitespace-nowrap">
        {player.name.split(" ").pop()}
      </p>
      <span
        className={`text-[8px] font-bold px-1 rounded ${
          player.status === "CAUTION"
            ? "bg-yellow-900/50 text-yellow-300"
            : "bg-emerald-900/50 text-emerald-300"
        }`}
      >
        {player.status}
      </span>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">
            FPLytics - Squad Management
          </h1>
          <p className="text-slate-400 mt-1">Gameweek {squad.gw}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-400 text-[#072015] font-bold hover:brightness-110 transition">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {/* Formation Field */}
      <FormationField />

      {/* Squad Stats & Health */}
      <div className="grid grid-cols-3 gap-4">
        {/* Squad Health Score */}
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
            Squad Health Score
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#331c4f"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${squad.healthScore * 3.14} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                    <stop offset="0%" stopColor="#00e676" />
                    <stop offset="100%" stopColor="#00bcd4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400">
                    {squad.healthScore}%
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Excellent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Substitutes */}
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6 col-span-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
            Substitutes & Bench
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {squad.bench.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlayer(p)}
                className="p-3 rounded-lg border border-[#4d2f70] bg-[#241239] hover:border-emerald-400/50 transition text-left"
              >
                <p className="text-xs font-bold text-white truncate">
                  {p.name}
                </p>
                <p className="text-[10px] text-slate-400">{p.position}</p>
                <p className="text-[10px] text-emerald-400 mt-1">{p.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transfers & Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
            Transfers Info
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[#241239] rounded-lg border border-[#4d2f70]">
              <span className="text-sm text-slate-300">Transfers Made</span>
              <span className="text-lg font-bold text-emerald-400">
                {squad.transfers}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#241239] rounded-lg border border-[#4d2f70]">
              <span className="text-sm text-slate-300">Changes Left</span>
              <span className="text-lg font-bold text-cyan-400">
                {squad.changesLeft}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
            Transfer Recommendation
          </h3>
          <div className="flex items-start gap-3 p-3 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
            <span className="text-emerald-400 mt-1">✓</span>
            <div>
              <p className="text-sm text-emerald-300 font-semibold">
                Recommended transfer
              </p>
              <p className="text-xs text-emerald-200 mt-1">
                Replace Salah with Palmer to optimize point prediction
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Player Details */}
      {selectedPlayer && (
        <div className="rounded-2xl border border-emerald-400/50 bg-[#1e102f] p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">
                {selectedPlayer.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {selectedPlayer.team}
              </p>
            </div>
            <button
              onClick={() => setSelectedPlayer(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-[#241239] rounded-lg border border-[#4d2f70]">
              <p className="text-xs text-slate-400">Price</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">
                {selectedPlayer.price}
              </p>
            </div>
            <div className="p-3 bg-[#241239] rounded-lg border border-[#4d2f70]">
              <p className="text-xs text-slate-400">Status</p>
              <p className="text-lg font-bold text-white mt-1">
                {selectedPlayer.status}
              </p>
            </div>
            <div className="p-3 bg-[#241239] rounded-lg border border-[#4d2f70]">
              <p className="text-xs text-slate-400">Action</p>
              <button className="text-sm font-bold text-emerald-400 hover:text-emerald-300 mt-1">
                → Replace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SquadPage;
