"use client";

export default function CheckoutSummary({

    cart,

    placingOrder,

    onPlaceOrder,

}) {

    const subtotal = cart.reduce(

        (sum, item) =>

            sum +
            Number(item.final_price) *
            item.quantity,

        0

    );

    const shipping = subtotal > 100 ? 0 : 10;

    const tax = subtotal * 0.18;

    const total = subtotal + shipping + tax;

    return (

        <div className="bg-white border rounded-2xl shadow-sm p-6 h-fit sticky top-24">

            <h2 className="text-2xl font-bold mb-6">

                Order Summary

            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span>

                        Subtotal

                    </span>

                    <span>

                        ${subtotal.toFixed(2)}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        Shipping

                    </span>

                    <span>

                        ${shipping.toFixed(2)}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        Tax

                    </span>

                    <span>

                        ${tax.toFixed(2)}

                    </span>

                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">

                    <span>

                        Grand Total

                    </span>

                    <span>

                        ${total.toFixed(2)}

                    </span>

                </div>

            </div>

            <button

                onClick={onPlaceOrder}

                disabled={placingOrder}

                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold disabled:bg-gray-400"

            >

                {placingOrder

                    ? "Placing Order..."

                    : "Place Order"}

            </button>

        </div>

    );

}