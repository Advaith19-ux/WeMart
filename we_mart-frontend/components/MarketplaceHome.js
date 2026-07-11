// components/MarketplaceHome.js
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MarketplaceHome() {
  const { user } = useCart();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Essentials');
  const [loading, setLoading] = useState(true);
  const categoryRef = useRef(null);
  const observer = useRef(null);

  const quickCategories = [
    { name: "All Essentials", icon: "🛍️" },
    { name: "Electronics", icon: "⚡" },
    { name: "Pet Supplies", icon: "🐶" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Sports & Outdoors", icon: "🏃" },
    { name: "Health & Household", icon: "💊" },
    { name: "Beauty & Personal Care", icon: "💄" },
    { name: "Toys & Games", icon: "🧸" },
    { name: "Books", icon: "📚" },
    { name: "Clothing, Shoes & Jewelry", icon: "👕" },
  ];

  const scrollLeft = () => {
    categoryRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    categoryRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);

    loadProducts(1, true);
  }, [selectedCategory]);

  useEffect(() => {
    if (page === 1) return;

    loadProducts(page);
  }, [page]);

  async function loadProducts(currentPage = 1, reset = false) {
    if (!hasMore && !reset) return;

    setLoading(true);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://127.0.0.1:5000";

      let endpoint = `/api/products?page=${currentPage}&limit=20`;

      if (selectedCategory !== "All Essentials") {
        endpoint = `/api/categories/${selectedCategory}`;
      }

      const res = await fetch(baseUrl + endpoint, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      let newProducts = [];

      if (Array.isArray(data)) {
        newProducts = data;
        setHasMore(false);
      } else {
        newProducts = data.products || [];

        if (selectedCategory === "All Essentials") {
          setHasMore(currentPage < data.totalPages);
        } else {
          setHasMore(false);
        }
      }

      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Safe from auth loops
  console.log(selectedCategory);


  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          selectedCategory === "All Essentials"
        ) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, selectedCategory]
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20">

      {/* HERO BANNER SECTION */}
      <section className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white py-16 px-6 md:px-12 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Launching Fresh Updates
            </span>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-4 mb-6 leading-tight">
              {user ? (
                <>
                  Welcome back, <br />
                  <span className="text-indigo-400 capitalize">
                    {user.email ? user.email.split('@')[0] : 'User'}
                  </span>
                </>
              ) : (
                <>
                  Everything you need. <br />
                  <span className="text-indigo-400">Delivered seamlessly.</span>
                </>
              )}
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-md font-light leading-relaxed">
              {user
                ? "Ready to manage your workspace inventory pipelines? Explore your personalized profile directory rows or track active catalog updates below."
                : "From everyday lifestyle gear like yoga mats to cutting-edge tech. Explore our verified data-backed inventory catalog today."
              }
            </p>
            <a href="#catalog" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm inline-block">
              Browse Entire Marketplace ↓
            </a>
          </div>
          <div className="hidden md:flex justify-center select-none">
            <div className="w-80 h-80 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden backdrop-blur-3xl shadow-2xl">
              <span className="text-8xl transform animate-bounce duration-1000">📦</span>
              <div className="absolute -bottom-4 bg-white/5 w-full text-center py-2 text-xs font-mono tracking-widest text-gray-400 border-t border-white/5">
                WE_MART.DATASET_ACTIVE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER CATEGORIES CHIPS BAR */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 mb-8">
        <div className="relative">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>

          {/* Categories */}
          <div
            ref={categoryRef}
            className="flex gap-3 overflow-x-auto px-12 no-scrollbar scroll-smooth"
          >
            {quickCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold border transition-all whitespace-nowrap ${selectedCategory === cat.name
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                  }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight />
          </button>

        </div>
      </section>

      {/* PRODUCTS NETWORKING GRID */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl max-w-md mx-auto shadow-sm">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-gray-900 mt-4">No Inventory Matrix Matches</h3>
            <p className="text-gray-400 text-xs mt-1 px-4">No data matches this pipeline query. Try another chip filter parameter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item, index) => {
              if (index === products.length - 1) {
                return (
                  <div ref={lastProductRef} key={item.asin}>
                    <ProductCard product={item} />
                  </div>
                );
              }

              return (
                <ProductCard
                  key={item.asin}
                  product={item}
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}