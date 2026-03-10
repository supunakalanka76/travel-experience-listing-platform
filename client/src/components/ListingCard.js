"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

function timeAgo(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.max(0, Math.floor(diffMs / 1000));

  if (diffSec < 60) return `Posted ${diffSec}s ago`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `Posted ${diffMin}m ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `Posted ${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `Posted ${diffDay}d ago`;

  return `Posted ${date.toLocaleDateString()}`;
}

export default function ListingCard({ listing }) {
  const authorName = listing?.user?.name || "Unknown";
  const postedText = useMemo(
    () => timeAgo(listing?.createdAt),
    [listing?.createdAt]
  );

  // Defensive: avoid runtime crash if listing is missing
  if (!listing) return null;

  return (
    <Link
      href={`/listing/${listing._id}`}
      className="group block focus:outline-none"
      aria-label={`View listing: ${listing?.title || "listing"}`}
    >
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-white/15">
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />

          {/* soft gradient for readability */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80" />

          {/* location pill */}
          {listing.location ? (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-xs font-medium text-white/85 backdrop-blur">
                {listing.location}
              </span>
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-base font-semibold leading-snug text-white">
              {listing.title}
            </h2>

            <span className="mt-0.5 text-white/50 transition group-hover:text-white/80">
              →
            </span>
          </div>

          {/* Short description */}
          {listing.description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
              {listing.description}
            </p>
          ) : (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">
              No description provided.
            </p>
          )}

          {/* Meta: user + time */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs text-white/60">
                By <span className="text-white/80">{authorName}</span>
              </p>
              {postedText ? (
                <p className="text-[11px] text-white/45">{postedText}</p>
              ) : null}
            </div>

            <span className="rounded-full border border-white/10 bg-white/3 px-2 py-1 text-[11px] font-medium text-white/70">
              Explorely
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}