"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import ListingCard from "@/components/ListingCard";


export default function Feed() {

  const [listings, setListings] = useState([]);

  const fetchListings = async () => {

    try {

      const res = await API.get("/listings");

      setListings(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadListings = async () => {
      await fetchListings();
    };
    loadListings();
  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Travel Experiences
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}

      </div>

    </div>
  );
}