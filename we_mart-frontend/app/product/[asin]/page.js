import ProductGallery from "@/components/Productcomponents/ProductGallery";
import ProductInfo from "@/components/Productcomponents/ProductInfo";
import PurchaseBox from "@/components/Productcomponents/PurchaseBox";
import ProductFeatures from "@/components/Productcomponents/ProductFeatures";
import ProductSpecifications from "@/components/Productcomponents/ProductSpecifications";
import ProductReviews from "@/components/Productcomponents/ProductReviews";
import RelatedProducts from "@/components/Productcomponents/RelatedProducts";

async function getProduct(asin) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";

  const res = await fetch(`${baseUrl}/api/products/${asin}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  return data.product;
}

export default async function ProductPage({ params }) {
  const { asin } = await params;

  const product = await getProduct(asin);

  return (
    <main className="bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          Home / {product.categories?.join(" / ")}
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-4">
            <ProductGallery product={product} />
          </div>

          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>

          <div className="lg:col-span-3">
            <PurchaseBox product={product} />
          </div>

        </div>

        <ProductFeatures product={product} />

        <ProductSpecifications product={product} />

        <ProductReviews product={product} />

        <RelatedProducts asin={product.asin} />

      </div>

    </main>
  );
}