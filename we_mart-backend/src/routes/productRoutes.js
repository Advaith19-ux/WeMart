// import express from "express";
// import { getProducts } from "../controllers/productController.js";

// const router = express.Router();

// router.get("/", getProducts);

// router.get("/:asin", getProductByAsin);

// export default router;

import express from "express";

import {
  getProducts,
  getProductByAsin,
  getBrands,
  getCategories,
  getLatestProducts,
  getTrendingProducts,
  getTopRatedProducts,
  getFeaturedProducts,
  getRelatedProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/brands", getBrands);

router.get("/categories", getCategories);

router.get("/latest", getLatestProducts);

router.get("/trending", getTrendingProducts);

router.get("/top-rated", getTopRatedProducts);

router.get("/featured", getFeaturedProducts);

router.get("/related/:asin", getRelatedProducts);

router.get("/:asin", getProductByAsin);

export default router;