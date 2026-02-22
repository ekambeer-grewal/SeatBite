import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logoSeatBite.jpg';
import bg from "./assets/bg.png";
import { useUserType } from "./UserTypeContext.jsx";

function Onboarding() {
  const navigate = useNavigate();
  const { setUserType } = useUserType();

  const handleOrder = () => {
    setUserType("order");    
    navigate('/splash');
  };

  const handleDeliver = () => {
    setUserType("deliver");     
    navigate('/splash');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: 