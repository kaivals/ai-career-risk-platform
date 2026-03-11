import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById, getUserByUid, updateUser } from "../models/User.js";
import { auth } from "../config/firebase.js";

const SALT_ROUNDS = 10;
const JWT_EXPIRY = "24h"; // 1 day

// Firebase Google Sign-In
export const googleSignIn = async (req, res) => {
  try {
    const { uid, email, name, photoURL } = req.body;

    // Validation
    if (!uid || !email) {
      return res.status(400).json({ error: "Firebase UID and email are required" });
    }

    // Check if user exists by Firebase UID
    let user = await getUserByUid(uid);

    if (!user) {
      // Create new user if doesn't exist
      user = await createUser(name || email.split("@")[0], email, null, uid);
    } else {
      // Update user info if they exist
      user = await updateUser(user.id, { name, photoURL });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    return res.status(200).json({
      message: "Google sign-in successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
    });
  } catch (error) {
    console.error("Google sign-in error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Register user with Firebase
export const register = async (req, res) => {
  try {
    const { uid, name, email } = req.body;

    // Validation
    if (!uid || !email) {
      return res.status(400).json({ error: "Firebase UID and email are required" });
    }

    // Check if user already exists
    let existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user with Firebase UID
    const newUser = await createUser(name || "User", email, null, uid);

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Login user with Firebase
export const login = async (req, res) => {
  try {
    const { uid, email } = req.body;

    // Validation
    if (!uid || !email) {
      return res
        .status(400)
        .json({ error: "Firebase UID and email are required" });
    }

    // Get user by Firebase UID or email
    let user = await getUserByUid(uid);
    
    if (!user) {
      user = await getUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ error: "User not found. Please register first." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Get current dashboard user
export const getDashboard = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Dashboard data retrieved",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ error: error.message });
  }
};
