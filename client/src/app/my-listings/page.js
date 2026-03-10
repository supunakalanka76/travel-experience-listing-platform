"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "../../services/api";
import toast from "react-hot-toast";

const HOURS_24_MS = 24 * 60 * 60 * 1000;

function canModify(createdAt) {
  if (!createdAt) return false;
  const t = new Date(createdAt).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t <= HOURS_24_MS;
}

export default function MyListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchMyListings = async () => {
    try {
      setErrorMsg(null);
      setLoading(true);
      const res = await API.get("/listings/my");
      setListings(res.data || []);
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "Couldn’t load your listings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/listings/${id}`);
      toast.success("Listing deleted");
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-white/50">My Listings</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Manage your posts
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
            You can edit or delete a listing only within 24 hours of posting.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Create
          </Link>

          <button
            onClick={fetchMyListings}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/3 px-4 py-2 text-sm font-semibold text-white hover:bg-white/6 transition cursor-pointer"
          >
            Refresh
          </button>
        </div>
      </div>

      {errorMsg ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
          {errorMsg}
        </div>
      ) : null}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-white/10 bg-white/3"
            />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center backdrop-blur">
          <h2 className="text-base font-semibold text-white">No listings yet</h2>
          <p className="mt-2 text-sm text-white/65">
            Create your first travel experience.
          </p>
          <Link
            href="/create"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Create a post
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => {
            const allowed = canModify(l.createdAt);

            return (
              <div
                key={l._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur"
              >
                <div className="p-4">
                  <p className="text-sm font-semibold text-white">{l.title}</p>
                  <p className="mt-1 text-xs text-white/55">{l.location}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-white/70">
                    {l.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={`/my-listings/edit/${l._id}`}
                      className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        allowed
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-white/10 text-white/40 cursor-not-allowed pointer-events-none"
                      }`}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(l._id)}
                      disabled={!allowed}
                      className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                        allowed
                          ? "border border-red-500/30 text-red-200 hover:bg-red-500/10"
                          : "border border-white/10 text-white/35 cursor-not-allowed"
                      }`}
                    >
                      Delete
                    </button>

                    {!allowed ? (
                      <span className="ml-auto text-[11px] text-white/45">
                        Locked (24h)
                      </span>
                    ) : (
                      <span className="ml-auto text-[11px] text-white/45">
                        Editable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}