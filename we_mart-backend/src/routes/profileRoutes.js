import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.use(auth);

router.get("/", getProfile);

router.put("/", updateProfile);

router.put("/password", changePassword);

router.delete("/", deleteProfile);

router.put("/password", changePassword);

export default router;