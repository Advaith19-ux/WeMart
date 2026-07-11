export default function ProductReviews({ product }) {
  const rating = Number(product.rating || 0);
  const reviews = Number(product.reviews_count || 0);

  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <section className="mt-12 bg-white border rounded-2xl shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-8">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Rating Summary */}

        <div className="border rounded-xl p-6">

          <h3 className="text-lg font-semibold mb-4">
            Overall Rating
          </h3>

          <div className="flex items-center gap-1 text-3xl">

            {[...Array(fullStars)].map((_, index) => (
              <span key={`full-${index}`} className="text-yellow-500">
                ★
              </span>
            ))}

            {[...Array(emptyStars)].map((_, index) => (
              <span key={`empty-${index}`} className="text-gray-300">
                ★
              </span>
            ))}

          </div>

          <p className="text-4xl font-bold mt-4">
            {rating.toFixed(1)}
          </p>

          <p className="text-gray-500 mt-2">
            {reviews.toLocaleString()} Reviews
          </p>

        </div>

        {/* Top Review */}

        <div className="md:col-span-2 border rounded-xl p-6">

          <h3 className="text-lg font-semibold mb-4">
            Top Review
          </h3>

          {product.top_review ? (
            <p className="text-gray-700 leading-7">
              "{product.top_review}"
            </p>
          ) : (
            <p className="text-gray-500">
              No reviews available yet.
            </p>
          )}

        </div>

      </div>

    </section>
  );
}