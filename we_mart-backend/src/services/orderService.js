import supabase from "../config/supabase.js";

export const getOrders = async (userId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        *,
        products(*)
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const getOrder = async (userId, orderId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        *,
        products(*)
      )
    `)
    .eq("id", orderId)
    .eq("user_id", userId)
    .single();

  console.log("userId:", userId);
  console.log("orderId:", orderId);
  console.log("data:", data);
  console.log("error:", error);

  if (error) throw error;

  return data;
};

export const createOrder = async (
  userId,
  paymentMethod
) => {

  // Fetch Cart

  const { data: cartItems, error: cartError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId);

  if (cartError) throw cartError;

  if (!cartItems.length) {
    throw new Error("Cart is empty");
  }

  // Fetch Products

  const asins = cartItems.map(item => item.asin);

  const { data: products, error: productError } = await supabase
    .from("products")
    .select("*")
    .in("asin", asins);

  if (productError) throw productError;

  const productMap = {};

  products.forEach(product => {
    productMap[product.asin] = product;
  });

  let totalAmount = 0;
  const orderItems = [];

  for (const cartItem of cartItems) {

    const product = productMap[cartItem.asin];

    if (!product) {
      throw new Error(`Product ${cartItem.asin} not found`);
    }

    const price = Number(product.final_price);

    totalAmount += price * cartItem.quantity;

    orderItems.push({
      asin: cartItem.asin,
      quantity: cartItem.quantity,
      price,
    });
  }

  // Create Order

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      payment_method: paymentMethod,
      payment_status: "Pending",
      order_status: "Placed",
      total_amount: totalAmount,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Insert Order Items

  const items = orderItems.map(item => ({
    ...item,
    order_id: order.id,
  }));

  const { error: itemError } = await supabase
    .from("order_items")
    .insert(items);

  if (itemError) throw itemError;

  // Clear Cart

  const { error: clearError } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId);

  if (clearError) throw clearError;

  return order;
};

export const cancelOrder = async (userId, orderId) => {
  const { data: existingOrder, error: fetchError } =
    await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("user_id", userId)
      .single();

  if (fetchError) throw fetchError;

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  if (existingOrder.order_status === "Delivered") {
    throw new Error("Delivered orders cannot be cancelled");
  }

  if (existingOrder.order_status === "Cancelled") {
    throw new Error("Order is already cancelled");
  }

  const { error } = await supabase
    .from("orders")
    .update({
      order_status: "Cancelled",
    })
    .eq("id", orderId)
    .eq("user_id", userId);

  if (error) throw error;

  // Return the full updated order (including order_items)
  return await getOrder(userId, orderId);
};

export const getOrdersByStatus = async (
  userId,
  status
) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        *,
        products(*)
      )
    `)
    .eq("user_id", userId)
    .eq("order_status", status)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};