import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./shared/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


export default function Confirmation() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setOrder(cartSnap.data());
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  const subtotal = order?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const handleBackToMenu = () => {
    navigate("/home");
  };

  if (loading) return (
    <div style={{ backgroundColor: "#060219", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#ffffff" }}>Loading...</p>
    </div>
  );

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
      {/* Success header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#4CAF50",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            marginBottom: "16px",
          }}
        >
          ✓
        </div>
        <h1 style={{ color: "#EDCA83", fontSize: "28px", fontWeight: "bold", margin: 0 }}>
          Order Confirmed!
        </h1>
        <p style={{ color: "#aaaaaa", fontSize: "15px", marginTop: "8px", textAlign: "center" }}>
          Your food is on its way to your seat 🏟️
        </p>
      </div>

      {/* Customer info */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <div>
          <p style={{ color: "#aaaaaa", fontSize: "12px", margin: "0 0 4px 0" }}>Name</p>
          <p style={{ color: "#ffffff", fontSize: "16px", fontWeight: "bold", margin: 0 }}>
            {order?.userName || "Unknown"}
          </p>
        </div>
        <div>
          <p style={{ color: "#aaaaaa", fontSize: "12px", margin: "0 0 4px 0" }}>Seat</p>
          <p style={{ color: "#EDCA83", fontSize: "16px", fontWeight: "bold", margin: 0 }}>
            {order?.seatNumber || "Not set"}
          </p>
        </div>
      </div>

      {/* Order items */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "16px",
          flex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #1a1245",
          }}
        >
          <p style={{ color: "#EDCA83", fontSize: "16px", fontWeight: "bold", margin: 0 }}>
            Your Order
          </p>
        </div>

        {/* Items */}
        {order?.items?.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
              borderBottom: index < order.items.length - 1 ? "1px solid #1a1245" : "none",
            }}
          >
            <div>
              <p style={{ color: "#ffffff", fontSize: "15px", fontWeight: "bold", margin: 0 }}>
                {item.name}
              </p>
              <p style={{ color: "#aaaaaa", fontSize: "13px", margin: "4px 0 0 0" }}>
                Qty: {item.quantity}
              </p>
            </div>
            <p style={{ color: "#EDCA83", fontSize: "15px", fontWeight: "bold", margin: 0 }}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Price summary */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "#aaaaaa", fontSize: "14px", margin: 0 }}>Subtotal</p>
          <p style={{ color: "#ffffff", fontSize: "14px", margin: 0 }}>${subtotal.toFixed(2)}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "#aaaaaa", fontSize: "14px", margin: 0 }}>Tax (7%)</p>
          <p style={{ color: "#ffffff", fontSize: "14px", margin: 0 }}>${tax.toFixed(2)}</p>
        </div>
        <div style={{ height: "1px", backgroundColor: "#1a1245" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "#EDCA83", fontSize: "18px", fontWeight: "bold", margin: 0 }}>Total</p>
          <p style={{ color: "#EDCA83", fontSize: "18px", fontWeight: "bold", margin: 0 }}>
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Back to menu button */}
      <button
        onClick={handleBackToMenu}
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
        Back to Menu
        </button>

    </div>
  );
}