import express from "express";
import {
  LoginUserController,
  UpdateUserInfo,
  activateUser,
  authorizedRole,
  deleteUser,
  getAllUsers,
  getUserInfo,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updateProfilePicture,
  updateUserPassword,
  updateUserRole,
} from "../controller/userController";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

// Register User
router.post("/register-user", registerUser);
// Activate User
router.post("/activate-user", activateUser);
// Login User
router.post("/login-user", LoginUserController);
// Logout User
router.get("/logoutUser", isAuthenticated, logoutUser);
// Updated Access token
router.get("/refresh", updateAccessToken);
// Get User Info
router.get("/user-info", isAuthenticated, getUserInfo);
// Social Auth
router.post("/social-auth", socialAuth);
// Update User Info
router.put("/update-UserInfo", isAuthenticated, UpdateUserInfo);

// Update Password
router.put("/update-user-password", isAuthenticated, updateUserPassword);

// Add new or Update Avatar
router.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

// Get All Users----------for Admin only
router.get(
  "/get-all-users",
  isAuthenticated,
  authorizedRole("admin"),
  getAllUsers
);

// Update User Role ----------only for admin
router.put(
  "/update-user-role",
  isAuthenticated,
  authorizedRole("admin"),
  updateUserRole
);

// Delete User Route
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizedRole("admin"),
  deleteUser
);

export default router;
