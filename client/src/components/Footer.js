import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  Heart
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-linear-to-t from-transparent to-white/50 dark:to-gray-900/50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Explorely
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Discover unique travel experiences hosted by passionate locals around the world. Create memories that last a lifetime.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'How It Works', 'Become a Host', 'Contact Us', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Safety Information', 'Cancellation Options', 'COVID-19 Updates', 'Report an Issue'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  123 Travel Street, Adventure City, AC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">hello@explorely.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 lg:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Get inspired for your next adventure
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                Subscribe to our newsletter and receive exclusive offers, travel tips, and inspiration.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            © 2024 Explorely. All rights reserved. Made with 
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            for travelers
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}