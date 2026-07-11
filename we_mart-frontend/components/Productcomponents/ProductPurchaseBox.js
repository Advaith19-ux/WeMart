"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "../../app/utils";

export default function ProductPurchaseBox({ product }) {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    setLoading(true);

    try {
      const res = await addToCart(product.asin, quantity);

      if (res.status === 401) {
        setModal("login");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to add product.");
      }

      setModal("success");

      setTimeout(() => {
        setModal(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="border rounded-xl p-6 shadow-sm bg-white sticky top-24">

        <h2 className="text-3xl font-bold text-green-700">
          ${Number(product.final_price).toFixed(2)}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          FREE Delivery
        </p>

        <p className="text-green-600 font-semibold mt-3">
          In Stock
        </p>

        {/* Quantity */}

        <div className="mt-5">
          <label className="block text-sm font-medium mb-2">
            Quantity
          </label>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              className="w-10 h-10 border rounded-lg"
            >
              −
            </button>

            <span className="font-bold text-lg">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 border rounded-lg"
            >
              +
            </button>

          </div>
        </div>

        {/* Buttons */}

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 rounded-full py-3 font-semibold"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>

        <button
          className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold"
        >
          Buy Now
        </button>

      </div>

      {/* Success Modal */}

      {modal === "success" && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 text-center">

            <div className="text-5xl mb-3">
              ✅
            </div>

            <h2 className="text-2xl font-bold">
              Added to Cart
            </h2>

            <p className="text-gray-500 mt-2">
              Product added successfully.
            </p>

          </div>
        </div>
      )}

      {/* Login Modal */}

      {modal === "login" && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 text-center">

            <div className="text-5xl mb-3">
              🔒
            </div>

            <h2 className="text-2xl font-bold">
              Login Required
            </h2>

            <p className="text-gray-500 mt-3">
              Please sign in to add products to your cart.
            </p>

            <button
              onClick={() => router.push("/signin")}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg"
            >
              Sign In
            </button>

            <button
              onClick={() => setModal(null)}
              className="mt-3 w-full border py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
}