import supabase from "../config/supabase.js";

export default async function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    const { data, error } =
      await supabase.auth.getUser(token);

    if (error) throw error;

    req.user = data.user;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
}