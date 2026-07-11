export default function ProductInfo({ product }) {
  return (
    <div className="space-y-6">

      {/* Title */}

      <div>
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {product.title}
        </h1>

        {product.badge && (
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
            {product.badge}
          </span>
        )}
      </div>

      {/* Brand & Seller */}

      <div className="space-y-2 text-sm">

        <p>
          <span className="font-semibold">Brand:</span>{" "}
          {product.brand}
        </p>

        <p>
          <span className="font-semibold">Seller:</span>{" "}
          {product.seller_name}
        </p>

        <p>
          <span className="font-semibold">Availability:</span>{" "}
          <span className="text-green-600 font-medium">
            {product.availability}
          </span>
        </p>

      </div>

      {/* Rating */}

      <div className="flex items-center gap-3">

        <span className="text-yellow-500 text-xl">
          ⭐
        </span>

        <span className="font-semibold">
          {product.rating}
        </span>

        <span className="text-gray-500">
          ({product.reviews_count} Reviews)
        </span>

      </div>

      {/* Description */}

      <div>

        <h2 className="text-lg font-semibold mb-2">
          Description
        </h2>

        <p className="text-gray-700 leading-7">
          {product.description}
        </p>

      </div>

    </div>
  );
}