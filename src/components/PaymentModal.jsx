import { useState } from "react";
import {
  CardPaymentForm,
  ApplePayForm,
  GooglePayForm,
  BankTransferForm,
  CashPaymentForm,
} from "./PaymentForms";
import "./PaymentModal.css";
import "./PaymentForms.css";

const PaymentModal = ({ isOpen, onClose, total, onPaymentConfirm }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "cash",
      name: "Hotovost",
      icon: "💵",
      description: "Zaplatit při převzetí",
    },
    {
      id: "card",
      name: "Platební karta",
      icon: "💳",
      description: "Visa, Mastercard, atd.",
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: "🍎",
      description: "Rychlá platba Apple Pay",
    },
    {
      id: "google-pay",
      name: "Google Pay",
      icon: "💰",
      description: "Rychlá platba Google Pay",
    },
    {
      id: "bank-transfer",
      name: "Bankovní převod",
      icon: "🏦",
      description: "Převod na účet",
    },
  ];

  const handlePaymentSubmit = (paymentData) => {
    setIsProcessing(true);

    // Simulace zpracování platby
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentConfirm(selectedMethod, paymentData);
      setSelectedMethod(null);
    }, 1000);
  };

  const handleCancel = () => {
    setSelectedMethod(null);
  };

  const handleClose = () => {
    setSelectedMethod(null);
    onClose();
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "card":
        return (
          <CardPaymentForm
            onSubmit={handlePaymentSubmit}
            onCancel={handleCancel}
            total={total}
          />
        );
      case "apple-pay":
        return (
          <ApplePayForm
            onSubmit={handlePaymentSubmit}
            onCancel={handleCancel}
            total={total}
          />
        );
      case "google-pay":
        return (
          <GooglePayForm
            onSubmit={handlePaymentSubmit}
            onCancel={handleCancel}
            total={total}
          />
        );
      case "bank-transfer":
        return (
          <BankTransferForm
            onSubmit={handlePaymentSubmit}
            onCancel={handleCancel}
            total={total}
          />
        );
      case "cash":
        return (
          <CashPaymentForm
            onSubmit={handlePaymentSubmit}
            onCancel={handleCancel}
            total={total}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay" onClick={handleClose}>
      <div
        className="payment-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="payment-modal-close" onClick={handleClose}>
          ×
        </button>

        {isProcessing ? (
          <div className="processing-payment">
            <div className="spinner"></div>
            <h3>Zpracování platby...</h3>
            <p>Prosím čekejte, dokončujeme vaši transakci</p>
          </div>
        ) : selectedMethod ? (
          <div className="payment-form-container">{renderPaymentForm()}</div>
        ) : (
          <div className="payment-methods-selection">
            <h2>Vyberte způsob platby</h2>
            <div className="total-amount">
              <span>Celkem k úhradě: </span>
              <strong>{total} Kč</strong>
            </div>

            <div className="payment-methods-grid">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className="payment-method-btn"
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <span className="payment-icon">{method.icon}</span>
                  <div className="payment-details">
                    <span className="payment-name">{method.name}</span>
                    <span className="payment-description">
                      {method.description}
                    </span>
                  </div>
                  <span className="payment-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
