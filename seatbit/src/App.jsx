import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./Splash.jsx";
import Login from "./Login.jsx";
import Onboarding from "./Onboarding.jsx";
import SignUp from "./signUp.jsx";
import Home from "./home.jsx";
import Cart from "./ShoppingCart.jsx";
import { UserTypeProvider } from "./UserTypeContext.jsx";


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
      </Routes>
    </BrowserRouter>
    </UserTypeProvider>
  );
}