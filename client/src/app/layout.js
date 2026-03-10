import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Explorely - Travel Experience Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-white/20 selection:text-white">
      <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(24,24,27,0.9)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
            },
          }}
        />
        {/* Subtle background texture */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-10%,rgba(255,255,255,0.14),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(40rem_30rem_at_10%_30%,rgba(56,189,248,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(40rem_30rem_at_90%_60%,rgba(167,139,250,0.10),transparent_60%)]" />
        </div>

        <Navbar />

        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur sm:p-8">
            {children}
          </div>
        </main>

        <footer className="mx-auto w-full max-w-6xl px-4 pb-10 text-xs text-white/50 sm:px-6">
          <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Explorely</span>
            <span className="text-white/40">
              Built with Next.js + Tailwind
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}