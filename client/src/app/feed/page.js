"use client";

import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import ListingCard from "@/components/ListingCard";

export default function Feed() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Search state
  const [q, setQ] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const fetchListings = async (query = "") => {
    try {
      setErrorMsg(null);

      const res = await API.get("/listings", {
        params: query && query.trim() ? { q: query.trim() } : {},
      });

      setListings(res.data || []);
    } catch (error) {
      console.log(error);
      setErrorMsg("Couldn’t load listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings("");
  }, []);

  const onSearch = () => {
    setLoading(true);
    const next = q.trim();
    setActiveQuery(next);
    fetchListings(next);
  };

  const onClear = () => {
    setQ("");
    setActiveQuery("");
    setLoading(true);
    fetchListings("");
  };

  const showingText = useMemo(() => {
    if (loading) return "Loading…";
    if (activeQuery) return `Results for “${activeQuery}”`;
    return "All experiences";
  }, [loading, activeQuery]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-white/50">Feed</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Travel Experiences
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
            Browse recent trips and stories from the community. Click a card to
            view the full experience.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setLoading(true);
              fetchListings(activeQuery);
            }}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/3 px-4 py-2 text-sm font-semibold text-white hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition disabled:opacity-50 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
            }}
            placeholder="Search by title, location, or description…"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
          />
          <p className="mt-2 text-xs text-white/45">{showingText}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onSearch}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90 transition disabled:opacity-50 mb-6 cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* Status */}
      {errorMsg ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
          {errorMsg}
        </div>
      ) : null}

      {/* Loading skeletons */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur"
            >
              <div className="h-48 w-full animate-pulse bg-white/10" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-full animate-pulse rounded bg-white/10" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center backdrop-blur">
          <h2 className="text-base font-semibold text-white">
            {activeQuery ? "No matches found" : "No posts yet"}
          </h2>
          <p className="mt-2 text-sm text-white/65">
            {activeQuery
              ? "Try a different keyword (e.g., a location or title)."
              : "Be the first to share a travel experience."}
          </p>

          {!activeQuery ? (
            <a
              href="/create"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
            >
              Create a post
            </a>
          ) : (
            <button
              onClick={onClear}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>

          {/* Footer hint */}
          <p className="text-center text-xs text-white/45">
            Showing {listings.length}{" "}
            {listings.length === 1 ? "experience" : "experiences"}
            {activeQuery ? ` for “${activeQuery}”` : ""}
          </p>
        </>
      )}
    </div>
  );
}