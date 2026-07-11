"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProfilePage() {
  const { user } = useCart();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  async function handleResetPassword(e) {
    e.preventDefault();

    if (password.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({
        text: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Couldn't update password.");
      }

      setMessage({
        text: "Password updated successfully.",
        type: "success",
      });

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({
        text: err.message,
        type: "error",
      });
    }
  }

  return (
    <div className="max-w-xl mx-auto py-14 px-6">

      <div className="bg-white rounded-3xl border shadow-sm p-8">

        <h1 className="text-3xl font-black mb-8">
          My Profile
        </h1>

        {message.text && (
          <div
            className={`mb-6 rounded-xl px-4 py-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">

          {/* Email */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>

          <hr />

          <h2 className="text-xl font-bold">
            Reset Password
          </h2>

          <form
            onSubmit={handleResetPassword}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm font-semibold mb-2">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Repeat password"
                className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Update Password
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}