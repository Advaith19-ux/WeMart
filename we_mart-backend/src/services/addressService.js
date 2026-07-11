import supabase from "../config/supabase.js";

export const getAddresses = async (userId) => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const addAddress = async (userId, address) => {
  const { data, error } = await supabase
    .from("addresses")
    .insert({
      user_id: userId,
      ...address,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateAddress = async (id, updates) => {
  const { data, error } = await supabase
    .from("addresses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteAddress = async (id) => {
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

export const setDefaultAddress = async (userId, id) => {
  await supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", userId);

  const { data, error } = await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};