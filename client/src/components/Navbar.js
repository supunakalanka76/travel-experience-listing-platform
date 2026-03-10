"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 text-white backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/feed"
          className="text-lg font-semibold tracking-tight hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md px-2 py-1"
        >
          <span className="bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
            Travel Experiences
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/create"
            className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
          >
            Create
          </Link>

          <Link
            href="/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-md bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}