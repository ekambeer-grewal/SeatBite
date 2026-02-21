import React from 'react';
import './signUp.css';

function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        
        <div className="input-group">
          <input type="email" placeholder="Email" className="signup-input" />
        </div>
        
        <div className="input-group">
          <input type="password" placeholder="Password" className="signup-input" />
        </div>
        
        <div className="input-group">
          <input type="tel" placeholder="Phone Number" className="signup-input" />
        </div>

        <button className="signup-btn" type="button">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
