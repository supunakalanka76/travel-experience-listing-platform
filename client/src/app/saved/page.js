"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import ListingCard from "@/components/ListingCard";

export default function SavedPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchSaved = async () => {
    try {
      setErrorMsg(null);
      setLoading(true);
      const res = await API.get("/saved");
      setListings(res.data || []);
    } catch (error) {
      console.log(error);
      setErrorMsg("Couldn’t load saved listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-white/50">Saved</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Saved Listings
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
            Your bookmarked travel experiences. Click a card to view details.
          </p>
        </div>

        <button
          onClick={fetchSaved}
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/3 px-4 py-2 text-sm font-semibold text-white hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {/* Status */}
      {errorMsg ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
          {errorMsg}
        </div>
      ) : null}

      {/* Content */}
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
            No saved listings
          </h2>
          <p className="mt-2 text-sm text-white/65">
            Save listings from the feed to find them here later.
          </p>
          <a
            href="/feed"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
          >
            Browse feed
          </a>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>

          <p className="text-center text-xs text-white/45">
            Showing {listings.length}{" "}
            {listings.length === 1 ? "saved listing" : "saved listings"}
          </p>
        </>
      )}
    </div>
  );
}