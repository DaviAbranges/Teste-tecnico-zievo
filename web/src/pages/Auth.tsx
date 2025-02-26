import { useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import { LoginForm } from '../components/login/LoginForm';
import { SignUpForm } from '../components/signup/SignUpForm';

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="login-container">
      <div className="div-logo">
        <img src={logo} alt="Logo" />
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
