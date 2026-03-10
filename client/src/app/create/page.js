"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";

export default function CreateListing() {

  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/listings", form);

      alert("Listing created");

      router.push("/feed");

    } catch (error) {

      alert("Error creating listing");
    }
  };

  return (

    <div className="max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Add Travel Experience
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button className="bg-black text-white px-4 py-2 w-full">
          Create Listing
        </button>

      </form>

    </div>
  );
}