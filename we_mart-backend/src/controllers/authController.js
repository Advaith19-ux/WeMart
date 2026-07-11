// import * as authService from "../services/authService.js";

// export const signup = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required.",
//       });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters long.",
//       });
//     }

//     const data = await authService.signup(email, password);

//     return res.status(201).json({
//       success: true,
//       message: "Signup successful.",
//       data,
//     });
//   } catch (err) {
//     console.error("Signup Error:", err);

//     let status = 400;

//     if (
//       err.message.includes("Too many") ||
//       err.message.includes("rate limit")
//     ) {
//       status = 429;
//     }

//     return res.status(status).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required.",
//       });
//     }

//     const data = await authService.login(email, password);

//     return res.status(200).json({
//       success: true,
//       message: "Login successful.",
//       data,
//     });
//   } catch (err) {
//     console.error("Login Error:", err);

//     return res.status(401).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export const getCurrentUser = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization token missing.",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const user = await authService.getCurrentUser(token);

//     return res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (err) {
//     console.error("Get User Error:", err);

//     return res.status(401).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


import * as authService from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await authService.signup(email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    await authService.logout();

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const user =
      await authService.getCurrentUser(token);

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    await authService.resetPassword(req.user.id, password);

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};