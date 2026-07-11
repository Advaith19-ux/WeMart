import supabase from "../config/supabase.js";

// Get all categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("categories");

  if (error) throw error;

  const set = new Set();

  data.forEach((item) => {
    if (Array.isArray(item.categories)) {
      item.categories.forEach((c) => set.add(c));
    }
  });

  return [...set].sort();
};

// Products by category
export const getCategoryProducts = async (category) => {
  console.log("Category requested:", category);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("categories", "cs", JSON.stringify([category]));

  console.log("Error:", error);
  console.log("Products found:", data?.length);

  if (error) throw error;

  return data;
};

// All brands
export const getBrands = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("brand");

  if (error) throw error;

  return [...new Set(data.map((p) => p.brand).filter(Boolean))].sort();
};

// Products by brand
export const getBrandProducts = async (brand) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("brand", brand);

  if (error) throw error;

  return data;
};