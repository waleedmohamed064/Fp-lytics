import { useEffect, useMemo, useState } from "react";
import { Loader2, Shirt, UserRound, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pitchViews = [
  {
    title: "Your Current XI",
    formation: "3-4-3",
    projected: 58.2,
    optimized: false,
    players: {
      GK: [
        {
          id: 1,
          name: "AREOLA",
          opponent: "MUN",
          proj: 2.1,
        },
      ],
      DEF: [
        {
          id: 2,
          name: "GABRIEL",
          opponent: "NFO",
          proj: 5.8,
        },
        {
          id: 3,
          name: "SALIBA",
          opponent: "NFO",
          proj: 5.5,
        },
        {
          id: 4,
          name: "PORRO",
          opponent: "AVL",
          proj: 4.2,
        },
      ],
      MID: [
        {
          id: 5,
          name: "SALAH (C)",
          opponent: "NFO",
          proj: 14.4,
        },
        {
          id: 6,
          name: "SAKA",
          opponent: "NFO",
          proj: 7.1,
        },
        {
          id: 7,
          name: "FODEN",
          opponent: "WHU",
          proj: 2.8,
        },
        {
          id: 8,
          name: "MBEUMO",
          opponent: "SOU",
          proj: 5.0,
        },
      ],
      FWD: [
        {
          id: 9,
          name: "HAALAND",
          opponent: "WHU",
          proj: 8.2,
        },
        {
          id: 10,
          name: "WATKINS",
          opponent: "TOT",
          proj: 4.8,
        },
        {
          id: 11,
          name: "SOLANKE",
          opponent: "MCI",
          proj: 4.5,
        },
      ],
    },
    bench: [
      {
        id: 12,
        name: "FABIANSKI",
        opponent: "MUN",
        proj: 3.8,
      },
      {
        id: 13,
        name: "GORDON",
        opponent: "SOU",
        proj: 8.1,
      },
      {
        id: 14,
        name: "BELL",
        opponent: "LIV",
        proj: 1.2,
      },
      {
        id: 15,
        name: "TAYLOR",
        opponent: "ARS",
        proj: 0.8,
      },
    ],
  },
  {
    title: "AI Optimized XI",
    formation: "3-5-2",
    projected: 66.6,
    optimized: true,
    locked: true,
    players: {
      GK: [
        {
          id: 16,
          name: "AREOLA",
          opponent: "MUN",
          proj: 2.7,
        },
      ],
      DEF: [
        {
          id: 17,
          name: "GABRIEL",
          opponent: "NFO",
          proj: 6.0,
        },
        {
          id: 18,
          name: "SALIBA",
          opponent: "NFO",
          proj: 5.8,
        },
        {
          id: 19,
          name: "UDOGIE",
          opponent: "AVL",
          proj: 4.9,
        },
      ],
      MID: [
        {
          id: 20,
          name: "SALAH",
          opponent: "NFO",
          proj: 10.6,
        },
        {
          id: 21,
          name: "SAKA",
          opponent: "NFO",
          proj: 8.3,
        },
        {
          id: 22,
          name: "FODEN",
          opponent: "WHU",
          proj: 6.2,
        },
        {
          id: 23,
          name: "MBEUMO",
          opponent: "SOU",
          proj: 6.0,
        },
        {
          id: 24,
          name: "BOWEN",
          opponent: "MUN",
          proj: 5.7,
        },
      ],
      FWD: [
        {
          id: 25,
          name: "HAALAND",
          opponent: "WHU",
          proj: 9.0,
        },
        {
          id: 26,
          name: "WATKINS",
          opponent: "TOT",
          proj: 5.6,
        },
      ],
    },
    bench: [
      {
        id: 27,
        name: "FABIANSKI",
        opponent: "MUN",
        proj: 3.8,
      },
      {
        id: 28,
        name: "PALMER",
        opponent: "ARS",
        proj: 8.2,
      },
      {
        id: 29,
        name: "PORRO",
        opponent: "AVL",
        proj: 4.2,
      },
      {
        id: 30,
        name: "BELL",
        opponent: "LIV",
        proj: 1.2,
      },
    ],
  },
];

const captainPick = {
  name: "Kevin De Bruyne",
  details: "vs Wolverhampton (H)",
  projected: "8.2 Pts",
};

const transferRecommendations = [
  { name: "Phil Foden", details: "MCI - GBP 8.2m", trend: "+14.2%" },
  { name: "Ollie Watkins", details: "AVL - GBP 8.9m", trend: "+8.7%" },
];

const formationRows = {
  "3-4-3": ["GK", "DEF", "MID", "FWD"],
  "3-5-2": ["GK", "DEF", "MID", "FWD"],
};

function SquadPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [statusMessage, setStatusMessage] = useState(
    "Squad comparison loaded. Select any player card for details.",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => window.clearTimeout(timer);
  }, []);

  const selectedSummary = useMemo(() => {
    if (!selectedPlayer) {
      return "No player selected";
    }
    return `${selectedPlayer.name} · vs ${selectedPlayer.opponent} · ${selectedPlayer.proj.toFixed(1)} pts`;
  }, [selectedPlayer]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin text-emerald-300" size={34} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Squad Comparison
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            GW12 Optimization Analysis
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {pitchViews.map((view) => (
          <div key={view.title} className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <p className={`text-xl font-bold ${view.optimized ? "text-emerald-300" : "text-white"}`}>
                  {view.title}
                </p>
                <p className="text-xs text-slate-400">{view.formation}</p>
              </div>
              <p className="text-sm text-slate-300">
                Proj: <span className="font-semibold text-emerald-300">{view.projected}</span>
              </p>
            </div>

            <section className="overflow-hidden rounded-[24px] border border-[#3d245b] bg-[#1a0f2a]">
              <div className="relative rounded-[20px] border border-emerald-400/35 bg-[linear-gradient(180deg,#08985f_0%,#0c7f53_58%,#0a6b46_100%)] px-4 py-5 sm:px-5 sm:py-6">
                <div className="pointer-events-none absolute inset-0 opacity-35">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-white/30" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
                  <div className="absolute inset-3 rounded-[20px] border border-white/20" />
                  <div className="absolute left-1/2 top-4 h-14 w-40 -translate-x-1/2 rounded-b-[24px] border border-white/20 border-t-0" />
                  <div className="absolute left-1/2 bottom-4 h-14 w-40 -translate-x-1/2 rounded-t-[24px] border border-white/20 border-b-0" />
                </div>

                <div className={`relative space-y-4 ${view.locked ? "blur-[3px]" : ""}`}>
                  {formationRows[view.formation].map((line) => (
                    <div key={line} className="flex items-center justify-around gap-2 sm:gap-3">
                      {view.players[line].map((player) => (
                        <PlayerCard
                          key={player.id}
                          player={player}
                          onSelect={(selected) => {
                            setSelectedPlayer(selected);
                            setStatusMessage(`Selected ${selected.name} from ${view.title}.`);
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {view.locked ? (
                  <div className="absolute inset-0 grid place-items-center p-4">
                    <div className="w-full max-w-[230px] rounded-2xl border border-[#4d2f70] bg-[#2a1140]/95 p-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                      <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                        <Lock size={16} />
                      </div>
                      <p className="mt-3 font-semibold text-white">Unlock AI Predictions</p>
                      <p className="mt-2 text-xs text-slate-400">
                        Get access to elite team optimization and projected points.
                      </p>
                      <button
                        onClick={() => {
                          setStatusMessage("Redirected to Premium plans.");
                          navigate("/premium");
                        }}
                        className="mt-4 w-full rounded-lg bg-emerald-400 px-3 py-2 text-sm font-bold text-[#072015]"
                      >
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="border-t border-[#321f49] bg-[#190d29] px-4 py-4 sm:px-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">Bench</p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {view.bench.map((player) => (
                    <MiniBenchCard
                      key={player.id}
                      player={player}
                      onSelect={(selected) => {
                        setSelectedPlayer(selected);
                        setStatusMessage(`Bench pick selected: ${selected.name}.`);
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>

      <section className="rounded-[22px] border border-[#3d245b] bg-[#1a0f2a] p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
          AI Captaincy Pick
        </p>
        <div className="mt-3 rounded-2xl border border-emerald-400/35 bg-[linear-gradient(120deg,rgba(41,23,64,0.95),rgba(34,58,73,0.4))] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-300/40 bg-[#1a2337] text-emerald-300">
                <UserRound size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-300">{captainPick.name}</p>
                <p className="text-xs text-slate-400">{captainPick.details}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Projected</p>
              <p className="text-xl font-bold text-emerald-300">{captainPick.projected}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[22px] border border-[#3d245b] bg-[#1a0f2a] p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
          Transfer Recommendations
        </p>
        <div className="mt-3 space-y-3">
          {transferRecommendations.map((item) => (
            <button
              key={item.name}
              onClick={() => setStatusMessage(`Transfer scout opened: ${item.name}.`)}
              className="flex w-full items-center justify-between rounded-xl border border-[#321f49] bg-[#190d29] px-4 py-3 text-left transition hover:border-emerald-400/35"
            >
              <div>
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-400">{item.details}</p>
              </div>
              <p className="text-sm font-bold text-emerald-300">{item.trend}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[20px] border border-[#3d245b] bg-[#170d27] px-4 py-3 text-sm text-slate-300">
        <span className="font-semibold text-white">Status:</span> {statusMessage}
        <span className="ml-3 text-slate-400">{selectedSummary}</span>
      </section>
    </div>
  );
}

function PlayerCard({ player, onSelect }) {
  return (
    <button
      onClick={() => onSelect(player)}
      className="w-[78px] rounded-lg bg-[#2b0f3f] p-2 text-center shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition hover:brightness-110"
    >
      <div className="mx-auto grid h-8 w-8 place-items-center rounded-md bg-[#1a1327] text-slate-200">
        <Shirt size={16} />
      </div>
      <p className="mt-2 truncate text-[9px] font-bold tracking-[0.08em] text-white">{player.name}</p>
      <p className="mt-1 text-[9px] text-slate-400">VS {player.opponent}</p>
      <p className="text-[9px] font-semibold text-emerald-300">{player.proj.toFixed(1)}</p>
    </button>
  );
}

function MiniBenchCard({ player, onSelect }) {
  return (
    <button
      onClick={() => onSelect(player)}
      className="rounded-lg border border-[#322043] bg-[#201231] p-2 text-center transition hover:border-emerald-400/35"
    >
      <div className="mx-auto grid h-7 w-7 place-items-center rounded-md bg-[#171025] text-slate-300">
        <Shirt size={14} />
      </div>
      <p className="mt-1 truncate text-[9px] font-semibold text-slate-200">{player.name}</p>
      <p className="text-[9px] text-emerald-300">{player.proj.toFixed(1)}</p>
    </button>
  );
}

export default SquadPage;
