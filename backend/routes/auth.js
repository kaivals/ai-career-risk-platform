import express from "express";
import { register, login, getDashboard, googleSignIn } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/google-signin", googleSignIn);

// Protected routes
router.get("/dashboard", authenticateToken, getDashboard);

export default router;
