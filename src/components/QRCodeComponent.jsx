import QRCode from "react-qr-code";
import "./QRCodeComponent.css";

const QRCodeComponent = ({
  url = "https://foodly-opalss.vercel.app/",
  tableNumber = null,
}) => {
  // Přidáme číslo stolu do URL jako query parametr
  const finalUrl = tableNumber ? `${url}?table=${tableNumber}` : url;

  return (
    <div className="qr-code-container">
      <div className="qr-code-header">
        <div className="logo-section">
          <div className="qr-fork-icon">
            <div className="qr-fork-handle"></div>
            <div className="qr-fork-prongs">
              <div className="qr-prong"></div>
              <div className="qr-prong"></div>
              <div className="qr-prong"></div>
            </div>
          </div>
          <h1 className="qr-logo-text">
            <span className="qr-logo-food">Food</span>
            <span className="qr-logo-ly">ly</span>
          </h1>
        </div>

        {tableNumber && (
          <div className="table-number">
            <span>Stůl č. {tableNumber}</span>
          </div>
        )}
      </div>

      <div className="qr-code-wrapper">
        <QRCode
          value={finalUrl}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="M"
        />
      </div>

      <div className="qr-instructions">
        <h3>Naskenujte QR kód</h3>
        <p>Otevřete kameru telefonu a nasměrujte na QR kód</p>
        <p className="qr-url">{finalUrl}</p>
      </div>

      <div className="qr-features">
        <div className="feature">
          <span className="feature-icon">📱</span>
          <span>Digitální menu</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🛒</span>
          <span>Online objednávka</span>
        </div>
        <div className="feature">
          <span className="feature-icon">💳</span>
          <span>Platba kartou</span>
        </div>
      </div>
    </div>
  );
};

export default QRCodeComponent;
