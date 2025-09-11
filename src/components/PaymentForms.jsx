import { useState } from "react";

// Formulář pro platební kartu
export const CardPaymentForm = ({ onSubmit, onCancel }) => {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !cardData.cardNumber ||
      cardData.cardNumber.replace(/\s/g, "").length < 13
    ) {
      newErrors.cardNumber = "Zadejte platné číslo karty";
    }

    if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
      newErrors.expiryDate = "Zadejte datum vypršení (MM/YY)";
    }

    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = "Zadejte CVV";
    }

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = "Zadejte jméno držitele karty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulace platby
      setTimeout(() => {
        onSubmit({
          method: "card",
          last4: cardData.cardNumber.slice(-4),
          cardholderName: cardData.cardholderName,
        });
      }, 2000);
    }
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, "").substring(0, 4);
    }

    setCardData({ ...cardData, [field]: formattedValue });

    // Vymazat chybu při psaní
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3>💳 Platba kartou</h3>

      <div className="form-group">
        <label>Číslo karty</label>
        <input
          type="text"
          value={cardData.cardNumber}
          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          className={errors.cardNumber ? "error" : ""}
        />
        {errors.cardNumber && (
          <span className="error-text">{errors.cardNumber}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label>Datum vypršení</label>
          <input
            type="text"
            value={cardData.expiryDate}
            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            placeholder="MM/YY"
            maxLength="5"
            className={errors.expiryDate ? "error" : ""}
          />
          {errors.expiryDate && (
            <span className="error-text">{errors.expiryDate}</span>
          )}
        </div>

        <div className="form-group half">
          <label>CVV</label>
          <input
            type="text"
            value={cardData.cvv}
            onChange={(e) => handleInputChange("cvv", e.target.value)}
            placeholder="123"
            maxLength="4"
            className={errors.cvv ? "error" : ""}
          />
          {errors.cvv && <span className="error-text">{errors.cvv}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Jméno držitele karty</label>
        <input
          type="text"
          value={cardData.cardholderName}
          onChange={(e) => handleInputChange("cardholderName", e.target.value)}
          placeholder="Jan Novák"
          className={errors.cardholderName ? "error" : ""}
        />
        {errors.cardholderName && (
          <span className="error-text">{errors.cardholderName}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Zrušit
        </button>
        <button type="submit" className="btn-pay">
          Zaplatit kartou
        </button>
      </div>
    </form>
  );
};

// Apple Pay simulace
export const ApplePayForm = ({ onSubmit, onCancel, total }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplePay = () => {
    setIsProcessing(true);
    // Simulace Apple Pay procesu
    setTimeout(() => {
      onSubmit({
        method: "apple-pay",
        transactionId: "APL_" + Math.random().toString(36).substr(2, 9),
      });
    }, 3000);
  };

  return (
    <div className="payment-form apple-pay-form">
      <h3>🍎 Apple Pay</h3>
      <div className="apple-pay-info">
        <p>Použijte Touch ID nebo Face ID k dokončení platby</p>
        <div className="payment-amount">
          <strong>{total} Kč</strong>
        </div>
      </div>

      {isProcessing ? (
        <div className="processing">
          <div className="spinner"></div>
          <p>Zpracování platby...</p>
        </div>
      ) : (
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Zrušit
          </button>
          <button onClick={handleApplePay} className="btn-apple-pay">
            💳 Zaplatit Apple Pay
          </button>
        </div>
      )}
    </div>
  );
};

// Google Pay simulace
export const GooglePayForm = ({ onSubmit, onCancel, total }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGooglePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onSubmit({
        method: "google-pay",
        transactionId: "GPY_" + Math.random().toString(36).substr(2, 9),
      });
    }, 2500);
  };

  return (
    <div className="payment-form google-pay-form">
      <h3>🟡 Google Pay</h3>
      <div className="google-pay-info">
        <p>Rychlá a bezpečná platba pomocí Google Pay</p>
        <div className="payment-amount">
          <strong>{total} Kč</strong>
        </div>
      </div>

      {isProcessing ? (
        <div className="processing">
          <div className="spinner"></div>
          <p>Zpracování platby...</p>
        </div>
      ) : (
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Zrušit
          </button>
          <button onClick={handleGooglePay} className="btn-google-pay">
            🟡 Zaplatit Google Pay
          </button>
        </div>
      )}
    </div>
  );
};

// Bankovní převod
export const BankTransferForm = ({ onSubmit, onCancel, total }) => {
  const [bankData, setBankData] = useState({
    accountNumber: "",
    bankCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      method: "bank-transfer",
      accountNumber: bankData.accountNumber,
      bankCode: bankData.bankCode,
    });
  };

  return (
    <div className="payment-form">
      <h3>🏦 Bankovní převod</h3>
      <form onSubmit={handleSubmit}>
        <div className="bank-info">
          <p>Platba bude zpracována během 1-2 pracovních dnů</p>
          <div className="payment-amount">
            <strong>Částka: {total} Kč</strong>
          </div>
        </div>

        <div className="form-group">
          <label>Číslo účtu</label>
          <input
            type="text"
            value={bankData.accountNumber}
            onChange={(e) =>
              setBankData({ ...bankData, accountNumber: e.target.value })
            }
            placeholder="123456789/0100"
            required
          />
        </div>

        <div className="bank-details">
          <h4>Údaje pro převod:</h4>
          <p>
            <strong>Číslo účtu:</strong> 2850410057/2010
          </p>
          <p>
            <strong>Částka:</strong> {total} Kč
          </p>
          <p>
            <strong>Variabilní symbol:</strong>{" "}
            {Math.floor(Math.random() * 10000000)}
          </p>
          <p>
            <strong>Zpráva pro příjemce:</strong> Foodly objednávka
          </p>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Zrušit
          </button>
          <button type="submit" className="btn-bank">
            Potvrdit převod
          </button>
        </div>
      </form>
    </div>
  );
};

// Hotovost
export const CashPaymentForm = ({ onSubmit, onCancel, total }) => {
  const handleCashPayment = () => {
    onSubmit({
      method: "cash",
      amount: total,
    });
  };

  return (
    <div className="payment-form cash-form">
      <h3>💵 Platba v hotovosti</h3>
      <div className="cash-info">
        <p>Zaplatíte při převzetí objednávky</p>
        <div className="payment-amount">
          <strong>{total} Kč</strong>
        </div>
        <div className="cash-note">
          <p>💡 Tip: Připravte si prosím přesnou částku</p>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Zrušit
        </button>
        <button onClick={handleCashPayment} className="btn-cash">
          💵 Potvrdit hotovost
        </button>
      </div>
    </div>
  );
};
