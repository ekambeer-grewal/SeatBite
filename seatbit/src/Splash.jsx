import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#060219",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top - Rectangle card */}
      <div
        style={{
          backgroundColor: "#EDCA83",
          borderBottomLeftRadius: "200px",
          borderBottomRightRadius: "200px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <p style={{ color: "#000000", fontSize: "16px", fontWeight: "bold" }}>
          Welcome to
        </p>
        <p style={{ color: "#000000", fontSize: "48px", fontWeight: "bold" }}>
          Seat Bite
        </p>
      </div>

      {/* Bottom - Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", marginBottom: "32px" }}>
        <button
          onClick={() => navigate("/signup")}
          style={{
            width: "80%",
            backgroundColor: "#ECB443",
            color: "#000000",
            fontWeight: "bold",
            fontSize: "18px",
            padding: "16px",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{
            width: "80%",
            backgroundColor: "transparent",
            color: "#EDCA83",
            fontWeight: "bold",
            fontSize: "18px",
            padding: "16px",
            borderRadius: "50px",
            border: "2px solid #EDCA83",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </div>

    </div>
  );
}