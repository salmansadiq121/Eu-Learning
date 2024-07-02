"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controller/userController");
const layoutController_1 = require("../controller/layoutController");
const router = express_1.default.Router();
// Create a new Layout
router.post("/create-layout", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), layoutController_1.CreateLayout);
// Update Layout
router.put("/update-layout", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), layoutController_1.editLayout);
// Get Layout y Type
router.get("/get-layout/:type", layoutController_1.getLayoutByType);
exports.default = router;
