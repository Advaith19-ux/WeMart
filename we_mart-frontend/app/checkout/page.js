"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CheckoutItem from "../../components/Checkoutcomponents/CheckoutItem";
import CheckoutSummary from "../../components/Checkoutcomponents/CheckoutSummary";

import { getCart } from "../utils/cart";
import { createOrder } from "../utils/orders";

export default function CheckoutPage() {

    const router = useRouter();

    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(true);

    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    async function loadCart() {

        try {

            const res = await getCart();

            const data = await res.json();

            setCart(data.cart || []);

        } finally {

            setLoading(false);

        }

    }

    async function handlePlaceOrder() {

        try {

            setPlacingOrder(true);

            const res = await createOrder("Cash On Delivery");

            const data = await res.json();

            if (!res.ok) {

                throw new Error(data.message);

            }

            router.push(`/orders/${data.order.id}`);

        } catch (err) {

            alert(err.message);

        } finally {

            setPlacingOrder(false);

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

        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-black mb-10">
                Checkout
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-5">

                    {cart.map(item => (

                        <CheckoutItem
                            key={item.id}
                            item={item}
                        />

                    ))}

                </div>

                <CheckoutSummary
                    cart={cart}
                    placingOrder={placingOrder}
                    onPlaceOrder={handlePlaceOrder}
                />

            </div>

        </div>

    );

}