import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseConfig";
import apiClient from "./apiClient";

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();

    // Send token to backend for verification and user creation
    const response = await apiClient.post("/auth/google-signin", {
      uid: user.uid,
      email: user.email,
      name: user.displayName || "User",
      photoURL: user.photoURL,
      token,
    });

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// Email/Password Sign Up
export const signUpWithEmail = async (firstName, lastName, email, password) => {
  try {
    // Create user in Firebase
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const token = await user.getIdToken();

    // Send user data to backend
    const response = await apiClient.post("/auth/register", {
      uid: user.uid,
      email: user.email,
      name: `${firstName} ${lastName}`,
      token,
    });

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const token = await user.getIdToken();

    // Verify with backend
    const response = await apiClient.post("/auth/login", {
      uid: user.uid,
      email: user.email,
      token,
    });

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};
