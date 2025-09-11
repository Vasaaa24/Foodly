import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PaymentModal from "./PaymentModal";

const BottomBar = () => {
  const { totalItems, totalPrice, items, clearCart, selectedTable } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Zjisti, zda jsme na stránce košíku
  const isCartPage = location.pathname === "/cart";

  const handleActionClick = () => {
    if (totalItems === 0) return;
    
    if (isCartPage) {
      // Na stránce košíku zkontroluj, zda je vybrán stůl, pak otevři platební modal
      if (!selectedTable) {
        alert("Prosím vyberte stůl před dokončením objednávky!");
        return;
      }
      setShowPaymentModal(true);
    } else {
      // Na jiných stránkách přesměruj do košíku
      navigate("/cart");
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
        selectedTable,
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
            onClick={handleActionClick}
            disabled={totalItems === 0 || (isCartPage && !selectedTable)}
          >
            {isCartPage ? "Zaplatit" : "Objednat"}
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
