import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
  getOrders,
  getOrder,
  createOrder,
  cancelOrder,
  getOrdersByStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.use(auth);

// All Orders
router.get("/", getOrders);

router.get("/status/:status", getOrdersByStatus);

router.get("/:id", getOrder);

router.post("/", createOrder);

router.patch("/cancel/:id", cancelOrder);

export default router;