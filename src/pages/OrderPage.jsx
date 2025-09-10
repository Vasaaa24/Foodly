import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

const OrderPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, clearCart } = useCart();

  // Získání dat z navigace (payment method, items, total)
  const orderData = location.state || {};
  const { paymentMethod, items = [], total = totalPrice } = orderData;

  // Získání ID stolku z URL parametru ?table=12
  const urlParams = new URLSearchParams(location.search);
  const tableId = urlParams.get("table") || "1";

  // Mapování platebních metod pro zobrazení
  const paymentMethodNames = {
    cash: "Hotovost",
    card: "Platební karta",
    "apple-pay": "Apple Pay",
    "google-pay": "Google Pay",
    "bank-transfer": "Bankovní převod",
  };

  useEffect(() => {
    // Po potvrzení objednávky vyprázdni košík (pokud ještě není prázdný)
    if (items.length === 0) {
      clearCart();
    }
  }, [clearCart, items.length]);

  const handleBackToMenu = () => {
    navigate("/");
  };

  return (
    <div className="order-page">
      <div className="order-confirmation">
        <div className="success-icon">✅</div>
        <h1>Objednávka potvrzena!</h1>

        <div className="order-details">
          <div className="order-info-card">
            <h3>Detaily objednávky</h3>

            <div className="order-detail-row">
              <span className="label">ID objednávky:</span>
              <span className="value">#{id}</span>
            </div>

            <div className="order-detail-row">
              <span className="label">Stůl č.:</span>
              <span className="value">{tableId}</span>
            </div>

            <div className="order-detail-row">
              <span className="label">Stav objednávky:</span>
              <span className="value status-new">Nová</span>
            </div>

            {paymentMethod && (
              <div className="order-detail-row">
                <span className="label">Způsob platby:</span>
                <span className="value">
                  {paymentMethodNames[paymentMethod] || paymentMethod}
                </span>
              </div>
            )}

            <div className="order-detail-row total">
              <span className="label">Celková cena:</span>
              <span className="value">
                {(total || totalPrice).toFixed(2)} Kč
              </span>
            </div>
          </div>

          <div className="order-status-info">
            <h4>Co bude dál?</h4>
            <ul>
              <li>✓ Vaše objednávka byla přijata</li>
              <li>🔄 Kuchyň začne s přípravou</li>
              <li>🚚 Jídlo bude doručeno na váš stůl</li>
            </ul>
          </div>
        </div>

        <div className="order-actions">
          <button className="back-to-menu-btn" onClick={handleBackToMenu}>
            Zpět do menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
