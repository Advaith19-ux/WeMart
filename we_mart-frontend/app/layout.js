import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from '../context/CartContext'; // 🟢 1. Import your context manager
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'WeMart Marketplace',
  description: 'Verified inventory data pipelines architecture storefront.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {/* 🟢 2. Wrap your layout tree inside the provider so useCart() is available anywhere! */}
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
