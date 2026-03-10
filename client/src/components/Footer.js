"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/10">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(50rem_30rem_at_50%_120%,rgba(255,255,255,0.10),transparent_65%)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/feed"
              className="inline-flex items-center rounded-md px-2 py-1 text-base font-semibold tracking-tight text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <span className="bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                Explorely
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-white/60">
              Discover and share travel experiences with the community. Save your
              favorites and get inspired for your next trip.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Twitter, label: "Twitter", href: "#" },
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white/85">Quick links</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/feed"
                className="text-white/60 hover:text-white transition"
              >
                Feed
              </Link>
              <Link
                href="/create"
                className="text-white/60 hover:text-white transition"
              >
                Create listing
              </Link>
              <Link
                href="/my-listings"
                className="text-white/60 hover:text-white transition"
              >
                My listings
              </Link>
              <Link
                href="/saved"
                className="text-white/60 hover:text-white transition"
              >
                Saved
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white/85">Contact</p>

            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-white/50" />
                <span>Colombo, Sri Lanka</span>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-white/50" />
                <Link
                  href="mailto:hello@explorely.com"
                  className="hover:text-white transition"
                >
                  hello@explorely.com
                </Link>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-white/50" />
                <Link
                  href="tel:+94110000000"
                  className="hover:text-white transition"
                >
                  +94 11 000 0000
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/50 flex items-center gap-1">
            © {new Date().getFullYear()} Explorely. All rights reserved. Made
            with <Heart className="h-4 w-4 text-red-400 fill-red-400" /> for
            travelers
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="#" className="text-white/55 hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/55 hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/55 hover:text-white transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}