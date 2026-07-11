
"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { addToCart } from "../../app/utils/cart";
import Modal from "../Modal";

export default function PurchaseBox({ product }) {
  const { cart, setCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const finalPrice = Number(product.final_price || 0);
  const initialPrice = Number(product.initial_price || finalPrice);

  const subtotal = finalPrice * quantity;


  const increase = () => {
    setQuantity((prev) => prev + 1);
  };


  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };


  const handleAddToCart = async () => {

    try {

      const response = await addToCart(
        product.asin,
        quantity
      );


      // user not logged in
      if (response.status === 401) {

        setModal({
          open: true,
          title: "Login Required",
          message: "Please login before adding items to cart.",
          type: "warning",
        });

        return;
      }


      if (!response.ok) {
        throw new Error("Failed to add cart item");
      }


      // update frontend cart
      const existing = cart.find(
        (item) => item.asin === product.asin
      );


      if (existing) {

        const updatedCart = cart.map((item) =>
          item.asin === product.asin
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );

        setCart(updatedCart);


      } else {

        setCart([
          ...cart,
          {
            asin: product.asin,
            title: product.title,
            image: product.image_url,
            price: finalPrice,
            quantity,
          },
        ]);

      }


      setModal({
        open: true,
        title: "Added to Cart",
        message: `${product.title} has been added to your cart.`,
        type: "success",
      });


    } catch (error) {

      console.error(error);

      setModal({
        open: true,
        title: "Error",
        message: "Something went wrong while adding to cart.",
        type: "error",
      });

    }
  };


  return (
    <>
      <div className="sticky top-24 bg-white border rounded-2xl shadow-sm p-6 space-y-6">

        {/* Price */}
        <div>

          <p className="text-3xl font-bold text-indigo-600">
            ${finalPrice.toFixed(2)}
          </p>

          {initialPrice > finalPrice && (
            <div className="flex items-center gap-2 mt-2">

              <span className="line-through text-gray-400">
                ${initialPrice.toFixed(2)}
              </span>

              <span className="text-green-600 font-semibold">
                {Math.round(
                  ((initialPrice - finalPrice) / initialPrice) * 100
                )}
                % OFF
              </span>

            </div>
          )}

        </div>


        {/* Quantity */}

        <div>

          <h3 className="font-semibold mb-3">
            Quantity
          </h3>


          <div className="flex items-center gap-4">

            <button
              onClick={decrease}
              className="w-10 h-10 rounded-lg border hover:bg-gray-100"
            >
              -
            </button>


            <span className="text-lg font-bold">
              {quantity}
            </span>


            <button
              onClick={increase}
              className="w-10 h-10 rounded-lg border hover:bg-gray-100"
            >
              +
            </button>

          </div>

        </div>


        {/* Subtotal */}

        <div>

          <h3 className="font-semibold">
            Subtotal
          </h3>

          <p className="text-2xl font-bold">
            ${subtotal.toFixed(2)}
          </p>

        </div>


        {/* Buttons */}

        <button
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Add to Cart
        </button>


        <button
          className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition"
        >
          Buy Now
        </button>


      </div>


      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() =>
          setModal((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />

    </>
  );
}