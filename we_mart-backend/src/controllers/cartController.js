import * as cartService from "../services/cartService.js";

export const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);

    res.json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { asin, quantity } = req.body;

    const item = await cartService.addToCart(
      req.user.id,
      asin,
      quantity
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

export const updateQuantity = async (req, res) => {
  try {
    const item = await cartService.updateQuantity(
      req.params.id,
      req.body.quantity
    );

    res.json({
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

export const removeItem = async (req, res) => {
  try {
    await cartService.removeItem(req.params.id);

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

export const clearCart = async (req, res) => {
  try {
    await cartService.clearCart(req.user.id);

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