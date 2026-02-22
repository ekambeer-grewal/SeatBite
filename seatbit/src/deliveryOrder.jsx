import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./shared/firebase/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import stadium from "./assets/stadium.png";

export default function deliveryOrder() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "carts", orderId);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          setOrder({ id: orderSnap.id, ...orderSnap.data() });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleOrderComplete = async () => {
  setCompleting(true);
  try {
    const orderRef = doc(db, "carts", orderId);
    await deleteDoc(orderRef);
    navigate("/delivery");
  } catch (err) {
    console.error("Error completing order:", err);
  }
    setCompleting(false);
  };
  if (loading) return (
    <div style={{ backgroundColor: "#060219", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#ffffff" }}>Loading order...</p>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#060219",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
        <button
          onClick={() => navigate("/delivery")}
          style={{
            backgroundColor: "#0f0a2e",
            border: "none",
            color: "#EDCA83",
            fontSize: "20px",
            cursor: "pointer",
            padding: "10px 16px",
            borderRadius: "12px",
          }}
        >
          ←
        </button>
        <div>
          <h1 style={{ color: "#EDCA83", fontSize: "32px", fontWeight: "bold", margin: 0 }}>
            Order Details
          </h1>
          <p style={{ color: "#aaaaaa", fontSize: "14px", marginTop: "4px" }}>
            ID: {orderId}
          </p>
        </div>
      </div>

      {/* Customer info */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div>
          <p style={{ color: "#aaaaaa", fontSize: "13px", margin: "0 0 4px 0" }}>Customer</p>
          <p style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", margin: 0 }}>
            {order?.userName || "Unknown"}
          </p>
        </div>
        <div>
          <p style={{ color: "#aaaaaa", fontSize: "13px", margin: "0 0 4px 0" }}>Seat Number</p>
          <p style={{ color: "#EDCA83", fontSize: "18px", fontWeight: "bold", margin: 0 }}>
            {order?.seatNumber || "Not set"}
          </p>
        </div>
      </div>

      {/* Items list */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            padding: "16px 24px",
            borderBottom: "1px solid #1a1245",
          }}
        >
          {["Item", "Qty", "Price"].map((h) => (
            <p key={h} style={{ color: "#aaaaaa", fontSize: "13px", fontWeight: "bold", margin: 0 }}>
              {h}
            </p>
          ))}
        </div>

        {order?.items?.map((item, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              padding: "20px 24px",
              borderBottom: index < order.items.length - 1 ? "1px solid #1a1245" : "none",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#ffffff", fontSize: "16px", fontWeight: "bold", margin: 0 }}>
              {item.name}
            </p>
            <div
              style={{
                backgroundColor: "#1a1245",
                color: "#EDCA83",
                fontWeight: "bold",
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "20px",
                width: "fit-content",
              }}
            >
              x{item.quantity}
            </div>
            <p style={{ color: "#EDCA83", fontSize: "16px", fontWeight: "bold", margin: 0 }}>
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <p style={{ color: "#aaaaaa", fontSize: "18px", margin: 0 }}>Total</p>
        <p style={{ color: "#EDCA83", fontSize: "28px", fontWeight: "bold", margin: 0 }}>
          ${order?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </p>
      </div>

      {/* Stadium map */}
      <div
        onClick={() => navigate("/seatmap")}
        style={{
          margin: "0 auto 40px auto",
          cursor: "pointer",
          border: "20px solid #0f0a2e",
          borderRadius: "20px",
          overflow: "hidden",
          maxHeight: "700px",
          maxWidth: "700px",
        }}
      >
        <img src={stadium} style={{ width: "100%", objectFit: "fill" }} />
      </div>

      {/* Order Complete button */}
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <button
          onClick={handleOrderComplete}
          disabled={completing}
          style={{
            width: "100%",
            backgroundColor: completing ? "#a0a0a0" : "#4CAF50",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "20px",
            padding: "20px",
            borderRadius: "50px",
            border: "none",
            cursor: completing ? "not-allowed" : "pointer",
            marginBottom: "40px",
          }}
        >
          {completing ? "Completing..." : "✓ Order Complete"}
        </button>
      </div>

    </div>
  );
}