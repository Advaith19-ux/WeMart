"use client";

export default function OrderItem({ item }) {
  return (
    <div className="flex gap-5 p-5 border rounded-2xl">

      <img
        src={item.products.image_url}
        alt={item.products.title}
        className="w-28 h-28 object-contain bg-gray-50 rounded-xl"
      />

      <div className="flex-1">

        <h2 className="font-bold text-lg">
          {item.products.title}
        </h2>

        <p className="text-gray-500 mt-2">
          Quantity : {item.quantity}
        </p>

      </div>

      <div className="text-right">

        <p className="text-indigo-600 text-xl font-bold">
          ${Number(item.price).toFixed(2)}
        </p>

      </div>

    </div>
  );
}