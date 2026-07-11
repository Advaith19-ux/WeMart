import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.use(auth);

router.get("/", getAddresses);

router.post("/", addAddress);

router.put("/:id", updateAddress);

router.delete("/:id", deleteAddress);

router.put("/default/:id", setDefaultAddress);

export default router;