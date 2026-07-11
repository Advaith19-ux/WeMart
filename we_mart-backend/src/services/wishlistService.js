import supabase from "../config/supabase.js";

export const getWishlist = async (userId) => {
  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data;
};

export const addToWishlist = async (userId, asin) => {
  const { data, error } = await supabase
    .from("wishlist")
    .insert({
      user_id: userId,
      asin,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const removeWishlistItem = async (id) => {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

export const clearWishlist = async (userId) => {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
};