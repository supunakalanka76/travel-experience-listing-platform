"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../services/api";
import Image from "next/image";
import Link from "next/link";

export default function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setErrorMsg(null);
        const res = await API.get(`/listings/${id}`);
        setListing(res.data);
      } catch (error) {
        console.log(error);
        setErrorMsg("Couldn’t load this listing. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="h-10 w-40 animate-pulse rounded-xl bg-white/10" />
        <div className="h-88 w-full animate-pulse rounded-3xl bg-white/10" />
        <div className="h-8 w-2/3 animate-pulse rounded-lg bg-white/10" />
        <div className="h-4 w-1/3 animate-pulse rounded-lg bg-white/10" />
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <Link
          href="/feed"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition"
        >
          <span aria-hidden>←</span> Back to feed
        </Link>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
          {errorMsg}
        </div>
      </div>
    );
  }

  if (!listing) return null;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/feed"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span aria-hidden>←</span> Back to feed
        </Link>

        {listing.location ? (
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/3 px-3 py-1 text-xs font-medium text-white/70">
            {listing.location}
          </span>
        ) : null}
      </div>

      {/* Hero image */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <div className="relative h-88 w-full sm:h-104">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              {listing.title}
            </h1>
            {listing.location ? (
              <p className="mt-2 text-sm text-white/75">{listing.location}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="rounded-2xl border border-white/10 bg-white/3 p-5 leading-relaxed text-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur sm:p-7">
        <h2 className="text-sm font-semibold text-white">About this trip</h2>

        <div className="mt-3 whitespace-pre-wrap text-sm sm:text-base">
          {listing.description ? (
            listing.description
          ) : (
            <span className="text-white/60">No description provided.</span>
          )}
        </div>
      </article>
    </div>
  );
}