"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col sm:flex-row gap-6">

      {/* Product Image */}
      <div className="w-36 h-36 bg-gray-50 rounded-xl flex items-center justify-center border">
        <img
          src={item.image_url}
          alt={item.title}
          className="max-w-full max-h-full object-contain p-3"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">

        <div>
          <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
            {item.title}
          </h2>

          <p className="text-2xl font-bold text-indigo-600 mt-3">
            ${Number(item.final_price).toFixed(2)}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            In Stock
          </p>
        </div>

        {/* Bottom Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">

          {/* Quantity */}
          <div className="flex items-center border rounded-xl overflow-hidden">

            <button
              onClick={() => onDecrease(item)}
              className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Minus size={18} />
            </button>

            <div className="w-12 text-center font-bold text-lg">
              {item.quantity}
            </div>

            <button
              onClick={() => onIncrease(item)}
              className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Plus size={18} />
            </button>

          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Total
            </p>

            <p className="text-xl font-bold text-gray-900">
              $
              {(
                Number(item.final_price) *
                item.quantity
              ).toFixed(2)}
            </p>
          </div>

          {/* Remove */}
          <button
            onClick={() => onRemove(item)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-medium"
          >
            <Trash2 size={18} />
            Remove
          </button>

        </div>

      </div>

    </div>
  );
}