"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const orderController_1 = require("../controller/orderController");
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
// Create Order
router.post("/create-order", userController_1.updateAccessToken, auth_1.isAuthenticated, orderController_1.createOrder);
// Get ALl Orders --------------For Admin only
router.get("/getAll-orders", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), orderController_1.getAllOrders);
exports.default = router;
