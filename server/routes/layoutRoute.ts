import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  authorizedRole,
  updateAccessToken,
} from "../controller/userController";
import {
  CreateLayout,
  editLayout,
  getLayoutByType,
} from "../controller/layoutController";

const router = express.Router();

// Create a new Layout

router.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  CreateLayout
);

// Update Layout
router.put(
  "/update-layout",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  editLayout
);

// Get Layout y Type
router.get("/get-layout/:type", getLayoutByType);
export default router;
