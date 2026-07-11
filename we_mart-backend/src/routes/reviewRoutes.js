import express from "express";
import auth from "../middleware/authMiddleware.js";

import {
  getProductReviews,
  getUserReviews,
  addReview,
  updateReview,
  deleteReview,
  getRatingSummary,
} from "../controllers/reviewController.js";

const router = express.Router();

// Public
router.get("/product/:asin", getProductReviews);
router.get("/summary/:asin", getRatingSummary);

// Protected
router.use(auth);

router.get("/my", getUserReviews);

router.post("/", addReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

export default router;