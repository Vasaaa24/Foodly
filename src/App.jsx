import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import InstallButton from "./components/InstallButton";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import QRGeneratorPage from "./pages/QRGeneratorPage";
import IntroScreen from "./components/IntroScreen";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/qr-generator' || location.pathname === '/admin-panel-2024';
  
  // Skrýt footer i na cash payment stránce
  const isCashPaymentPage = location.pathname.startsWith('/order/') && 
                           location.state?.paymentMethod === "cash";
  
  const hideFooter = isAdminPage || isCashPaymentPage;

  return (
    <div className="app">
      <InstallButton />
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          {/* Skrytá admin route - přístupná jen přímým odkazem */}
          <Route path="/qr-generator" element={<QRGeneratorPage />} />
          {/* Alternativní skrytá cesta k administraci */}
          <Route path="/admin-panel-2024" element={<QRGeneratorPage />} />
        </Routes>
      </main>

      {!hideFooter && <BottomBar />}
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
