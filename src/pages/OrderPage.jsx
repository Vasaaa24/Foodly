import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

const OrderPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, clearCart } = useCart();

  // Získání dat z navigace (payment method, items, total, selectedTable, paymentData)
  const orderData = location.state || {};
  const {
    paymentMethod,
    items = [],
    total = totalPrice,
    selectedTable,
    paymentData = {},
  } = orderData;

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
              <span className="value">{selectedTable || "Nevybráno"}</span>
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

            {paymentMethod === "cash" && paymentData.customerName && (
              <div className="order-detail-row">
                <span className="label">Jméno zákazníka:</span>
                <span className="value">{paymentData.customerName}</span>
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
            {paymentMethod === "cash" ? (
              <ul>
                <li>✓ Vaše objednávka byla přijata</li>
                <li>👨‍💼 Obsluha k vám přijde pro potvrzení</li>
                <li>🔄 Kuchyň začne s přípravou po potvrzení</li>
                <li>🚚 Jídlo bude doručeno na váš stůl</li>
                <li>💵 Zaplatíte při převzetí</li>
              </ul>
            ) : (
              <ul>
                <li>✓ Vaše objednávka byla přijata</li>
                <li>✓ Platba byla zpracována</li>
                <li>🔄 Kuchyň začne s přípravou</li>
                <li>🚚 Jídlo bude doručeno na váš stůl</li>
              </ul>
            )}
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
