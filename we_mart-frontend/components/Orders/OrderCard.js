"use client";

import Link from "next/link";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order }) {

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="font-bold text-lg">
            Order #{order.id.slice(0, 8)}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.created_at).toLocaleString()}
          </p>

        </div>

        <OrderStatusBadge
          status={order.order_status}
        />

      </div>

      <div className="mt-6 flex justify-between items-end">

        <div>

          <p className="text-gray-500">
            Payment
          </p>

          <p className="font-semibold">
            {order.payment_method}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Total
          </p>

          <h2 className="text-2xl font-black text-indigo-600">
            ${Number(order.total_amount).toFixed(2)}
          </h2>

        </div>

      </div>

      <Link
        href={`/orders/${order.id}`}
        className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
      >
        View Details
      </Link>

    </div>
  );
}