import { useRef, useState } from "react";
import { ArrowRightLeft } from "lucide-react";

const HOLD_DURATION_MS = 450;

const INITIAL_SQUAD_PLAYERS = [
  {
    id: 1,
    name: "Mendy",
    team: "Chelsea",
    pos: "GK",
    price: 5.0,
    points: 65,
  },
  {
    id: 2,
    name: "Alexander-Arnold",
    team: "Liverpool",
    pos: "DEF",
    price: 8.5,
    points: 82,
  },
  {
    id: 3,
    name: "Van Dijk",
    team: "Liverpool",
    pos: "DEF",
    price: 8.4,
    points: 78,
  },
  {
    id: 4,
    name: "Walker",
    team: "Man City",
    pos: "DEF",
    price: 8.0,
    points: 71,
  },
  {
    id: 5,
    name: "Akanji",
    team: "Man City",
    pos: "DEF",
    price: 6.5,
    points: 58,
  },
  {
    id: 6,
    name: "Salah",
    team: "Liverpool",
    pos: "MID",
    price: 13.2,
    points: 210,
  },
  {
    id: 7,
    name: "Saka",
    team: "Arsenal",
    pos: "MID",
    price: 10.1,
    points: 156,
  },
  {
    id: 8,
    name: "Palmer",
    team: "Chelsea",
    pos: "MID",
    price: 10.8,
    points: 189,
  },
  {
    id: 9,
    name: "Gündoğan",
    team: "Man City",
    pos: "MID",
    price: 8.2,
    points: 124,
  },
  {
    id: 10,
    name: "Haaland",
    team: "Man City",
    pos: "FWD",
    price: 14.5,
    points: 224,
  },
  {
    id: 11,
    name: "Isak",
    team: "Newcastle",
    pos: "FWD",
    price: 11.8,
    points: 167,
  },
];

const INITIAL_AVAILABLE_PLAYERS = [
  {
    id: 101,
    name: "Mount",
    team: "Man United",
    pos: "MID",
    price: 6.5,
    points: 98,
    trend: "up",
  },
  {
    id: 102,
    name: "Maddison",
    team: "Tottenham",
    pos: "MID",
    price: 8.6,
    points: 145,
    trend: "up",
  },
  {
    id: 103,
    name: "Dalot",
    team: "Man United",
    pos: "DEF",
    price: 5.8,
    points: 67,
    trend: "up",
  },
  {
    id: 104,
    name: "Watkins",
    team: "Aston Villa",
    pos: "FWD",
    price: 8.9,
    points: 134,
    trend: "up",
  },
  {
    id: 105,
    name: "Solanke",
    team: "Bournemouth",
    pos: "FWD",
    price: 7.8,
    points: 98,
    trend: "down",
  },
  {
    id: 106,
    name: "Vardy",
    team: "Leicester",
    pos: "FWD",
    price: 8.1,
    points: 87,
    trend: "down",
  },
];

