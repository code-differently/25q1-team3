import React from 'react';
import './GoogleLoginButton.css';

interface GoogleLoginButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button 
      className="google-login-button" 
      onClick={onClick}
      disabled={disabled}
    >
      <img
        src="/google-logo.svg"
        alt="Google"
        className="google-logo"
      />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
