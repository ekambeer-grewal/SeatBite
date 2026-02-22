import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "./shared/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import bg from "./assets/bg.png";
import { useUserType } from "./UserTypeContext.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userType } = useUserType();

  const showError = (message) => {
    setError(message);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      showError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (userType === "deliver") {
      navigate("/delivery");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") showError("Email already in use.");
      else if (err.code === "auth/weak-password") showError("Password is too weak.");
      else if (err.code === "auth/invalid-email") showError("Invalid email address.");
      else showError("Registration failed. Try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "20px",
    padding: "20px",
    paddingRight: "60px",
    color: "#ffffff",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  };

  const eyeBtnStyle = {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "22px",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Snackbar */}
      <div
        style={{
          position: "fixed",
          bottom: showSnackbar ? "32px" : "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#ff4444",
          color: "#ffffff",
          padding: "14px 24px",
          borderRadius: "50px",
          fontSize: "14px",
          fontWeight: "bold",
          zIndex: 999,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transition: "bottom 0.4s ease",
        }}
      >
        {error}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        <h1 style={{ color: "#EDCA83", fontSize: "36px", fontWeight: "bold", marginBottom: "24px", paddingBottom: "60px"}}>
          Sign Up
        </h1>

        {/* Email field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...inputStyle, paddingRight: "20px", marginBottom: "16px" }}
        />

        {/* Password field */}
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button onClick={() => setShowPassword(!showPassword)} style={eyeBtnStyle}>
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Confirm Password field */}
        <div style={{ position: "relative", marginBottom: "32px" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
          <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={eyeBtnStyle}>
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Sign Up button */}
        <button
          onClick={handleSignUp}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: loading ? "#dac096ff" : "#ECB443",
            color: "#000000",
            fontWeight: "bold",
            fontSize: "18px",
            padding: "16px",
            borderRadius: "50px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "24px",
          }}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Login link */}
        <p style={{ color: "#ffffff", textAlign: "center", fontSize: "16px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#ECB443", fontWeight: "bold", cursor: "pointer" }}
          >
            Log In
          </span>
        </p>

      </div>
    </div>
  );
}