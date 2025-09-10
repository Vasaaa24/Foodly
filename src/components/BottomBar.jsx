import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BottomBar = () => {
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleOrderClick = () => {
    if (totalItems > 0) {
      navigate("/cart");
    }
  };

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-content">
        <Link to="/cart" className="bottom-cart-link">
          Košík ({totalItems})
        </Link>

        <div className="bottom-total">{totalPrice.toFixed(2)} Kč</div>

        <button
          className="bottom-order-btn"
          onClick={handleOrderClick}
          disabled={totalItems === 0}
        >
          Objednat
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
