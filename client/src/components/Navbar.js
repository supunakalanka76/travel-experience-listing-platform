"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-black text-white p-4 flex justify-between">
      <Link href="/feed" className="font-bold">
        Travel Experiences
      </Link>

      <div className="space-x-4">
        <Link href="/create">Create</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}