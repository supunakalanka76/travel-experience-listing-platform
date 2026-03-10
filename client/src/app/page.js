import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">

      <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-14 sm:px-6 sm:py-20">
        {/* Hero */}
        <section className="w-full rounded-3xl border border-white/10 bg-white/3 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur sm:p-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs font-medium text-white/70">
                Explorely • travel experience platform
              </p>

              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Share your trips. Discover unforgettable places.
              </h1>

              <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                Post travel stories, photos, and tips—then browse experiences
                from travelers around the world.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/feed"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
                >
                  Explore feed
                </Link>

                <Link
                  href="/create"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/3 px-5 py-3 text-sm font-semibold text-white hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
                >
                  Create a post
                </Link>

                <Link
                  href="/register"
                  className="text-sm font-medium text-white/70 hover:text-white transition"
                >
                  New here? Register →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              title: "Post experiences",
              desc: "Write stories, upload photos, and add tips for other travelers.",
            },
            {
              title: "Discover places",
              desc: "Browse the feed for inspiration and hidden gems.",
            },
            {
              title: "Plan smarter",
              desc: "Save ideas and revisit them when you’re ready to go.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur hover:bg-white/6 transition"
            >
              <h3 className="text-sm font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {f.desc}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}