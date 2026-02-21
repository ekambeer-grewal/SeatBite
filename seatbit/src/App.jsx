import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./Splash.jsx";
import Login from "./Login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}