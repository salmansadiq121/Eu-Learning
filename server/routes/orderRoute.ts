import express from "express";
import { isAuthenticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controller/orderController";
import {
  authorizedRole,
  updateAccessToken,
} from "../controller/userController";

const router = express.Router();

// Create Order
router.post("/create-order", isAuthenticated, createOrder);

// Get ALl Orders --------------For Admin only

router.get(
  "/getAll-orders",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  getAllOrders
);

// Stripe Payment

router.get("/payment/publishableKey", sendStripePublishableKey);

router.post("/payment", updateAccessToken, isAuthenticated, newPayment);

export default router;
