import { useState } from "react";

import fries from "./assets/fries.png";
import burger from "./assets/burger.png";
import pizza from "./assets/pizza.png";
import beer from "./assets/beer.png";
import cottenCandy from "./assets/cottenCandy.png";
import soda from "./assets/soda.png";
import iceCream from "./assets/iceCream.png";
import cookie from "./assets/cookie.png";
import hotdog from "./assets/hotdog.png";
import pretzel from "./assets/pretzel.png";

const imageMap = {
  "Fries": fries,
  "Burger": burger,
  "Pizza slice": pizza,
  "Beer": beer,
  "Cotten Candy": cottenCandy,
  "Soda": soda,
  "Ice Cream": iceCream,
  "Cookie": cookie,
  "Hotdog": hotdog,
  "Pretzel": pretzel,
};

export default function MenuCard({ item }) {
  const [showPopup, setShowPopup] = useState(false);

  const name = item.Name || item.name || "No name";
  const description = item.Description || item.description || "No description";
  const calories = item.Calories || item.calories || "N/A";
  const protein = item.Protein || item.protein || "0";
  const image = imageMap[name];

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setShowPopup(true)}
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          overflow: "hidden",
          cursor: "pointer",
          aspectRatio: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "60px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span>🍽️</span>
        )}
      </div>

      {/* Backdrop */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {/* Popup */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#0f0a2e",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
              width: "100%",
              maxWidth: "480px",
              padding: "24px",
              animation: "slideUp 0.3s ease",
            }}
          >
            {/* Big image */}
            <div
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "20px",
                backgroundColor: "#1a1245",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "80px",
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt={name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span>🍽️</span>
              )}
            </div>

            {/* Name */}
            <h2 style={{ color: "#EDCA83", fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
              {name}
            </h2>

            {/* Description */}
            <p style={{ color: "#aaaaaa", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
              {description}
            </p>

            {/* Calories and Protein */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <span
                style={{
                  backgroundColor: "#1a1245",
                  color: "#EDCA83",
                  fontSize: "13px",
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
              >
                🔥 {calories} cal
              </span>
              <span
                style={{
                  backgroundColor: "#1a1245",
                  color: "#ffffff",
                  fontSize: "13px",
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
              >
                💪 {protein}g protein
              </span>
            </div>

            {/* Add to cart button */}
            <button
              onClick={() => setShowPopup(false)}
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
              }}
            >
              Add to Cart 🛒
            </button>

            {/* Close */}
            <p
              onClick={() => setShowPopup(false)}
              style={{
                color: "#aaaaaa",
                textAlign: "center",
                marginTop: "16px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Close
            </p>

          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}