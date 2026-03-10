"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../services/api";
import Image from "next/image";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setListing(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative w-full h-96">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <h1 className="text-3xl font-bold mt-6">{listing.title}</h1>

      <p className="text-gray-600 mt-2">{listing.location}</p>

      <p className="mt-6">{listing.description}</p>
    </div>
  );
}