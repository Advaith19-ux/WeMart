import * as profileService from "../services/profileService.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.user.id);

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await profileService.updateProfile(
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;

    await profileService.changePassword(password);

    res.json({
      success: true,
      message: "Password Updated",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await profileService.deleteProfile(req.user.id);

    res.json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};