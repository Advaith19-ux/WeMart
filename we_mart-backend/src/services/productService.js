// import supabase from "../config/supabase.js";

// export const getProducts = async (page = 1, limit = 20) => {
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;

//   const { data, error, count } = await supabase
//     .from("products")
//     .select("*", { count: "exact" })
//     .range(from, to);

//   if (error) {
//     throw new Error(error.message);
//   }

//   return {
//     products: data,
//     page,
//     limit,
//     total: count,
//     hasMore: to + 1 < count,
//   };
// };
import supabase from "../config/supabase.js";

// ======================================================
// GET ALL PRODUCTS
// ======================================================
export const getProducts = async ({
  page = 1,
  limit = 200,
  search = "",
  category,
  minPrice,
  maxPrice,
  sort = "timestamp",
  order = "desc",
}) => {
  console.log("\n==================== GET PRODUCTS ====================");

  console.log("Incoming params:", {
    page,
    limit,
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    order,
  });

  page = Number(page);
  limit = Number(limit);

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  console.log("Pagination:", { from, to });

  let query = supabase
    .from("products")
    .select("*", { count: "exact" });

  if (search) {
    console.log("Applying search:", search);

    query = query.or(
      `title.ilike.%${search}%,brand.ilike.%${search}%,asin.ilike.%${search}%`
    );
  }

  if (category) {
    console.log("Applying category filter:", category);

    query = query.contains("categories", [category]);
  }

  if (minPrice) {
    console.log("Applying min price:", minPrice);

    query = query.gte("final_price", Number(minPrice));
  }

  if (maxPrice) {
    console.log("Applying max price:", maxPrice);

    query = query.lte("final_price", Number(maxPrice));
  }

  console.log("Sorting:", {
    sort,
    ascending: order === "asc",
  });

  query = query.order(sort, {
    ascending: order === "asc",
  });

  query = query.range(from, to);

  const { data, error, count } = await query;

  console.log("Supabase result:");
  console.log("Error:", error);
  console.log("Count:", count);
  console.log("Rows returned:", data?.length);

  if (data && data.length > 0) {
    console.log("First product:", data[0]);
  }

  console.log("=====================================================\n");

  if (error) throw error;

  return {
    success: true,
    page,
    limit,
    totalProducts: count,
    totalPages: Math.ceil(count / limit),
    hasMore: to + 1 < count,
    products: data,
  };
};

// ======================================================
// GET PRODUCT BY ASIN
// ======================================================

export const getProductByAsin = async (asin) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("asin", asin)
    .single();

  if (error) throw error;

  return data;
};

// ======================================================
// GET BRANDS
// ======================================================

export const getBrands = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("brand");

  if (error) throw error;

  return [...new Set(data.map((item) => item.brand).filter(Boolean))].sort();
};

// ======================================================
// GET CATEGORIES
// ======================================================

export const getCategories = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("categories");

  if (error) throw error;

  const categories = new Set();

  data.forEach((item) => {
    if (Array.isArray(item.categories)) {
      item.categories.forEach((category) => {
        categories.add(category);
      });
    }
  });

  return [...categories].sort();
};

// ======================================================
// LATEST PRODUCTS
// ======================================================

export const getLatestProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(20);

  if (error) throw error;

  return data;
};

// ======================================================
// TRENDING PRODUCTS
// ======================================================

export const getTrendingProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("reviews_count", { ascending: false })
    .limit(20);

  if (error) throw error;

  return data;
};

// ======================================================
// TOP RATED PRODUCTS
// ======================================================

export const getTopRatedProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("rating", { ascending: false })
    .limit(20);

  if (error) throw error;

  return data;
};

// ======================================================
// FEATURED PRODUCTS
// ======================================================

export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("discount", { ascending: false })
    .limit(20);

  if (error) throw error;

  return data;
};

// ======================================================
// RELATED PRODUCTS
// ======================================================

export const getRelatedProducts = async (asin) => {
  // Get the current product's categories
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("categories")
    .eq("asin", asin)
    .single();

  if (productError) throw productError;

  if (
    !product.categories ||
    !Array.isArray(product.categories) ||
    product.categories.length === 0
  ) {
    return [];
  }

  // Use the first category as the related category
  const category = product.categories[0];

  // Fetch related products
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("categories", "cs", JSON.stringify([category]))
    .neq("asin", asin)
    .limit(8);

  if (error) throw error;

  return data;
};