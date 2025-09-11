import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">{/* Vlevo nic podle specifikace */}</div>

        <div className="header-center">
          <Link to="/" className="logo">
            <h1>🍽️ Foodly</h1>
          </Link>
        </div>

        <div className="header-right">
          <Link to="/qr-generator" className="qr-link" title="QR kódy">
            📱
          </Link>
          <Link to="/cart" className="cart-icon">
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
