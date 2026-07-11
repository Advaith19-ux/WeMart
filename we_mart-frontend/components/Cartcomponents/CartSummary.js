"use client";
import Link from "next/link";

export default function CartSummary({ cart }) {

    const subtotal = cart.reduce(
        (sum, item) => sum + item.final_price * item.quantity,
        0
    );

    const shipping = subtotal > 100 ? 0 : 10;

    const total = subtotal + shipping;

    return (
        <div className="bg-white border rounded-2xl shadow-sm p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
                Order Summary
            </h2>

            <div className="space-y-3">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

            </div>

            <Link
                href="/checkout"
                className="block w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-center transition"
            >
                Proceed to Checkout
            </Link>

        </div>
    );
}