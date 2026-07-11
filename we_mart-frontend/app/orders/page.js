"use client";

import { useEffect, useState } from "react";
import { getOrders } from "../utils/orders";
import OrderCard from "../../components/Orders/OrderCard";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const res = await getOrders();
    const data = await res.json();

    setOrders(data.orders || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-black mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border p-10 text-center text-gray-500">
          No orders found.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      )}

    </div>
  );
}