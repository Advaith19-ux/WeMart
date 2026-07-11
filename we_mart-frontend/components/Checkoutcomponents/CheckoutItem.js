"use client";

export default function CheckoutItem({ item }) {

    return (

        <div className="bg-white border rounded-2xl shadow-sm p-5 flex gap-5">

            <img
                src={item.image_url}
                alt={item.title}
                className="w-28 h-28 object-contain bg-gray-50 rounded-xl"
            />

            <div className="flex-1">

                <h2 className="font-bold text-lg">
                    {item.title}
                </h2>

                <p className="text-indigo-600 text-xl font-bold mt-3">
                    ${Number(item.final_price).toFixed(2)}
                </p>

                <p className="mt-2 text-gray-500">
                    Quantity : {item.quantity}
                </p>

            </div>

            <div className="text-right">

                <p className="text-sm text-gray-500">
                    Total
                </p>

                <p className="text-2xl font-bold">

                    $
                    {(
                        Number(item.final_price) *
                        item.quantity
                    ).toFixed(2)}

                </p>

            </div>

        </div>

    );

}