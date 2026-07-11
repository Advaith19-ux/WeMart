import express from "express";
import {
  getCategories,
  getCategoryProducts,
  getBrands,
  getBrandProducts,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);

router.get("/brands", getBrands);

router.get("/:category", getCategoryProducts);

router.get("/brands/:brand", getBrandProducts);

export default router;