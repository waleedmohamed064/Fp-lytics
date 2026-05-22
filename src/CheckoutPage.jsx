import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { membershipPlans } from "./dashboardData";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeState = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("Complete payment to activate premium access.");

  const selectedPlan = useMemo(() => {
    return membershipPlans.find((plan) => plan.id === routeState.planId) || membershipPlans[1];
  }, [routeState.planId]);

  const total = routeState.billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceYearly;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !cardNumber || !expiry || !cvv) {
      setMessage("Fill in all payment fields before continuing.");
      return;
    }

    setMessage(`Payment captured for ${selectedPlan.name}. Premium access is now active.`);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-[#3d245b] bg-[#1e102f] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Secure Payment</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Complete Checkout</h1>
        <p className="mt-1 text-slate-400">Selected plan: {selectedPlan.name} · {routeState.billingCycle || "yearly"}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { key: "card", label: "Card" },
            { key: "wallet", label: "Wallet" },
          ].map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setPaymentMethod(option.key)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                paymentMethod === option.key
                  ? "border-emerald-400 bg-emerald-400/10 text-white"
                  : "border-[#4d2f70] bg-[#241239] text-slate-300"
              }`}
            >
              <span className="block text-sm font-semibold">{option.label}</span>
              <span className="block text-xs text-slate-400">{option.key === "card" ? "Visa / Mastercard" : "Apple Pay / Google Pay"}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4">
          <Field label="Cardholder Name" value={name} onChange={setName} placeholder="Name as it appears on card" />
          <Field label="Card Number" value={cardNumber} onChange={setCardNumber} placeholder="0000 0000 0000 0000" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Expiry Date" value={expiry} onChange={setExpiry} placeholder="MM/YY" />
            <Field label="CVV" value={cvv} onChange={setCvv} placeholder="***" />
          </div>
        </div>

        <button type="submit" className="mt-6 w-full rounded-2xl bg-emerald-400 px-4 py-4 text-lg font-bold text-[#072015] transition hover:brightness-110">
          Complete Payment
        </button>

        <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          {message}
        </p>
      </form>

      <aside className="rounded-3xl border border-[#3d245b] bg-[#1e102f] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Order Summary</p>
        <h2 className="mt-2 text-2xl font-bold text-white">{selectedPlan.name}</h2>
        <p className="text-sm text-slate-400">{routeState.billingCycle || "yearly"} subscription</p>

        <div className="mt-5 space-y-3">
          {selectedPlan.features.map((feature) => (
            <div key={feature} className="rounded-2xl border border-white/5 bg-[#241239] p-3 text-sm text-slate-200">
              {feature}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/5 bg-[#241239] p-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Base Price</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-emerald-300">
            <span>Promo Discount</span>
            <span>-$12.00</span>
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-white/5 pt-4">
            <span className="text-lg font-semibold text-white">Total Due</span>
            <span className="text-3xl font-bold text-emerald-300">${Math.max(total - 12, 0).toFixed(2)}</span>
          </div>
        </div>

        <button type="button" onClick={() => navigate("/premium")} className="mt-5 w-full rounded-2xl border border-[#4d2f70] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white">
          Back to Plans
        </button>
      </aside>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#4d2f70] bg-[#241239] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
      />
    </label>
  );
}

export default CheckoutPage;
