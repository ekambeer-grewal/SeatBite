import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./shared/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import bg from "./assets/bg.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const showError = (message) => {
    setError(message);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/user-not-found") showError("No account found with this email.");
      else if (err.code === "auth/wrong-password") showError("Wrong password. Try again.");
      else if (err.code === "auth/invalid-email") showError("Please enter a valid email.");
      else showError("Something went wrong. Try again.");
    }
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


      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Title */}
        <h1 style={{ color: "#EDCA83", fontSize: "36px", fontWeight: "bold", marginBottom: "8px", paddingBottom: "100px" }}>
          Login
        </h1>

        {/* Email field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "20px",
            padding: "20px",
            color: "#ffffff",
            fontSize: "16px",
            marginBottom: "16px",
            outline: "none",
          }}
        />

        {/* Password field with eye icon */}
        <div style={{ position: "relative", marginBottom: "32px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "20px",
              padding: "20px",
              paddingRight: "60px",
              color: "#ffffff",
              fontSize: "16px",
              outline: "none",
            }}
          />
          {/* Eye button */}
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "22px",
            }}
          >
            {showPassword ? faEyeSlash : faEye}
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
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
          Log In
        </button>

        {/* Signup link */}
        <p style={{ color: "#ffffff", textAlign: "center", fontSize: "16px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#ECB443", fontWeight: "bold", cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}