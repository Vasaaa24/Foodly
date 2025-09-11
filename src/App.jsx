import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import QRGeneratorPage from "./pages/QRGeneratorPage";
import IntroScreen from "./components/IntroScreen";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const { isQRCustomer } = useCart();
  const isAdminPage = location.pathname === '/qr-generator';
  const isQRUser = isQRCustomer();

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          {/* Admin route je dostupná pouze pro ne-QR uživatele */}
          {!isQRUser && (
            <Route 
              path="/qr-generator" 
              element={<QRGeneratorPage />}
            />
          )}
          {/* Fallback pro QR uživatele kteří se pokusí o admin přístup */}
          {isQRUser && (
            <Route path="/qr-generator" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </main>

      {!isAdminPage && <BottomBar />}
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
