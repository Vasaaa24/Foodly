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

// Komponenta pro ochranu admin routes
function ProtectedAdminRoute({ children }) {
  const { selectedTable } = useCart();
  const isQRCustomer = selectedTable !== null;
  
  // QR zákazníci nemohou přistupovat k admin stránkám
  if (isQRCustomer) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/qr-generator';

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route 
            path="/qr-generator" 
            element={
              <ProtectedAdminRoute>
                <QRGeneratorPage />
              </ProtectedAdminRoute>
            } 
          />
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
