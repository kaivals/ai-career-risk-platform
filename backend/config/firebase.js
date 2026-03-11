import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let auth = null;

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  auth = admin.auth();
  console.log("✅ Firebase Admin initialized");
} catch (error) {
  // Firebase Admin is optional - auth still works via frontend Firebase SDK
  // Backend only needs Admin SDK if you want to verify ID tokens server-side
  console.warn("⚠️  Firebase Admin not initialized (FIREBASE_SERVICE_ACCOUNT_KEY not set).");
  console.warn("    Google Sign-In and Email auth will still work via Firebase client SDK.");
}

export { auth };
export default admin;
