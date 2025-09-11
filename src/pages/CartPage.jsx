import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const { items, totalPrice, totalItems, clearCart, selectedTable, setTable } =
    useCart();
  const navigate = useNavigate();

  // Generuj čísla stolů (1-20)
  const tableNumbers = Array.from({ length: 20 }, (_, i) => i + 1);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h2>Váš košík</h2>
        </div>
        <div className="empty-cart">
          <p>Váš košík je prázdný</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Pokračovat v nakupování
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Váš košík ({totalItems} položek)</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Vyprázdnit košík
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="table-selection">
          <h3>Vyberte stůl</h3>
          <div className="table-grid">
            {tableNumbers.map((tableNum) => (
              <button
                key={tableNum}
                className={`table-btn ${
                  selectedTable === tableNum ? "selected" : ""
                }`}
                onClick={() => setTable(tableNum)}
              >
                {tableNum}
              </button>
            ))}
          </div>
          {!selectedTable && (
            <p className="table-warning">
              ⚠️ Prosím vyberte stůl pro dokončení objednávky
            </p>
          )}
        </div>

        <div className="total-section">
          <div className="total-line">
            <span>Celkem ({totalItems} položek):</span>
            <span className="total-price">{totalPrice.toFixed(2)} Kč</span>
          </div>
        </div>

        <div className="cart-actions">
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Pokračovat v nakupování
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
