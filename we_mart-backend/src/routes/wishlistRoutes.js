import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
  getWishlist,
  addToWishlist,
  removeWishlistItem,
  clearWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.use(auth);

router.get("/", getWishlist);

router.post("/", addToWishlist);

router.delete("/clear", clearWishlist);

router.delete("/:id", removeWishlistItem);

export default router;