import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail, signInWithGoogle } from "../api/firebaseAuth";
import "../styles/Auth.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await signUpWithEmail(firstName, lastName, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className="tab-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="tab-btn active"
          >
            Sign Up
          </button>
        </div>

        <div className="auth-form">
          <button 
            onClick={handleGoogleSignup} 
            className="google-btn"
            disabled={loading}
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_120x120.png" alt="Google" />
            Sign up with Google
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  First Name
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  Last Name
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email
                <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
                <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a Password"
                required
              />
              <small className="password-hint">Minimum 6 characters</small>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                By signing up, I agree to the <a href="#tos" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="#privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
