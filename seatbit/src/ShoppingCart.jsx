import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./shared/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import fries from "./assets/images-3.png";
import burger from "./assets/burger.png";
import pizza from "./assets/pizza.png";
import beer from "./assets/Beer.png";
import cottenCandy from "./assets/unnamed-2.png";
import soda from "./assets/8_bit_soda.png";
import iceCream from "./assets/ice_cream.png";
import cookie from "./assets/cookie.png";
import hotdog from "./assets/hotdog.png";
import pretzel from "./assets/pretzel_0.png";

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

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (!cartSnap.exists()) { setLoading(false); return; }
        const cartData = cartSnap.data();
        setCartItems(cartData.items || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (index) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const updatedItems = cartItems.filter((_, i) => i !== index);
      const cartRef = doc(db, "carts", user.uid);
      await updateDoc(cartRef, { items: updatedItems });
      setCartItems(updatedItems);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div
      style={{
        backgroundColor: "#060219",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingTop: "20px",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#EDCA83",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <h1 style={{ color: "#EDCA83", fontSize: "28px", fontWeight: "bold" }}>
          Your Cart
        </h1>
      </div>

      {/* Subtotal at top */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#aaaaaa", fontSize: "16px" }}>Subtotal</p>
        <p style={{ color: "#EDCA83", fontSize: "20px", fontWeight: "bold" }}>
          ${subtotal.toFixed(2)}
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p style={{ color: "#ffffff", textAlign: "center", marginTop: "40px" }}>
          Loading cart...
        </p>
      ) : cartItems.length === 0 ? (
        <p style={{ color: "#aaaaaa", textAlign: "center", marginTop: "40px" }}>
          Your cart is empty 🍽️
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#0f0a2e",
                borderRadius: "16px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* Item image */}
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#1a1245",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                {imageMap[item.name] ? (
                  <img
                    src={imageMap[item.name]}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
                  />
                ) : (
                  <span>🍽️</span>
                )}
              </div>

              {/* Item info */}
              <div style={{ flex: 1 }}>
                <p style={{ color: "#ffffff", fontSize: "16px", fontWeight: "bold" }}>
                  {item.name}
                </p>
                <p style={{ color: "#aaaaaa", fontSize: "13px" }}>
                  Qty: {item.quantity}
                </p>
              </div>

              {/* Price */}
              <p style={{ color: "#EDCA83", fontSize: "16px", fontWeight: "bold" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Remove button */}
              <button
                onClick={() => handleRemove(index)}
                style={{
                  backgroundColor: "#EDCA83",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: "#ffffff",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontWeight: "bold",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bottom summary */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          padding: "20px",
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "#aaaaaa", fontSize: "15px" }}>Subtotal</p>
          <p style={{ color: "#ffffff", fontSize: "15px" }}>${subtotal.toFixed(2)}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "#aaaaaa", fontSize: "15px" }}>Tax (7%)</p>
          <p style={{ color: "#ffffff", fontSize: "15px" }}>${tax.toFixed(2)}</p>
        </div>

        <div style={{ height: "1px", backgroundColor: "#1a1245", margin: "4px 0" }} />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "#EDCA83", fontSize: "18px", fontWeight: "bold" }}>Total</p>
          <p style={{ color: "#EDCA83", fontSize: "18px", fontWeight: "bold" }}>
            ${total.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => navigate("/configuration")}
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
            marginTop: "8px",
          }}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}