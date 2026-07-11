import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.use(auth);

router.get("/", getCart);

router.post("/", addToCart);

router.patch("/:id", updateQuantity);

router.delete("/:id", removeItem);

router.delete("/clear", clearCart);

export default router;