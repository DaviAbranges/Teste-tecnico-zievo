import { useState } from 'react';
import '../App.css';
// import logo from '../assets/logo.svg';
import logo2 from '../assets/1662164284493-removebg-preview.png';
import { LoginForm } from '../components/login/LoginForm'; // Verifique se o caminho está correto
import { SignUpForm } from '../components/signup/SignUpForm'; // Verifique se o caminho está correto

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
