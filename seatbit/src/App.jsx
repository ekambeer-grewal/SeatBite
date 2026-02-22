import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./Splash.jsx";
import Login from "./Login.jsx";
import Onboarding from "./Onboarding.jsx";
import SignUp from "./signUp.jsx";
import Home from "./home.jsx";
import Cart from "./ShoppingCart.jsx";
import DeliveryHome from "./homeDelivery.jsx";
import DeliveryOrder from "./deliveryOrder.jsx";
import { UserTypeProvider } from "./UserTypeContext.jsx";
import SeatMap from "./stadium_program/frontend/src/stadium.jsx";
import Confirmation from "./confirmation.jsx";

export default function App() {
  return (
    <UserTypeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<DeliveryHome />} />
          <Route path="/delivery/order/:orderId" element={<DeliveryOrder />} />
          <Route path="/seatmap" element={<SeatMap />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </UserTypeProvider>
  );
}