"use client";

import Image from "next/image";
import Link from "next/link";

export default function ListingCard({ listing }) {
  return (
    <Link href={`/listing/${listing._id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg cursor-pointer">
        <div className="relative w-full h-48">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover rounded"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>

        <h2 className="text-xl font-semibold mt-3">{listing.title}</h2>

        <p className="text-gray-600">{listing.location}</p>

        <p className="text-sm mt-2">{listing.description.slice(0, 80)}...</p>
      </div>
    </Link>
  );
}