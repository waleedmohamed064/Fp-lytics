import { useMemo, useState } from "react";
import { membershipPlans } from "./dashboardData";
import { useNavigate } from "react-router-dom";

function PremiumPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const navigate = useNavigate();

  const selectedPriceLabel = useMemo(
    () => (billingCycle === "yearly" ? "year" : "month"),
    [billingCycle],
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Membership Plans</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Dominate with FPLytics Pro</h1>
        <p className="mt-1 max-w-3xl text-slate-400">Upgrade to unlock AI-driven insights, premium comparisons, and the new protected pages.</p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-[#3d245b] bg-[#1e102f] p-2 w-fit">
        {[
          { key: "monthly", label: "Monthly" },
          { key: "yearly", label: "Yearly" },
        ].map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setBillingCycle(option.key)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              billingCycle === option.key
                ? "bg-emerald-400 text-[#072015]"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {membershipPlans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl border p-6 ${plan.id === "premium" ? "border-emerald-400/60 bg-[#251036]" : "border-[#3d245b] bg-[#1e102f]"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{plan.badge}</p>
                <h2 className="mt-2 text-2xl font-bold text-white">{plan.name}</h2>
              </div>
              {plan.id === "premium" ? (
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300">Popular</span>
              ) : null}
            </div>

            <div className="mt-5">
              <p className="text-4xl font-bold text-emerald-300">
                ${billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly}
                <span className="text-base font-medium text-slate-400">/{selectedPriceLabel}</span>
              </p>
            </div>

            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => navigate("/checkout", { state: { planId: plan.id, billingCycle } })}
              className="mt-6 w-full rounded-xl bg-emerald-400 px-4 py-3 font-bold text-[#072015] transition hover:brightness-110"
            >
              Go to Checkout
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PremiumPage;
