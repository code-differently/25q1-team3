import React, { useState } from "react";
import "./EmailPasswordLogin.css";

interface EmailPasswordLoginProps {
  onLogin: (email: string, password: string) => void;
  disabled?: boolean;
}

const EmailPasswordLogin: React.FC<EmailPasswordLoginProps> = ({ onLogin, disabled = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    onLogin(email, password);
  };

  return (
    <form className="email-login-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={disabled}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          disabled={disabled}
        />
      </div>

      <button type="submit" className="login-button" disabled={disabled}>
        {disabled ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default EmailPasswordLogin;
