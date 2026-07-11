"use client";

import { useEffect, useState } from "react";
import CartItem from "../../components/Cartcomponents/CartItem";
import CartSummary from "../../components/Cartcomponents/CartSummary";
import {
    getCart,
    updateCart,
    removeFromCart,
} from "../utils/cart";

export default function CartPage() {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

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

    async function increase(item) {
        console.log("Item:", item);

        const res = await updateCart(item.id, item.quantity + 1);

        console.log("Status:", res.status);

        const data = await res.json();

        console.log("Response:", data);

        await loadCart();
    }

    async function decrease(item) {
        console.log("Decreased clicked", item);
        if (item.quantity === 1) return;

        await updateCart(item.id, item.quantity - 1);
        loadCart();
    }

    async function remove(item) {
        await removeFromCart(item.id);
        loadCart();
    }

    if (loading) {
        return (
            <div className="p-10">
                Loading Cart...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-black mb-10">
                Shopping Cart
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-5">

                    {cart.length === 0 ? (
                        <div className="bg-white rounded-2xl border p-10 text-center text-gray-500">
                            Your cart is empty.
                        </div>
                    ) : (
                        cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onIncrease={increase}
                                onDecrease={decrease}
                                onRemove={remove}
                            />
                        ))
                    )}

                </div>

                <CartSummary cart={cart} />

            </div>

        </div>
    );
}