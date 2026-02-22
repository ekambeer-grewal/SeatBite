import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./shared/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function homeDelivery() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "carts"));
        const allOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // only show carts that have items
        setOrders(allOrders.filter((order) => order.items && order.items.length > 0));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div>
          <h1 style={{ color: "#EDCA83", fontSize: "36px", fontWeight: "bold", margin: 0 }}>
            🏟️ SeatBite
          </h1>
          <p style={{ color: "#aaaaaa", fontSize: "16px", marginTop: "4px" }}>
            Delivery Dashboard
          </p>
        </div>

        {/* Live indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#0f0a2e",
            padding: "10px 20px",
            borderRadius: "50px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "#4CAF50",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite",
            }}
          />
          <p style={{ color: "#4CAF50", fontSize: "14px", fontWeight: "bold", margin: 0 }}>
            LIVE
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {[
          { label: "Total Orders", value: orders.length, icon: "📋" },
          { label: "Total Items", value: orders.reduce((sum, o) => sum + (o.items?.length || 0), 0), icon: "🍔" },
          { label: "Pending", value: orders.length, icon: "⏳" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#0f0a2e",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span style={{ fontSize: "32px" }}>{stat.icon}</span>
            <div>
              <p style={{ color: "#aaaaaa", fontSize: "13px", margin: 0 }}>{stat.label}</p>
              <p style={{ color: "#EDCA83", fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div
        style={{
          backgroundColor: "#0f0a2e",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            padding: "16px 24px",
            borderBottom: "1px solid #1a1245",
          }}
        >
          {["Customer", "Seat", "Items", "Action"].map((h) => (
            <p key={h} style={{ color: "#aaaaaa", fontSize: "13px", fontWeight: "bold", margin: 0 }}>
              {h}
            </p>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <p style={{ color: "#ffffff", textAlign: "center", padding: "40px" }}>
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
          <p style={{ color: "#aaaaaa", textAlign: "center", padding: "40px" }}>
            No orders yet 🍽️
          </p>
        ) : (
          orders.map((order, index) => (
            <div
              key={order.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                padding: "20px 24px",
                borderBottom: index < orders.length - 1 ? "1px solid #1a1245" : "none",
                alignItems: "center",
              }}
            >
              {/* Customer */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#1a1245",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                  }}
                >
                  👤
                </div>
                <p style={{ color: "#ffffff", fontSize: "15px", margin: 0 }}>
                  {order.userName || "Unknown"}
                </p>
              </div>

              {/* Seat */}
              <p style={{ color: "#ffffff", fontSize: "15px", margin: 0 }}>
                {order.seatNumber || "Not set"}
              </p>

              {/* Items count */}
              <p style={{ color: "#ffffff", fontSize: "15px", margin: 0 }}>
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </p>

              {/* Action button */}
              <button
                onClick={() => navigate(`/delivery/order/${order.id}`)}
                style={{
                  backgroundColor: "#ECB443",
                  color: "#000000",
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  border: "none",
                  cursor: "pointer",
                  width: "fit-content",
                }}
              >
                View Order →
              </button>
            </div>
          ))
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}