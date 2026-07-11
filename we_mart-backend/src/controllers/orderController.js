import * as orderService from "../services/orderService.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders(req.user.id);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrder(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { paymentMethod } = req.body;

    const order = await orderService.createOrder(
      req.user.id,
      paymentMethod
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await orderService.cancelOrder(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Order cancelled",
      order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getOrdersByStatus = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByStatus(
      req.user.id,
      req.params.status
    );

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};