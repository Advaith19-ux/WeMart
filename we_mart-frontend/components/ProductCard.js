"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "./Modal";
import { addToCart } from "../app/utils/cart";

export default function ProductCard({ product }) {
  const title = product.name || product.title || "Unnamed Product";
  const price = product.final_price || 0;
  const info = product.description || "No description";
  const image = product.image_url;

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  async function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await addToCart(product.asin, 1);

      if (res.status === 401) {
        setModal({
          open: true,
          title: "Login Required",
          message: "Please login to add products to cart.",
          type: "error",
        });
      } else if (res.ok) {
        setModal({
          open: true,
          title: "Added!",
          message: `${title} added to cart.`,
          type: "success",
        });
      } else {
        setModal({
          open: true,
          title: "Error",
          message: "Couldn't add product.",
          type: "error",
        });
      }

      setTimeout(() => {
        setModal((m) => ({ ...m, open: false }));
      }, 3000);
    } catch {
      setModal({
        open: true,
        title: "Network Error",
        message: "Couldn't connect to server.",
        type: "error",
      });

      setTimeout(() => {
        setModal((m) => ({ ...m, open: false }));
      }, 3000);
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition h-full flex flex-col">

        {/* Only this part navigates */}
        <Link href={`/product/${product.asin}`}>
          <div className="cursor-pointer">

            <div className="h-48 bg-gray-50 rounded-t-2xl flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="h-full object-contain p-4"
                />
              ) : (
                "🛍️"
              )}
            </div>

            <div className="p-4">
              <h2 className="font-bold line-clamp-2">
                {title}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-3 mt-2">
                {info}
              </p>
            </div>
          </div>
        </Link>

        <div className="mt-auto border-t p-4 flex justify-between items-center">
          <span className="font-bold text-xl text-indigo-600">
            ${Number(price).toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() =>
          setModal((m) => ({ ...m, open: false }))
        }
      />
    </>
  );
}