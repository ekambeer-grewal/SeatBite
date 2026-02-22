import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import bgHome from "./assets/bgHome.png";
import { db } from "./shared/firebase/firebaseConfig";
import MenuCard from "./MenuCard";


export default function Home() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
        try {
            const snapshot = await getDocs(collection(db, "Menu"));
            const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));

            // ADD THIS LINE
            console.log("All items from Firebase:", items);

            setMenuItems(items);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching menu:", err);
            setLoading(false);
        }
        };

        fetchMenu();
    }, []);


    return (
        <div
        style={{
            backgroundImage: `url(${bgHome})`,
            backgroundSize: "contain",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#060219",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: "24px",
        }}
        >
        
        {/* Header row */}
        <div
            style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "20px",
            marginBottom: "24px",
            }}
        >
            {/* Title */}
            <h1 style={{ color: "#000000", fontSize: "32px", fontWeight: "bold" }}>
            Menu
            </h1>

            {/* Cart button */}
            <button
            onClick={() => navigate("/cart")}
            style={{
                backgroundColor: "#EDCA83",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                fontSize: "22px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            🛒
            </button>
        </div>

        <div
        style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginTop: "80px",
        }}
        >
        </div>


        {/* Loading */}
        {loading ? (
            <p style={{ color: "#ffffff", textAlign: "center", marginTop: "40px" }}>
            Loading menu...
            </p>
        ) : (
            /* 2 column grid */
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
            }}
            >
            {menuItems.map((item) => (
                <MenuCard key={item.id} item={item} />
            ))}
            </div>
        )}
        
        </div>
        
     )
}