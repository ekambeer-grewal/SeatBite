import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logoSeatBite.jpg';
import bg from "./assets/bg.png";
import { useUserType } from "./UserTypeContext.jsx";

function Onboarding() {
  const navigate = useNavigate();
  const { setUserType } = useUserType();

  const handleOrder = () => {
    setUserType("order");    
    navigate('/splash');
  };

  const handleDeliver = () => {
    setUserType("deliver");     
    navigate('/splash');
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
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "150px",
            height: "150px",
            borderRadius: "200px",
          }}
        />

        {/* Welcome Text */}
        <h1
          style={{
            color: "#EDCA83",
            fontSize: "42px",
            fontWeight: "bold",
            textAlign: "center",
            margin: 0,
          }}
        >
          Welcome
        </h1>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          <button
            onClick={handleOrder}
            style={{
              width: "100%",
              backgroundColor: "#ECB443",
              color: "#000000",
              fontWeight: "bold",
              fontSize: "18px",
              padding: "16px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Order
          </button>

          <button
            onClick={handleDeliver}
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "18px",
              padding: "16px",
              borderRadius: "50px",
              border: "2px solid rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Deliver
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;