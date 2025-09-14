
import QRCode from "react-qr-code";
import "./QRCodeComponent.css";

const QRCodeComponent = ({
  url = "https://foodly-opalss.vercel.app/",
  tableNumber = null,
}) => {
  // Přidáme číslo stolu do URL jako query parametr
  const finalUrl = tableNumber ? `${url}?table=${tableNumber}` : url;

  // Barvy podle vzoru
  const blue = "#0055aa";
  const yellow = "#ffc107";
  const white = "#fff";

  return (
  <div style={{
      background: blue,
      borderRadius: 24,
      padding: 32,
      maxWidth: 340,
      margin: "0 auto",
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(33,150,243,0.10)",
      position: "relative"
    }}>
      {/* Nadpis stolu */}
      {tableNumber && (
        <div style={{ color: yellow, fontWeight: 700, fontSize: 22, marginBottom: 8 }}>
          Stůl č. {tableNumber}
        </div>
      )}
      {/* Wifi signál */}
      <svg width="60" height="36" viewBox="0 0 60 36" style={{ display: 'block', margin: '0 auto 0.5rem auto' }}>
        {/* Největší vlnka */}
        <path d="M8 24 Q30 6 52 24" stroke={yellow} strokeWidth="5.5" fill="none" strokeLinecap="round"/>
        {/* Prostřední vlnka */}
        <path d="M16 28 Q30 16 44 28" stroke={yellow} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        {/* Nejmenší vlnka */}
        <path d="M24 32 Q30 26 36 32" stroke={yellow} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      </svg>

      {/* QR kód s bílým rámečkem a žlutými eyes */}
      <div style={{
        background: blue,
        borderRadius: 20,
        padding: 12,
        display: 'inline-block',
        position: 'relative',
        boxShadow: '0 2px 8px rgba(33,150,243,0.10)'
      }}>
        {/* Bílý rámeček */}
        <div style={{
          background: white,
          borderRadius: 16,
          padding: 8,
          display: 'inline-block',
        }}>
          <QRCode
            value={finalUrl}
            size={180}
            bgColor={white}
            fgColor={blue}
            level="M"
          />
          {/* Žluté eyes outline (bez výplně) */}
          <svg width="180" height="180" style={{ position: 'absolute', left: 20, top: 20, pointerEvents: 'none' }}>
            {/* Levý horní */}
            <rect x="0" y="0" width="40" height="40" rx="8" fill="none" stroke={yellow} strokeWidth="6" />
            {/* Pravý horní */}
            <rect x="140" y="0" width="40" height="40" rx="8" fill="none" stroke={yellow} strokeWidth="6" />
            {/* Levý dolní */}
            <rect x="0" y="140" width="40" height="40" rx="8" fill="none" stroke={yellow} strokeWidth="6" />
          </svg>
        </div>
      </div>

      {/* QRest nápis */}
      <div style={{ marginTop: 24, fontWeight: 700, fontSize: 32, color: yellow, letterSpacing: 1 }}>
        QRest
      </div>
    </div>
  );
};

export default QRCodeComponent;
