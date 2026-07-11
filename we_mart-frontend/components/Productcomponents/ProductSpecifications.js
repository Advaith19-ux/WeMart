export default function ProductSpecifications({ product }) {
  const specifications = [
    {
      label: "Brand",
      value: product.brand,
    },
    {
      label: "Manufacturer",
      value: product.manufacturer,
    },
    {
      label: "Model Number",
      value: product.model_number,
    },
    {
      label: "Department",
      value: product.department,
    },
    {
      label: "Item Weight",
      value: product.item_weight,
    },
    {
      label: "Product Dimensions",
      value: product.product_dimensions,
    },
    {
      label: "Country of Origin",
      value: product.country_of_origin,
    },
    {
      label: "Date First Available",
      value: product.date_first_available,
    },
    {
      label: "ASIN",
      value: product.asin,
    },
  ];

  return (
    <section className="mt-12 bg-white border rounded-2xl shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-6">
        Product Specifications
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <tbody>

            {specifications
              .filter((item) => item.value)
              .map((item) => (
                <tr
                  key={item.label}
                  className="border-b last:border-b-0"
                >

                  <td className="w-1/3 bg-gray-50 font-semibold p-4 text-gray-800">
                    {item.label}
                  </td>

                  <td className="p-4 text-gray-700">
                    {item.value}
                  </td>

                </tr>
              ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}