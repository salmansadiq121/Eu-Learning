"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Register User
router.post("/register-user", userController_1.registerUser);
// Activate User
router.post("/activate-user", userController_1.activateUser);
// Login User
router.post("/login-user", userController_1.LoginUserController);
// Logout User
router.get("/logoutUser", userController_1.updateAccessToken, auth_1.isAuthenticated, userController_1.logoutUser);
// Updated Access token
router.get("/refresh", userController_1.updateAccessToken);
// Get User Info
router.get("/user-info", userController_1.updateAccessToken, auth_1.isAuthenticated, userController_1.getUserInfo);
// Social Auth
router.post("/social-auth", userController_1.socialAuth);
// Update User Info
router.put("/update-UserInfo", userController_1.updateAccessToken, auth_1.isAuthenticated, userController_1.UpdateUserInfo);
// Update Password
router.put("/update-user-password", userController_1.updateAccessToken, auth_1.isAuthenticated, userController_1.updateUserPassword);
// Add new or Update Avatar
router.put("/update-user-avatar", userController_1.updateAccessToken, auth_1.isAuthenticated, userController_1.updateProfilePicture);
// Get All Users----------for Admin only
router.get("/get-all-users", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), userController_1.getAllUsers);
// Update User Role ----------only for admin
router.put("/update-user-role", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), userController_1.updateUserRole);
// Delete User Route
router.delete("/delete-user/:id", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), userController_1.deleteUser);
exports.default = router;
