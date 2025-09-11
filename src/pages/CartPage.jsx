import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import PaymentModal from "../components/PaymentModal";

const CartPage = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleOrder = () => {
    if (items.length > 0) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentConfirm = (paymentMethod) => {
    // Generuj náhodné ID objednávky
    const orderId = Math.floor(Math.random() * 10000);
    // Přesměruj na stránku objednávky s informací o platbě
    navigate(`/order/${orderId}`, {
      state: {
        paymentMethod,
        items: [...items],
        total: totalPrice,
      },
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h2>Váš košík</h2>
        </div>
        <div className="empty-cart">
          <p>Váš košík je prázdný</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Pokračovat v nakupování
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Váš košík ({totalItems} položek)</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Vyprázdnit košík
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-section">
          <div className="total-line">
            <span>Celkem ({totalItems} položek):</span>
            <span className="total-price">{totalPrice.toFixed(2)} Kč</span>
          </div>
        </div>

        <div className="cart-actions">
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Pokračovat v nakupování
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        total={totalPrice.toFixed(2)}
        onPaymentConfirm={handlePaymentConfirm}
      />
    </div>
  );
};

export default CartPage;
