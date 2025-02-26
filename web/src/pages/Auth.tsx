import { useState } from 'react';
import '../App.css';
// import logo from '../assets/logo.svg';
import logo2 from '../assets/WhatsApp_Image_2025-02-25_at_17.35.06-removebg-preview.png';
import { LoginForm } from '../components/login/LoginForm';
import { SignUpForm } from '../components/signup/SignUpForm';

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="login-container">
      <div className="div-logo">
        <img src={logo2} alt="Logo" />
      </div>
      <div className="login-form">
        {isSignUp ? (
          <SignUpForm switchToLogin={() => setIsSignUp(false)} />
        ) : (
          <LoginForm switchToSignUp={() => setIsSignUp(true)} />
        )}
      </div>
    </div>
  );
};
