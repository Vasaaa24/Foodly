import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PaymentModal from "./PaymentModal";

const BottomBar = () => {
  const { totalItems, totalPrice, items, clearCart } = useCart();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleOrderClick = () => {
    if (totalItems > 0) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentConfirm = (paymentMethod, paymentData) => {
    // Generuj náhodné ID objednávky
    const orderId = Math.floor(Math.random() * 10000);
    // Přesměruj na stránku objednávky s informací o platbě
    navigate(`/order/${orderId}`, {
      state: {
        paymentMethod,
        paymentData,
        items: [...items],
        total: totalPrice,
      },
    });
    clearCart();
    setShowPaymentModal(false);
  };

  return (
    <>
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
            Zaplatit
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        total={totalPrice.toFixed(2)}
        onPaymentConfirm={handlePaymentConfirm}
      />
    </>
  );
};

export default BottomBar;
