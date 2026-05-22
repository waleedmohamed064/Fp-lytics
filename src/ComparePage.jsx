import { useMemo, useState } from "react";
import { comparePlayers } from "./dashboardData";

const statRows = ["Form", "Projected Points", "Goals", "Assists", "CS Chance"];

function ComparePage() {
  const [leftPlayerName, setLeftPlayerName] = useState(comparePlayers[0].name);
  const [rightPlayerName, setRightPlayerName] = useState(comparePlayers[1].name);
  const [lookback, setLookback] = useState("Last 5 GWs");

  const leftPlayer = useMemo(
    () => comparePlayers.find((player) => player.name === leftPlayerName) || comparePlayers[0],
    [leftPlayerName],
  );

  const rightPlayer = useMemo(
    () => comparePlayers.find((player) => player.name === rightPlayerName) || comparePlayers[1],
    [rightPlayerName],
  );

  const compareValue = (key) => {
    const left = Number(leftPlayer[key]) || 0;
    const right = Number(rightPlayer[key]) || 0;
    return left > right ? leftPlayer.name : rightPlayer.name;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Player Compare</p>
          <h1 className="mt-2 text-4xl font-bold text-white">One vs One</h1>
          <p className="mt-1 text-slate-400">Compare two players with dynamic projections and fixtures.</p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-2xl border border-[#3d245b] bg-[#1e102f] p-2">
          {['Last 5 GWs', 'Full Season'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLookback(option)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                lookback === option
                  ? 'bg-emerald-400 text-[#072015]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-3xl border border-[#3d245b] bg-[#1e102f] p-5">
          <label className="text-xs uppercase tracking-[0.25em] text-slate-400">Left Player</label>
          <select
            value={leftPlayerName}
            onChange={(event) => setLeftPlayerName(event.target.value)}
            className="mt-3 w-full rounded-xl border border-[#4d2f70] bg-[#241239] px-3 py-2 text-white outline-none focus:border-emerald-400"
          >
            {comparePlayers.map((player) => (
              <option key={player.name} value={player.name}>{player.name}</option>
            ))}
          </select>

          <div className="mt-5 space-y-3">
            <p className="text-2xl font-bold text-white">{leftPlayer.name}</p>
            <p className="text-sm text-slate-400">{leftPlayer.team} · {leftPlayer.position} · £{leftPlayer.price}m</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Goals" value={leftPlayer.goals} />
              <Metric label="Assists" value={leftPlayer.assists} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="rounded-full border border-emerald-400/50 bg-emerald-400/15 px-4 py-3 text-sm font-bold text-emerald-300">VS</div>
        </div>

        <div className="rounded-3xl border border-[#3d245b] bg-[#1e102f] p-5">
          <label className="text-xs uppercase tracking-[0.25em] text-slate-400">Right Player</label>
          <select
            value={rightPlayerName}
            onChange={(event) => setRightPlayerName(event.target.value)}
            className="mt-3 w-full rounded-xl border border-[#4d2f70] bg-[#241239] px-3 py-2 text-white outline-none focus:border-emerald-400"
          >
            {comparePlayers.map((player) => (
              <option key={player.name} value={player.name}>{player.name}</option>
            ))}
          </select>

          <div className="mt-5 space-y-3">
            <p className="text-2xl font-bold text-white">{rightPlayer.name}</p>
            <p className="text-sm text-slate-400">{rightPlayer.team} · {rightPlayer.position} · £{rightPlayer.price}m</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Goals" value={rightPlayer.goals} />
              <Metric label="Assists" value={rightPlayer.assists} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl border border-[#3d245b] bg-[#1e102f] p-5 md:grid-cols-2 xl:grid-cols-5">
        {statRows.map((label) => {
          const keyMap = {
            Form: 'form',
            'Projected Points': 'projectedPoints',
            Goals: 'goals',
            Assists: 'assists',
            'CS Chance': 'csChance',
          };
          const statKey = keyMap[label];
          const winner = compareValue(statKey);
          return (
            <div key={label} className="rounded-2xl border border-white/5 bg-[#241239] p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">{leftPlayer.name}</p>
                  <p className="text-xl font-bold text-white">{leftPlayer[statKey]}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">{rightPlayer.name}</p>
                  <p className="text-xl font-bold text-emerald-300">{rightPlayer[statKey]}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-emerald-300">Edge: {winner}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#3d245b] bg-[#1e102f] p-5">
          <h2 className="text-lg font-bold text-white">Fixture outlook</h2>
          <div className="mt-4 space-y-4">
            {[leftPlayer, rightPlayer].map((player) => (
              <div key={player.name} className="rounded-2xl border border-white/5 bg-[#241239] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{player.name}</p>
                    <p className="text-xs text-slate-400">Next fixture: {player.fixture}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Projected Pts</p>
                    <p className="text-xl font-bold text-emerald-300">{player.projectedPoints}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#3d245b] bg-[#1e102f] p-5">
          <h2 className="text-lg font-bold text-white">Manager note</h2>
          <p className="mt-3 text-sm text-slate-300">
            {leftPlayer.name} is the better fit for pure output, while {rightPlayer.name} has the stronger all-round ceiling.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            This page is fully interactive: change either selector and the comparison updates immediately.
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#241239] p-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-emerald-300">{value}</p>
    </div>
  );
}

export default ComparePage;
