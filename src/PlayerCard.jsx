function PlayerCard({ player }) {
  if (!player) {
    return null;
  }

  // Real API data will be passed into this component as the player prop.
  const {
    name,
    team,
    position,
    price,
    expectedPoints,
    totalPoints,
    nextFixture,
    imageUrl
  } = player;

  const stats = [
    {
      label: "Price",
      // Real API data injection: player.price
      value: typeof price === "number" ? `GBP ${price.toFixed(1)}m` : "-"
    },
    {
      label: "xPts",
      // Real API data injection: player.expectedPoints
      value: typeof expectedPoints === "number" ? expectedPoints.toFixed(2) : "-"
    },
    {
      label: "Total",
      // Real API data injection: player.totalPoints
      value: typeof totalPoints === "number" ? totalPoints : "-"
    }
  ];

  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#3b2259] bg-[#1e102f] p-4 text-slate-100 shadow-[0_14px_35px_rgba(5,0,18,0.6)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_48%)]" />

      <div className="relative flex items-start gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#4d2f70] bg-[#2a1543]">
          {/* Real API data injection: player.imageUrl */}
          <img
            src={imageUrl || "https://via.placeholder.com/120x120?text=Player"}
            alt={name || "FPL player"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* Real API data injection: player.name */}
            <h3 className="truncate text-lg font-bold tracking-wide text-white">{name}</h3>
            {/* Real API data injection: player.position */}
            <span className="rounded-full border border-emerald-300/50 bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
              {position}
            </span>
          </div>

          {/* Real API data injection: player.team */}
          <p className="mt-1 text-sm text-slate-300">{team}</p>

          <p className="mt-2 inline-flex items-center rounded-md bg-[#2a1543] px-2 py-1 text-xs font-medium text-emerald-300">
            {/* Real API data injection: player.nextFixture */}
            Next Match: {nextFixture}
          </p>
        </div>
      </div>

      <div className="relative mt-4 h-1 rounded-full bg-[#331c4f]">
        <div className="h-1 w-2/3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-[#40255f] bg-[#241239] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
            <p className="mt-1 text-base font-semibold text-emerald-300">{stat.value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default PlayerCard;
