export default function ProductFeatures({ product }) {
  let features = [];

  if (product.features) {
    try {
      features = JSON.parse(product.features);
    } catch (err) {
      console.error("Failed to parse features:", err);
    }
  }

  if (features.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 bg-white rounded-2xl border shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-6">
        About this item
      </h2>

      <ul className="space-y-4 list-disc list-inside">

        {features.map((feature, index) => (
          <li
            key={index}
            className="text-gray-700 leading-7"
          >
            {feature}
          </li>
        ))}

      </ul>

    </section>
  );
}