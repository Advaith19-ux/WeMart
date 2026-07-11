export const getProfile = async (userId) => {
  let { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code === "PGRST116") {
    const { data: userData } = await supabase.auth.admin.getUserById(userId);

    const email = userData?.user?.email || "";

    const { data: createdProfile, error: insertError } =
      await supabase
        .from("profiles")
        .insert({
          id: userId,
          email,
        })
        .select()
        .single();

    if (insertError) throw insertError;

    return createdProfile;
  }

  if (error) throw error;

  return data;
};