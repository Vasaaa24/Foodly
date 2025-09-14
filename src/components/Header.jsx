import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import qrestLogo from "../assets/qrest-logo.png";
import kosPng from "../assets/kos.png";

const Header = () => {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [keySequence, setKeySequence] = useState([]);

  // Kontrola, jestli jsme na admin stránce
  const isAdminPage =
    location.pathname === "/qr-generator" ||
    location.pathname === "/admin-panel-2024";

  // Skrytý přístup k administraci pomocí klávesové zkratky "admin"
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      setKeySequence((prev) => {
        const newSequence = [...prev, key].slice(-5); // Keep only last 5 keys

        // Pokud uživatel napíše "admin", přesměruj na administraci
        if (newSequence.join("") === "admin") {
          navigate("/qr-generator");
          return [];
        }

        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  return (
    <header className="header">
      <div className="header-content">
        <div
          className="header-left"
          style={{ minWidth: 48, display: "flex", alignItems: "center" }}
        >
          {/* Burger menu odstraněno - administrace je skrytá */}
        </div>

        <div
          className="header-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link
            to="/"
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={qrestLogo}
              alt="QRest logo"
              style={{
                height: 60,
                width: 120,
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
              }}
            />
          </Link>
        </div>

        <div className="header-right">
          {!isAdminPage && (
            <Link
              to="/cart"
              className="cart-icon"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <img
                src={kosPng}
                alt="Košík"
                style={{
                  width: 35,
                  height: 35,
                  objectFit: "contain",
                  display: "block",
                  marginRight: 15,
                  marginTop: 9,
                }}
              />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
