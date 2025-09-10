import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQty) => {
    if (newQty <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQty);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <span className="cart-item-price">{item.price} Kč</span>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button
            className="qty-btn"
            onClick={() => handleQuantityChange(item.qty - 1)}
          >
            -
          </button>
          <span className="quantity">{item.qty}</span>
          <button
            className="qty-btn"
            onClick={() => handleQuantityChange(item.qty + 1)}
          >
            +
          </button>
        </div>

        <div className="item-total">
          {(item.price * item.qty).toFixed(2)} Kč
        </div>

        <button className="remove-btn" onClick={() => removeItem(item.id)}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
