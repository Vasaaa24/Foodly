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

  const renderSelectedOptions = () => {
    if (!item.selectedOptions || Object.keys(item.selectedOptions).length === 0) {
      return null;
    }

    return (
      <div className="cart-item-options">
        {Object.entries(item.selectedOptions).map(([key, value]) => (
          <span key={key} className="option-tag">
            {value}
          </span>
        ))}
      </div>
    );
  };

  const renderComment = () => {
    if (!item.comment || !item.comment.trim()) {
      return null;
    }

    return (
      <div className="cart-item-comment">
        💬 {item.comment}
      </div>
    );
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        {renderSelectedOptions()}
        {renderComment()}
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
