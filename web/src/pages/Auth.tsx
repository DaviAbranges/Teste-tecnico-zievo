import { useState } from 'react';
import '../App.css';
import logo from '../assets/logo.svg';
import { LoginForm } from '../components/login/LoginForm'; // Verifique se o caminho está correto
import { SignInForm } from '../components/sigin/SignInForm'; // Verifique se o caminho está correto

export const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="login-container">
      <div className="div-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-form">
        {isSignIn ? (
          <SignInForm switchToLogin={() => setIsSignIn(false)} />
        ) : (
          <LoginForm switchToSignIn={() => setIsSignIn(true)} />
        )}
      </div>
    </div>
  );
};
