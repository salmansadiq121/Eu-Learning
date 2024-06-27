import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controller/orderController";
import {
  authorizedRole,
  updateAccessToken,
} from "../controller/userController";

const router = express.Router();

// Create Order
router.post("/create-order", updateAccessToken, isAuthenticated, createOrder);

// Get ALl Orders --------------For Admin only

router.get(
  "/getAll-orders",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  getAllOrders
);

export default router;
