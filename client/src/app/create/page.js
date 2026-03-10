"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function CreateListing() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    image: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const imageOk = useMemo(() => {
    if (!form.image) return false;
    try {
      // basic validation for http(s) URLs
      const u = new URL(form.image);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }, [form.image]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await API.post("/listings", form);
      toast.success("Listing created");
      router.push("/feed");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Error creating listing. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-white/50">Create</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
            Add Travel Experience
          </h1>
          <p className="mt-2 text-sm text-white/65">
            Share a title, location, a short story, and an image link.
          </p>
        </div>

        <Link
          href="/feed"
          className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <span aria-hidden>←</span> Back to feed
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        {/* Form */}
        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Sunrise in Bali"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Ubud, Indonesia"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="https://..."
                value={form.image}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
              />
              <p className="text-xs text-white/45">
                Tip: use a direct image link (jpg/png/webp).
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Description
              </label>
              <textarea
                name="description"
                placeholder="What made this trip special? Any tips for others?"
                value={form.description}
                onChange={handleChange}
                rows={6}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
                required
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
              >
                {submitting ? "Creating…" : "Create Listing"}
              </button>

              <span className="text-xs text-white/45">
                Make sure your image URL is public.
              </span>
            </div>
          </form>
        </div>

        {/* Preview card */}
        <aside className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur sm:p-8">
          <h2 className="text-sm font-semibold text-white">Preview</h2>
          <p className="mt-1 text-sm text-white/60">
            This is how it’ll look in the feed.
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <div className="relative h-44 w-full">
              {imageOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs text-white/45">
                  Add a valid Image URL to preview
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  {form.title || "Your title"}
                </h3>
                <span className="text-white/50">→</span>
              </div>

              <p className="mt-1 text-xs text-white/60">
                {form.location || "Your location"}
              </p>

              <p className="mt-3 text-sm text-white/70">
                {(form.description || "Your description…").slice(0, 90)}
                {(form.description || "").length > 90 ? "…" : ""}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}