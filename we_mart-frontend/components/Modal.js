"use client";

export default function Modal({
  open,
  title,
  message,
  type = "success",
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-[360px] rounded-2xl bg-white shadow-2xl p-6 animate-[fadeIn_.2s_ease]">

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl
            ${
              type === "success"
                ? "bg-green-100"
                : type === "error"
                ? "bg-red-100"
                : "bg-yellow-100"
            }`}
          >
            {type === "success"
              ? "✅"
              : type === "error"
              ? "❌"
              : "⚠️"}
          </div>

          <h2 className="font-bold text-lg">
            {title}
          </h2>
        </div>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          OK
        </button>

      </div>
    </div>
  );
}