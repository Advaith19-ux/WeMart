"use client";

import { useState, useMemo } from "react";

export default function ProductGallery({ product }) {
  const images = useMemo(() => {
    if (!product) return [];

    // If images is already an array
    if (Array.isArray(product.images)) {
      return product.images;
    }

    // If images is stored as a JSON string
    if (typeof product.images === "string") {
      try {
        return JSON.parse(product.images);
      } catch {
        return [product.image_url];
      }
    }

    // Fallback
    return product.image_url ? [product.image_url] : [];
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(
    images[0] || product.image_url
  );

  return (
    <div className="flex gap-4">

      {/* Thumbnail Images */}

      <div className="flex flex-col gap-3">

        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer
              ${
                selectedImage === image
                  ? "border-indigo-500"
                  : "border-gray-200"
              }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-contain bg-white"
            />
          </button>
        ))}

      </div>

      {/* Main Image */}

      <div className="flex-1 bg-white border rounded-2xl shadow-sm p-8">

        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-[500px] object-contain"
        />

      </div>

    </div>
  );
}