function TransfersPage() {
  const holdTimeoutRef = useRef(null);
  const [selectedOut, setSelectedOut] = useState(null);
  const [selectedIn, setSelectedIn] = useState(null);
  const [squadPlayers, setSquadPlayers] = useState(INITIAL_SQUAD_PLAYERS);
  const [availablePlayers, setAvailablePlayers] = useState(
    INITIAL_AVAILABLE_PLAYERS,
  );
  const [freeTransfers, setFreeTransfers] = useState(2);
  const [statusMessage, setStatusMessage] = useState(
    "Select a player out and in to confirm transfer.",
  );

  const highlights = [
    {
      title: "Best Value In",
      player: "Mount",
      reason: "Form: Rising | Fixtures: Great | Value: 6.5m",
      icon: "📈",
    },
    {
      title: "Best Value Out",
      player: "Akanji",
      reason: "Form: Declining | Fixtures: Tough | Save: 6.5m",
      icon: "📉",
    },
  ];

  const [transferHistory, setTransferHistory] = useState([
    {
      gw: "GW23",
      out: "Foden",
      in: "Mount",
      result: "+12 pts",
      color: "green",
    },
    {
      gw: "GW22",
      out: "Martinelli",
      in: "Palmer",
      result: "+18 pts",
      color: "green",
    },
    {
      gw: "GW21",
      out: "Rashford",
      in: "Saka",
      result: "-3 pts",
      color: "red",
    },
  ]);

  const executeTransfer = (playerOut, playerIn, interactionType = "click") => {
    if (!playerOut || !playerIn) {
      setStatusMessage("Choose both outgoing and incoming players first.");
      return false;
    }

    if (playerOut.pos !== playerIn.pos) {
      setStatusMessage("Transfer blocked: positions must match.");
      return false;
    }

    if (freeTransfers <= 0) {
      setStatusMessage("No free transfers remaining.");
      return false;
    }

    const pointDiff = (playerIn.points - playerOut.points).toFixed(1);

    setSquadPlayers((previousSquad) =>
      previousSquad.map((player) =>
        player.id === playerOut.id ? { ...playerIn, id: playerOut.id } : player,
      ),
    );

    setAvailablePlayers((previousAvailable) =>
      previousAvailable.map((player) =>
        player.id === playerIn.id
          ? {
              ...playerOut,
              id: playerIn.id,
              trend: playerOut.points >= playerIn.points ? "down" : "up",
            }
          : player,
      ),
    );

    setTransferHistory((previousHistory) => [
      {
        gw: `GW${24 + previousHistory.length}`,
        out: playerOut.name,
        in: playerIn.name,
        result: `${Number.parseFloat(pointDiff) >= 0 ? "+" : ""}${pointDiff} pts`,
        color: Number.parseFloat(pointDiff) >= 0 ? "green" : "red",
      },
      ...previousHistory,
    ]);

    setFreeTransfers((previousValue) => Math.max(previousValue - 1, 0));
    setStatusMessage(
      `Transfer confirmed (${interactionType}): ${playerOut.name} → ${playerIn.name}.`,
    );
    setSelectedOut(null);
    setSelectedIn(null);
    return true;
  };

  const handleConfirmTransfer = () => {
    executeTransfer(selectedOut, selectedIn, "button");
  };

  const clearHoldTimer = () => {
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  const startHoldTransfer = (playerIn) => {
    clearHoldTimer();
    holdTimeoutRef.current = window.setTimeout(() => {
      if (!selectedOut) {
        setStatusMessage("Select a player from your squad, then hold an incoming player.");
        return;
      }
      executeTransfer(selectedOut, playerIn, "hold");
    }, HOLD_DURATION_MS);
  };

  const handleIncomingPlayerClick = (player) => {
    setSelectedIn(player);
    if (!selectedOut) {
      setStatusMessage(`Selected ${player.name}. Pick a player to transfer out.`);
      return;
    }
    executeTransfer(selectedOut, player, "click");
  };

  const PlayerSelect = ({ player, isOut, onSelect, onHoldStart, onHoldEnd }) => (
    <button
      onClick={() => onSelect(player)}
      onMouseDown={() => onHoldStart?.(player)}
      onMouseUp={onHoldEnd}
      onMouseLeave={onHoldEnd}
      onTouchStart={() => onHoldStart?.(player)}
      onTouchEnd={onHoldEnd}
      className={`w-full p-3 rounded-lg border text-left transition ${
        isOut && selectedOut?.id === player.id
          ? "border-emerald-400 bg-emerald-400/10"
          : !isOut && selectedIn?.id === player.id
            ? "border-cyan-400 bg-cyan-400/10"
            : "border-[#4d2f70] bg-[#241239] hover:border-emerald-400/50"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-white text-sm">{player.name}</p>
          <p className="text-xs text-slate-400 mt-1">{player.team}</p>
        </div>
        <span className="text-xs font-bold text-emerald-400">{player.pos}</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-slate-500">${player.price}m</span>
        <span className="text-xs font-semibold text-cyan-300">
          {player.points} pts
        </span>
      </div>
      {!isOut && selectedOut && (
        <p className="mt-2 text-[11px] text-emerald-300/80">
          Click or hold to transfer in
        </p>
      )}
    </button>
  );

  const calculateSavings = () => {
    if (selectedOut && selectedIn) {
      return (selectedOut.price - selectedIn.price).toFixed(1);
    }
    return 0;
  };

  const calculatePointDiff = () => {
    if (selectedOut && selectedIn) {
      return (selectedIn.points - selectedOut.points).toFixed(1);
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Transfers Hub</h1>
        <p className="text-slate-400 mt-1">
          Manage your transfers wisely · Free transfers: {freeTransfers}
        </p>
        <p className="text-xs text-cyan-300/90 mt-2">
          Tip: pick a squad player, then click or hold an available player to make a real transfer.
        </p>
      </div>

      {/* Top Highlights */}
      <div className="grid gap-4 lg:grid-cols-2">
        {highlights.map((h, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-300 font-bold">
                  {h.title}
                </p>
                <h3 className="text-2xl font-bold text-white mt-2">
                  {h.player}
                </h3>
                <p className="text-xs text-slate-400 mt-2">{h.reason}</p>
              </div>
              <span className="text-3xl">{h.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Selector */}
      <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <ArrowRightLeft size={20} /> Make a Transfer
        </h2>

        <div className="grid gap-4 lg:grid-cols-5">
          {/* Players to Remove */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-rose-400">📤</span> From Your Squad
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {squadPlayers.map((p) => (
                <PlayerSelect
                  key={p.id}
                  player={p}
                  isOut
                  onSelect={(player) => {
                    setSelectedOut(player);
                    setStatusMessage(`Selected ${player.name} to transfer out.`);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Transfer Info */}
          <div className="flex flex-col items-center justify-center lg:col-span-1">
            <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-emerald-400 bg-emerald-400/10 mb-4">
              <ArrowRightLeft className="text-emerald-400" size={20} />
            </div>

            {selectedOut && selectedIn && (
              <div className="space-y-4 text-center w-full">
                <div className="p-3 rounded-lg bg-[#241239] border border-[#4d2f70]">
                  <p className="text-xs text-slate-400">Savings</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1">
                    +${calculateSavings()}m
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#241239] border border-[#4d2f70]">
                  <p className="text-xs text-slate-400">Point Change</p>
                  <p
                    className={`text-lg font-bold mt-1 ${
                      parseFloat(calculatePointDiff()) > 0
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {parseFloat(calculatePointDiff()) > 0 ? "+" : ""}
                    {calculatePointDiff()} pts
                  </p>
                </div>
                <button
                  onClick={handleConfirmTransfer}
                  className="w-full px-4 py-2 rounded-lg bg-emerald-400 text-[#072015] font-bold hover:brightness-110 transition"
                >
                  Confirm Transfer
                </button>
              </div>
            )}
          </div>

          {/* Players to Add */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-emerald-400">📥</span> Available Players
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availablePlayers.map((p) => (
                <PlayerSelect
                  key={p.id}
                  player={p}
                  isOut={false}
                  onSelect={handleIncomingPlayerClick}
                  onHoldStart={startHoldTransfer}
                  onHoldEnd={clearHoldTimer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transfer History & Analysis */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h2 className="text-lg font-bold text-white mb-4">
            📊 Transfer History
          </h2>
          <div className="space-y-3">
            {transferHistory.map((t, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  t.color === "green"
                    ? "border-green-900/50 bg-green-900/10"
                    : "border-red-900/50 bg-red-900/10"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-slate-300">{t.gw}</p>
                    <p className="text-sm text-white mt-1">
                      {t.out} → {t.in}
                    </p>
                  </div>
                  <span
                    className={`font-bold text-sm ${
                      t.color === "green" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#3d245b] bg-[#1e102f] p-6">
          <h2 className="text-lg font-bold text-white mb-4">
            💡 Smart Recommendations
          </h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-emerald-900/50 bg-emerald-900/20">
              <p className="text-xs font-bold text-emerald-300">BUY SIGNAL</p>
              <p className="text-sm text-emerald-100 mt-1">
                Mount is rising and has great fixtures
              </p>
            </div>
            <div className="p-3 rounded-lg border border-yellow-900/50 bg-yellow-900/20">
              <p className="text-xs font-bold text-yellow-300">CAUTION</p>
              <p className="text-sm text-yellow-100 mt-1">
                Salah injury risk - consider transfer out
              </p>
            </div>
            <div className="p-3 rounded-lg border border-cyan-900/50 bg-cyan-900/20">
              <p className="text-xs font-bold text-cyan-300">HOLD</p>
              <p className="text-sm text-cyan-100 mt-1">
                Your captain pick (Haaland) is still strong
              </p>
            </div>
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

export default TransfersPage;
