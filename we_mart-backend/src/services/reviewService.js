import supabase from "../config/supabase.js";

// Get reviews for a product
export const getProductReviews = async (asin) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("asin", asin)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

// Get user's reviews
export const getUserReviews = async (userId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data;
};

// Add review
export const addReview = async (
  userId,
  asin,
  rating,
  comment
) => {
  const { data: existing } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId)
    .eq("asin", asin)
    .maybeSingle();

  if (existing) {
    throw new Error("You have already reviewed this product");
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      user_id: userId,
      asin,
      rating,
      comment,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

// Update review
export const updateReview = async (
  reviewId,
  userId,
  rating,
  comment
) => {
  const { data, error } = await supabase
    .from("reviews")
    .update({
      rating,
      comment,
      updated_at: new Date(),
    })
    .eq("id", reviewId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// Delete review
export const deleteReview = async (
  reviewId,
  userId
) => {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", userId);

  if (error) throw error;
};

// Average Rating
export const getRatingSummary = async (asin) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("asin", asin);

  if (error) throw error;

  if (!data.length) {
    return {
      average: 0,
      count: 0,
    };
  }

  const total = data.reduce(
    (sum, r) => sum + r.rating,
    0
  );

  return {
    average: Number((total / data.length).toFixed(1)),
    count: data.length,
  };
};