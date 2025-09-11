import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import QRGeneratorPage from "./pages/QRGeneratorPage";
import IntroScreen from "./components/IntroScreen";
import "./App.css";

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
        <div className="app">
          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/qr-generator" element={<QRGeneratorPage />} />
            </Routes>
          </main>

          <BottomBar />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
