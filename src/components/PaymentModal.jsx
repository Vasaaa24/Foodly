import { useState } from "react";
import "./PaymentModal.css";

const PaymentModal = ({ isOpen, onClose, total, onPaymentConfirm }) => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "cash",
      name: "Hotovost",
      icon: "💵",
      description: "Platba v hotovosti při převzetí",
    },
    {
      id: "card",
      name: "Platební karta",
      icon: "💳",
      description: "Visa, Mastercard, Maestro",
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: "📱",
      description: "Rychlá a bezpečná platba",
    },
    {
      id: "google-pay",
      name: "Google Pay",
      icon: "🟢",
      description: "Platba přes Google",
    },
    {
      id: "bank-transfer",
      name: "Bankovní převod",
      icon: "🏦",
      description: "Převod na účet restaurace",
    },
  ];

  const handlePayment = async () => {
    if (!selectedPayment) return;

    setIsProcessing(true);

    // Simulace zpracování platby
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentConfirm(selectedPayment);
      onClose();
      setSelectedPayment("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <h3>Vyberte způsob platby</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="payment-total">
          <span>Celková částka: </span>
          <span className="total-amount">{total} Kč</span>
        </div>

        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-method ${
                selectedPayment === method.id ? "selected" : ""
              }`}
              onClick={() => setSelectedPayment(method.id)}
            >
              <div className="payment-icon">{method.icon}</div>
              <div className="payment-info">
                <div className="payment-name">{method.name}</div>
                <div className="payment-description">{method.description}</div>
              </div>
              <div className="payment-radio">
                <div
                  className={`radio ${
                    selectedPayment === method.id ? "checked" : ""
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="payment-actions">
          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={isProcessing}
          >
            Zrušit
          </button>
          <button
            className="confirm-payment-btn"
            onClick={handlePayment}
            disabled={!selectedPayment || isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="loading-spinner"></span>
                Zpracovává se...
              </>
            ) : (
              "Potvrdit platbu"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
