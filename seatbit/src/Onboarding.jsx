import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logoSeatBite.jpg'; // Import your JPG here
import './Onboarding.css';

function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      {/* Top Center Image */}
      <div className="logo-container"
        style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '300px',
            height: '300px',
        }}
      >
        
      </div>

      {/* Welcome Text */}
      <h1 className="welcome-text">Welcome</h1>

      {/* Action Buttons */}
      <div className="button-group">
        <button className="uri-btn order-btn" onClick={() => navigate('/splash')}>
          Order
        </button>
        <button className="uri-btn deliver-btn" onClick={() => navigate('/splash')}>
          Deliver
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
