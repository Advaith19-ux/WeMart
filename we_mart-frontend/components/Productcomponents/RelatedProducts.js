"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

export default function RelatedProducts({ asin }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL ||
          "http://127.0.0.1:5000";

        const res = await fetch(
          `${baseUrl}/api/products/related/${asin}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch related products");
        }

        const data = await res.json();

        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedProducts();
  }, [asin]);

  if (loading) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Related Products
        </h2>

        <p className="text-gray-500">
          Loading...
        </p>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">

      <h2 className="text-2xl font-bold mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product.asin}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}