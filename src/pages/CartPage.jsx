import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import PaymentModal from "../components/PaymentModal";

const CartPage = () => {
  const { items, totalPrice, totalItems, clearCart, selectedTable } = useCart();
  const navigate = useNavigate();
  const [tipPercent, setTipPercent] = useState(0);
  return (
    <div className="cart-page">
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

        {/* Výběr dýška */}
        <div style={{ margin: "1.2rem 0 1.5rem 0", textAlign: "center" }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Chcete přidat dýško?
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {tipOptions.map((percent) => (
              <button
                key={percent}
                type="button"
                onClick={() => setTipPercent(percent)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: 10,
                  border:
                    percent === tipPercent
                      ? "2px solid #43a047"
                      : "1.5px solid #b3b3b3",
                  background: percent === tipPercent ? "#e8f5e9" : "#fff",
                  color: percent === tipPercent ? "#43a047" : "#222",
                  fontWeight: percent === tipPercent ? 700 : 500,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  outline: "none",
                  minWidth: 48,
                }}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        <div className="cart-actions" style={{ marginTop: 16 }}>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
            style={{ marginBottom: 10 }}
          >
            Pokračovat v nakupování
          </button>
          <button
            className="order-btn"
            style={{
              background: "#43a047",
              fontSize: "1.15rem",
              padding: "1.1rem",
              borderRadius: 14,
              fontWeight: 700,
              marginTop: 10,
              color: "#fff",
            }}
            disabled={items.length === 0 || !selectedTable}
            onClick={() => {
              if (!selectedTable) {
                alert("Prosím vyberte stůl před dokončením objednávky!");
                return;
              }
              setShowPaymentModal(true);
            }}
          >
            Zaplatit
          </button>
        </div>
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          total={(totalPrice * (1 + tipPercent / 100)).toFixed(2)}
          onPaymentConfirm={(paymentMethod, paymentData) => {
            // Generuj náhodné ID objednávky
            const orderId = Math.floor(Math.random() * 10000);
            // Přesměruj na stránku objednávky s informací o platbě
            navigate(`/order/${orderId}`, {
              state: {
                paymentMethod,
                paymentData,
                items: [...items],
                total: (totalPrice * (1 + tipPercent / 100)).toFixed(2),
                selectedTable,
                tipPercent,
              },
            });
            clearCart();
            setShowPaymentModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default CartPage;
