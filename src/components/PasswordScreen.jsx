import { useState } from "react";
import qrestLogo from "../assets/qrest-logo.png";
import "./PasswordScreen.css";

const PasswordScreen = ({ onPasswordCorrect }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Správné heslo - můžete změnit
  const CORRECT_PASSWORD = "qrest7575";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === CORRECT_PASSWORD) {
      // Uložit autentizaci do localStorage
      localStorage.setItem("isAuthenticated", "true");
      onPasswordCorrect();
    } else {
      setError(true);
      setIsShaking(true);
      setPassword("");

      // Vypnout animaci po chvíli
      setTimeout(() => {
        setIsShaking(false);
      }, 500);

      // Skrýt chybovou hlášku po 3 sekundách
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className="password-screen">
      <div className="password-container">
        <div className="password-content">
          {/* Logo */}
          <div className="password-logo-container">
            <img src={qrestLogo} alt="QRest Logo" className="password-logo" />
          </div>

          {/* Nadpis */}
          <h1 className="password-title">Vítejte v QRest</h1>
          <p className="password-subtitle">
            Pro přístup do aplikace zadejte heslo
          </p>

          {/* Formulář */}
          <form onSubmit={handleSubmit} className="password-form">
            <div
              className={`password-input-wrapper ${isShaking ? "shake" : ""}`}
            >
              <input
                type="password"
                className={`password-input ${error ? "error" : ""}`}
                placeholder="Zadejte heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <svg
                className="password-lock-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            {error && (
              <p className="password-error">
                ❌ Nesprávné heslo. Zkuste to znovu.
              </p>
            )}

            <button type="submit" className="password-submit-btn">
              Vstoupit
            </button>
          </form>

          {/* Nápověda */}
          <div className="password-hint">
            <p className="hint-text">
              💡 Heslo obdržíte od QRest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordScreen;
