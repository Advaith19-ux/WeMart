import * as wishlistService from "../services/wishlistService.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user.id);

    res.json({
      success: true,
      wishlist,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { asin } = req.body;

    const item = await wishlistService.addToWishlist(
      req.user.id,
      asin
    );

    res.status(201).json({
      success: true,
      item,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeWishlistItem = async (req, res) => {
  try {
    await wishlistService.removeWishlistItem(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    await wishlistService.clearWishlist(req.user.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};