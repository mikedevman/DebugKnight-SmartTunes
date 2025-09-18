import express from "express";
import * as UserController from "../controllers/userController";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";

const router = express.Router();

// ------------------ Public Routes ------------------

// Register a new user
router.post("/register", UserController.register);

// Login user
router.post("/login", UserController.login);

// Refresh access token using a refresh token
router.post("/refresh", UserController.refreshToken);


// ------------------ Protected Routes ------------------
// Routes that require a valid access token (authMiddleware)

// Get user profile by ID
router.get("/:userId/profile", authMiddleware, UserController.getProfile);

// Logout user
router.post("/:userId/logout", authMiddleware, UserController.logout);

// Delete user by username
router.delete("/:username", authMiddleware, UserController.deleteUser);

// Update user password
router.patch("/:userId/password", authMiddleware, UserController.updatePassword);

export default router;
