"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getOrder, cancelOrder } from "../../utils/orders";

import OrderItem from "../../../components/Orders/OrderItem";
import OrderStatusBadge from "../../../components/Orders/OrderStatusBadge";

export default function OrderDetailsPage() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrder();
    }, []);

    async function loadOrder() {
        const res = await getOrder(id);

        const data = await res.json();

        console.log("STATUS:", res.status);
        console.log("ORDER RESPONSE:", data);

        if (data.success) {
            setOrder(data.order);
        }

        setLoading(false);
    }

    async function handleCancel() {
        const ok = confirm("Cancel this order?");

        if (!ok) return;

        const res = await cancelOrder(id);

        if (res.ok) {
            await loadOrder();
        }
    }

    if (loading) {

        return (
            <div className="max-w-7xl mx-auto py-10">
                Loading...
            </div>
        );

    }

    return (

        <div className="max-w-6xl mx-auto px-6 py-10">

            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-4xl font-black">

                        Order Details

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Order ID

                        <br />

                        {order.id}

                    </p>

                </div>

                <OrderStatusBadge
                    status={order.order_status}
                />

            </div>

            <div className="bg-white rounded-2xl border p-6 mb-8">

                <h2 className="text-xl font-bold mb-5">

                    Payment Information

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <p className="text-gray-500">

                            Payment Method

                        </p>

                        <p className="font-semibold">

                            {order.payment_method}

                        </p>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            Payment Status

                        </p>

                        <p className="font-semibold">

                            {order.payment_status}

                        </p>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-2xl border p-6">

                <h2 className="text-xl font-bold mb-6">

                    Items

                </h2>

                <div className="space-y-5">

                    {order.order_items.map(item => (

                        <OrderItem
                            key={item.id}
                            item={item}
                        />

                    ))}

                </div>

            </div>

            <div className="mt-8 flex justify-between items-center">

                <div>

                    <p className="text-gray-500">

                        Grand Total

                    </p>

                    <h2 className="text-3xl font-black text-indigo-600">

                        ${Number(order.total_amount).toFixed(2)}

                    </h2>

                </div>

                {order.order_status !== "Cancelled" &&
                    order.order_status !== "Delivered" && (
                        <button
                            onClick={handleCancel}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
                        >
                            Cancel Order
                        </button>
                    )}

            </div>

        </div>

    );

}