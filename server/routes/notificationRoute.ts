import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  getNotification,
  updateNotificationStatus,
} from "../controller/notificationController";
import {
  authorizedRole,
  updateAccessToken,
} from "../controller/userController";

const router = express.Router();

// Get Notification

router.get(
  "/get-notification",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  getNotification
);

// Update Notification Status
router.put(
  "/update-notification/:id",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  updateNotificationStatus
);

export default router;
