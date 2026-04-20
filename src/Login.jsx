import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, Shield } from "lucide-react";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Real API integration point:
      // Replace this timeout with your auth request (fetch/axios/firebase/etc.).
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      console.log("Login payload:", formData);
    } catch (error) {
      setErrorMessage("Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Real OAuth integration point:
    // Trigger Google/Facebook sign-in flow here.
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#130b20] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,35,120,0.35),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-[radial-gradient(circle_at_bottom,rgba(0,230,118,0.14),transparent_60%)]" />

      <main className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-5 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3c2458] bg-[#190d2a] px-3 py-2 shadow-[0_0_20px_rgba(0,230,118,0.08)]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#23113a] text-emerald-300">
                <Shield size={16} strokeWidth={2.4} />
              </span>
              <span className="text-lg font-semibold tracking-wide text-emerald-300">
                FPLytics
              </span>
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
              AI Analytics Platform
            </p>
          </div>

          <section className="rounded-3xl border border-[#3d245b] bg-[#1e102f] px-5 py-6 shadow-[0_20px_45px_rgba(5,0,18,0.65)] sm:px-7 sm:py-8">
            <header>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Welcome Back
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Please enter your details to log in.
              </p>
            </header>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Email Address
                </label>
                <div className="relative mt-2">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="manager@fplytics.app"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#472a67] bg-[#26143b] py-3 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-300 transition hover:text-emerald-200"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative mt-2">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-[#472a67] bg-[#26143b] py-3 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previousState) => !previousState)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <p className="rounded-lg border border-rose-400/40 bg-rose-400/10 px-3 py-2 text-xs font-medium text-rose-200">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#00e676] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#072015] shadow-[0_0_25px_rgba(0,230,118,0.45)] transition hover:brightness-105 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#3c2458]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Or Continue With
              </span>
              <span className="h-px flex-1 bg-[#3c2458]" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#5a2a36] bg-[#271322] px-3 py-2.5 text-sm font-medium text-slate-100 transition hover:border-[#ea4335]/70"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ea4335]/25 text-xs font-bold text-[#ff8b80]">
                  G
                </span>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2a4375] bg-[#141f35] px-3 py-2.5 text-sm font-medium text-slate-100 transition hover:border-[#1877f2]/70"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#1877f2]/25 text-sm font-bold text-[#8cbcff]">
                  f
                </span>
                Facebook
              </button>
            </div>
          </section>

          <footer className="mt-5 text-center">
            <p className="text-xs text-slate-400">
              New to the league?{" "}
              <button
                type="button"
                className="font-semibold uppercase tracking-[0.1em] text-emerald-300 hover:text-emerald-200"
              >
                Choose an account
              </button>
            </p>
            <div className="mt-3 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.15em] text-slate-500">
              <button type="button" className="transition hover:text-slate-300">
                Privacy
              </button>
              <button type="button" className="transition hover:text-slate-300">
                Terms
              </button>
              <button type="button" className="transition hover:text-slate-300">
                Support
              </button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Login;
