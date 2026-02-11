import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BottomBar = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-bar">
      <div className="bottom-nav">
        <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
          <svg
            className="nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="nav-label">Hlavní</span>
        </Link>

        <Link
          to="/cart"
          className={`nav-item ${isActive("/cart") ? "active" : ""}`}
        >
          <div className="cart-icon-wrapper">
            <svg
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
          <span className="nav-label">Košík</span>
        </Link>

        <Link
          to="/search"
          className={`nav-item ${isActive("/search") ? "active" : ""}`}
        >
          <svg
            className="nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="nav-label">Hledat</span>
        </Link>

        <Link
          to="/about"
          className={`nav-item ${isActive("/about") ? "active" : ""}`}
        >
          <svg
            className="nav-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="nav-label">O nás</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
