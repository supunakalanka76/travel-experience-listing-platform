"use client";

import Image from "next/image";
import Link from "next/link";

export default function ListingCard({ listing }) {
  return (
    <Link
      href={`/listing/${listing._id}`}
      className="group block focus:outline-none"
      aria-label={`View listing: ${listing.title}`}
    >
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] focus-within:ring-2 focus-within:ring-white/30">
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

            {/* subtle arrow */}
            <span className="mt-0.5 text-white/50 transition group-hover:text-white/80">
              →
            </span>
          </div>

          {listing.description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
              {listing.description}
            </p>
          ) : null}

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-white/50">
              View details
              <span className="transition group-hover:translate-x-0.5 inline-block">
                {" "}
                →
              </span>
            </span>

            <span className="rounded-full border border-white/10 bg-white/3 px-2 py-1 text-[11px] font-medium text-white/70">
              Explorely
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}