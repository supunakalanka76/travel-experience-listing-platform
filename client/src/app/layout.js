import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "rgba(2, 6, 23, 0.72)",
              color: "rgba(248, 250, 252, 0.95)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              backdropFilter: "blur(12px)",
            },
          }}
        />
        <AuthProvider>
          <div className="relative flex min-h-dvh flex-col">
            <Navbar />

            <main className="flex-1">
              <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
                <section className="travel-card p-4 sm:p-6 lg:p-6">
                  {children}
                </section>
              </div>
            </main>

            <footer className="mx-auto w-full max-w-6xl px-4 pb-10 text-xs text-muted-foreground sm:px-6">
              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Footer />
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}