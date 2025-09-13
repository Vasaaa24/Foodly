import { useState, useEffect } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Zabránit automatickému zobrazení install prompt
      e.preventDefault();
      // Uložit event pro pozdější použití
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Zobrazit install prompt
    deferredPrompt.prompt();

    // Počkat na uživatelovu volbu
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response: ${outcome}`);

    // Vymazat deferredPrompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <div className="install-banner">
      <div className="install-content">
        <span>📱 Přidat Foodly na plochu?</span>
        <button onClick={handleInstallClick} className="install-button">
          Instalovat
        </button>
        <button
          onClick={() => setShowInstallButton(false)}
          className="install-close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default InstallButton;
