import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logoSeatBite.jpg'; // Import your JPG here
import './Onboarding.css';

function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      {/* Top Center Image */}
      <div className="logo-container">
        <img src={logo} alt="SeatBite Logo" className="top-logo" />
      </div>

      {/* Welcome Text */}
      <h1 className="welcome-text">Welcome</h1>

      {/* Action Buttons */}
      <div className="button-group">
        <button className="uri-btn order-btn" onClick={() => navigate('/splash')}>
          Order
       