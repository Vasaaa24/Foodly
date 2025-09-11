import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { totalItems, isQRCustomer } = useCart();
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  // Kontrola, jestli jsme na admin stránce
  const isAdminPage = location.pathname === '/qr-generator';
  
  // Skrýt burger menu pro zákazníky přicházející přes QR kód
  const isQRUser = isQRCustomer();

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
    if (isBurgerOpen) {
      setIsAdminMenuOpen(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Jednoduchý admin login - heslo "admin123"
    if (adminPassword === "admin123") {
      setIsLoggedIn(true);
      setIsAdminMenuOpen(true);
      setAdminPassword("");
    } else {
      alert("Nesprávné heslo!");
      setAdminPassword("");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminMenuOpen(false);
    setIsBurgerOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {!isQRUser && (
            <button 
              className={`burger-menu ${isBurgerOpen ? 'open' : ''}`}
              onClick={toggleBurger}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </div>

        <div className="header-center">
          <Link to="/" className="logo">
            <h1>{(isAdminPage && !isQRUser) ? '⚙️ Administrace' : '🍽️ Foodly'}</h1>
          </Link>
        </div>

        <div className="header-right">
          {!isAdminPage && (
            <Link to="/cart" className="cart-icon">
              🛒
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          )}
        </div>
      </div>

      {/* Burger Menu Overlay - pouze pro ne-QR uživatele */}
      {!isQRUser && (
        <div className={`burger-overlay ${isBurgerOpen ? 'open' : ''}`}>
          <div className="burger-content">
            <div className="burger-header">
              <h3>Menu</h3>
              <button className="close-burger" onClick={toggleBurger}>✕</button>
            </div>

            <div className="burger-body">
              {!isLoggedIn ? (
                <div className="admin-login">
                  <h4>Přihlášení do administrace</h4>
                  <form onSubmit={handleAdminLogin}>
                    <input
                      type="password"
                      placeholder="Zadejte heslo"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="admin-password-input"
                    />
                    <button type="submit" className="admin-login-btn">
                      Přihlásit se
                    </button>
                  </form>
                </div>
              ) : (
                <div className="admin-menu">
                  <h4>✅ Administrace</h4>
                  <div className="admin-options">
                    <Link 
                      to="/qr-generator" 
                      className="admin-option"
                      onClick={() => setIsBurgerOpen(false)}
                    >
                      📱 Generování QR kódů
                    </Link>
                    <button className="admin-logout" onClick={handleLogout}>
                      🚪 Odhlásit se
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
