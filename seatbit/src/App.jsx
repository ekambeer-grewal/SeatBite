import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./Splash.jsx";
import Login from "./Login.jsx";
import Onboarding from "./Onboarding.jsx";
import SignUp from "./signUp.jsx";
import Home from "./home.jsx";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}