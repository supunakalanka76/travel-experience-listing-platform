"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout, ready, user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };

    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // If auth changes to logged out, ensure dropdown closes
  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => setMenuOpen(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    toast.success("Logged out");
    router.push("/login");
  };

  const displayName = user?.name?.trim() || "Profile";

  const avatarLetter = useMemo(() => {
    const first = (user?.name || "").trim().charAt(0).toUpperCase();
    return first || "U";
  }, [user?.name]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 text-white backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="rounded-md px-2 py-1 text-lg font-semibold tracking-tight hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span className="bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
            Explorely
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/create"
            className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
          >
            Create
          </Link>

          {/* Avoid SSR/client mismatch: don't render auth-specific UI until ready */}
          {!ready ? null : !isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black text-sm font-semibold">
                  {avatarLetter}
                </span>

                <span className="hidden text-sm font-medium text-white/80 sm:block">
                  {displayName}
                </span>

                <span className="text-white/60">▾</span>
              </button>

              {menuOpen ? (
                <div
                  className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-[0_12px_50px_rgba(0,0,0,0.6)] backdrop-blur"
                  role="menu"
                >
                  {/* user header */}
                  <div className="px-3 py-3 border-b border-white/10">
                    <div className="text-sm font-semibold text-white">
                      {user?.name || "User"}
                    </div>
                    {user?.email ? (
                      <div className="mt-0.5 text-xs text-white/50">
                        {user.email}
                      </div>
                    ) : null}
                  </div>

                  <Link
                    href="/my-listings"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-white/85 hover:bg-white/10 transition"
                    role="menuitem"
                  >
                    My Listings
                  </Link>

                  <Link
                    href="/saved"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-white/85 hover:bg-white/10 transition"
                    role="menuitem"
                  >
                    Saved
                  </Link>

                  <div className="my-1 h-px bg-white/10" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm font-medium text-red-200 hover:bg-red-500/10 transition cursor-pointer"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}