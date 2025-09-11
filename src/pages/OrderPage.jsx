import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, clearCart } = useCart();
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minut = 300 sekund

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

  // Časovač pro hotovostní platby
  useEffect(() => {
    if (paymentMethod === "cash") {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentMethod]);

  // Formátování času MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBackToMenu = () => {
    navigate("/");
  };

  const handleCallWaiter = () => {
    // Můžete přidat logiku pro volání obsluhy (např. notifikace, API call)
    alert("Obsluha byla zavolána a přijde k vašemu stolu!");
  };

  const handleCardPayment = () => {
    // Přesměrování zpět na platební formulář s kartou
    navigate("/cart");
  };

  // Speciální rozhraní pro hotovostní platby
  if (paymentMethod === "cash") {
    return (
      <div className="order-page cash-payment-page">
        <div className="cash-order-confirmation">
          <h1>Order created. For cash payment please call a waiter to confirm.</h1>
          
          <div className="cash-payment-layout">
            <div className="table-info-large">
              <div className="table-label">Table:</div>
              <div className="table-number-large">{selectedTable || "?"}</div>
            </div>
          </div>

          <div className="order-timer">
            <span>Order waiting for confirmation: </span>
            <span className="timer-display">{formatTime(timeRemaining)}</span>
          </div>

          <div className="cash-payment-actions">
            <button className="call-waiter-btn" onClick={handleCallWaiter}>
              Call a waiter for confirmation
            </button>
            
            <button className="card-payment-option" onClick={handleCardPayment}>
              Pay by card / Apple Pay
              <span className="card-payment-subtitle">(send to kitchen immediately)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

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
