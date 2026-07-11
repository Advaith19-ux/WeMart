import supabase from "../config/supabase.js";

export const getCart = async (userId) => {
  // Fetch cart items
  const { data: cart, error: cartError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId);

  if (cartError) throw cartError;

  if (!cart || cart.length === 0) {
    return [];
  }

  // Extract ASINs
  const asins = cart.map((item) => item.asin);

  // Fetch matching products
  const { data: products, error: productError } = await supabase
    .from("products")
    .select(`
      asin,
      title,
      image_url,
      final_price,
      initial_price
    `)
    .in("asin", asins);

  if (productError) throw productError;

  // Merge cart data with product data
  const mergedCart = cart.map((cartItem) => {
    const product = products.find(
      (p) => p.asin === cartItem.asin
    );

    return {
      id: cartItem.id,
      user_id: cartItem.user_id,
      quantity: cartItem.quantity,
      created_at: cartItem.created_at,

      ...(product || {
        asin: cartItem.asin,
        title: "Product unavailable",
        image_url: null,
        final_price: 0,
        initial_price: 0,
      }),
    };
  });

  return mergedCart;
};

export const addToCart = async (userId, asin, quantity) => {
  // Check if this product is already in the user's cart
  const { data: existing, error: existingError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId)
    .eq("asin", asin)
    .maybeSingle();

  if (existingError) throw existingError;

  // If it exists, update the quantity
  if (existing) {
    const { data, error } = await supabase
      .from("cart")
      .update({
        quantity: existing.quantity + quantity,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  // Otherwise insert a new cart item
  const { data, error } = await supabase
    .from("cart")
    .insert({
      user_id: userId,
      asin,
      quantity,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateQuantity = async (id, quantity) => {
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const removeItem = async (id) => {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

export const clearCart = async (userId) => {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
};