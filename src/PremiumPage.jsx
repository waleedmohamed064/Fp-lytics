import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const proPlanFeatures = [
  "AI-Powered Team Optimization",
  "Advanced Player Analytics",
  "Fixture Difficulty Rankings",
  "Transfer Recommendations",
  "Performance Predictions",
  "Historical Data Analysis",
  "Injury Risk Assessment",
  "Price Change Forecasts",
];

function PremiumPage() {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const navigate = useNavigate();

  const pricing = useMemo(
    () => ({
      monthly: { price: 4.99, period: "month" },
      yearly: { price: 29.99, period: "season" },
    }),
    [],
  );

  const currentPricing = pricing[billingCycle];

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
          { key: "yearly", label: "Yearly (Full Season)" },
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

      <div className="flex items-center justify-center">
        <div className="rounded-3xl border border-emerald-400/60 bg-[#251036] p-8 sm:p-10 w-full max-w-2xl">
          <div className="flex items-start justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">Elite Membership</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Pro</h2>
            </div>
            <span className="rounded-full bg-emerald-400/20 border border-emerald-400/60 px-4 py-2 text-sm font-semibold text-emerald-300">
              Most Popular
            </span>
          </div>

          <div className="mb-8">
            <p className="text-5xl font-bold text-emerald-300">
              ${currentPricing.price}
              <span className="text-lg font-medium text-slate-400">/{currentPricing.period}</span>
            </p>
            {billingCycle === "yearly" && (
              <p className="mt-2 text-sm text-emerald-300/80">
                Save 80% compared to monthly billing
              </p>
            )}
          </div>

          <ul className="mb-8 space-y-3">
            {proPlanFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => navigate("/checkout", { state: { planId: "pro", billingCycle, price: currentPricing.price } })}
            className="w-full rounded-xl bg-emerald-400 px-6 py-4 font-bold text-[#072015] text-lg transition hover:brightness-110"
          >
            Get Started Today
          </button>

          <p className="mt-4 text-center text-xs text-slate-400">
            Cancel anytime. No commitment required.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PremiumPage;
