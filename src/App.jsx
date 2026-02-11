import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import InstallButton from "./components/InstallButton";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import QRGeneratorPage from "./pages/QRGeneratorPage";
import IntroScreen from "./components/IntroScreen";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import PasswordScreen from "./components/PasswordScreen";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isAdminPage =
    location.pathname === "/qr-generator" ||
    location.pathname === "/admin-panel-2024";
  const isKitchenPage = location.pathname === "/admin-orders";

  // Skrýt footer i na cash payment stránce
  const isCashPaymentPage =
    location.pathname.startsWith("/order/") &&
    location.state?.paymentMethod === "cash";

  const hideFooter = isAdminPage || isCashPaymentPage || isKitchenPage;

  return (
    <div className="app">
      <InstallButton />
      {!isKitchenPage && <Header />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          {/* Skrytá admin route - přístupná jen přímým odkazem */}
          <Route path="/qr-generator" element={<QRGeneratorPage />} />
          {/* Alternativní skrytá cesta k administraci */}
          <Route path="/admin-panel-2024" element={<QRGeneratorPage />} />
          <Route path="/admin-orders" element={<AdminOrdersPage />} />
        </Routes>
      </main>

      {!hideFooter && <BottomBar />}
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Kontrola autentizace při načtení
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handlePasswordCorrect = () => {
    setIsAuthenticated(true);
  };

  // Počkat na kontrolu autentizace
  if (isCheckingAuth) {
    return null; // Nebo loading screen
  }

  // Pokud není autentizovaný, zobraz password screen
  if (!isAuthenticated) {
    return <PasswordScreen onPasswordCorrect={handlePasswordCorrect} />;
  }

  // Pokud je autentizovaný, ale ještě neviděl intro
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
