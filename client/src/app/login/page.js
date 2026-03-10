"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login, ready, isLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect away from login page
  useEffect(() => {
    if (!ready) return;
    if (isLoggedIn) router.push("/feed");
  }, [ready, isLoggedIn, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      const { token, _id, name, email: userEmail } = res?.data || {};
      if (!token) throw new Error("Missing token");

      // Store both token + user in AuthContext (and localStorage via context)
      login({
        token,
        user: { _id, name, email: userEmail },
      });

      toast.success("Logged in successfully");
      router.push("/feed");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed. Check your email/password and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-medium text-white/50">Welcome back</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
            Login
          </h1>
          <p className="mt-2 text-sm text-white/65">
            Sign in to continue exploring travel experiences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/80">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pr-16 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Signing in…" : "Login"}
          </button>

          <p className="pt-2 text-center text-sm text-white/60">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-white hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      <p className="mt-4 text-center text-xs text-white/40">
        By continuing, you agree to our terms.
      </p>
    </div>
  );
}