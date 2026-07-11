// components/Navbar.js
"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // 🟢 Added usePathname to inspect current layout position
import { useCart } from '../context/CartContext';
import { ShoppingCart, Package } from "lucide-react";

export default function Navbar() {
  const { user, logoutUser } = useCart();
  const router = useRouter();
  const pathname = usePathname(); // 🟢 Read current route path string
  const { cart } = useCart();
  // Inside components/Navbar.js component body

  const handleGlobalSignOut = () => {
    logoutUser(); // 🟢 Wipes context state. This sends an instant broadcast to MarketplaceHome!
    router.push('/'); // Clean alignment security parameter
  };

  console.log(cart);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* BRAND IDENTITY LOGO */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-gray-900">
          <span>We</span>
          <span className="text-indigo-600">Mart</span>
        </Link>

        {/* NAVIGATION CONTROL INTERFACES */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
            Catalog
          </Link>

          {/* CART */}
          {/* <Link
            href="/cart"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600"
          >
            <ShoppingCart size={18} />
            Cart
          </Link> */}

          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600"
          >
            <ShoppingCart size={18} />

            <span>Cart</span>

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          <Link
            href="/orders"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600"
          >
            <Package size={18} />
            <span>Orders</span>
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
                Profile 👤
              </Link>
              <button
                onClick={handleGlobalSignOut}
                className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer border-none"
              >
                Sign Out 🔌
              </button>
            </>
          ) : (
            /* 🟢 REPLACED: Changed the label dynamically to read "Sign In / Sign Up" when a visitor is logged out */
            <Link
              href="/auth"
              className="bg-gray-900 hover:bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm whitespace-nowrap"
            >
              Sign In / Sign Up 🔐
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}