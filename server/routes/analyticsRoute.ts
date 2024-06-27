import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  authorizedRole,
  updateAccessToken,
} from "../controller/userController";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUserAnalytics,
} from "../controller/analyticsController";

const router = express.Router();

// Get User Analytics
router.get(
  "/user-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  getUserAnalytics
);

// Get Courses Analytics
router.get(
  "/courses-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  getCoursesAnalytics
);

// Get Orders Analytics
router.get(
  "/orders-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  getOrdersAnalytics
);

export default router;
