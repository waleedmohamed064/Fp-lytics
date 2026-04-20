import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, Shield, User } from "lucide-react";
import { registerUser } from "./api";

const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

    if (!formData.email || !formData.password || !formData.username) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // API Integration: http://127.0.0.1:8000/api/register/
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Store auth token if provided
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.message || "Unable to create account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
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
                Create Account
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Join FPLytics to get started with AI-powered FPL analytics.
              </p>
            </header>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Username
                </label>
                <div className="relative mt-2">
                  <User
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Your Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#472a67] bg-[#26143b] py-3 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

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
                <label
                  htmlFor="password"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-[#472a67] bg-[#26143b] py-3 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previousState) => !previousState)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
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
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </section>

          <footer className="mt-5 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleBackToLogin}
                className="font-semibold uppercase tracking-[0.1em] text-emerald-300 hover:text-emerald-200"
              >
                Sign In
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

export default Register;
