// import supabase from "../config/supabase.js";

// const SIGNUP_DEBOUNCE_MS = 60 * 1000; // 1 minute
// const lastSignupByEmail = new Map();

// export const signup = async (email, password) => {
//   const now = Date.now();
//   const lastAttempt = lastSignupByEmail.get(email);

//   if (lastAttempt && now - lastAttempt < SIGNUP_DEBOUNCE_MS) {
//     throw new Error(
//       "A signup request was already made recently. Please wait a minute before trying again."
//     );
//   }

//   lastSignupByEmail.set(email, now);

//   try {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       if (error.status === 429) {
//         throw new Error(
//           "Too many signup attempts. Please wait a few minutes and try again."
//         );
//       }

//       throw new Error(error.message);
//     }

//     return data;
//   } catch (err) {
//     // Allow retry if signup failed for reasons other than rate limiting
//     if (!err.message.toLowerCase().includes("too many")) {
//       lastSignupByEmail.delete(email);
//     }

//     throw err;
//   }
// };

// export const login = async (email, password) => {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// };

// export const getCurrentUser = async (token) => {
//   const { data, error } = await supabase.auth.getUser(token);

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data.user;
// };

import supabase from "../config/supabase.js";

export const signup = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // Create profile only if user exists
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          email: data.user.email,
          full_name: "",
          phone: "",
          gender: "",
          dob: null,
          avatar_url: "",
        },
      ]);
    // Ignore duplicate profile errors
    if (
      profileError &&
      profileError.code !== "23505" // duplicate key
    ) {
      throw profileError;
    }
  }
  return data;
};

export const login = async (email, password) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

export const getCurrentUser = async (token) => {
  const { data, error } =
    await supabase.auth.getUser(token);

  if (error) throw error;

  return data.user;
};

export const resetPassword = async (userId, password) => {
  const { error } = await supabase.auth.admin.updateUserById(
    userId,
    {
      password,
    }
  );

  if (error) throw error;
};