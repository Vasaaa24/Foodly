import { useCart } from "../context/CartContext";
import { useState } from "react";

const MenuItem = ({ item }) => {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="menu-item">
      <div className="menu-item-image">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <span>🍽️</span>
          </div>
        )}
      </div>

      <div className="menu-item-content">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>

        <div className="menu-item-footer">
          <span className="menu-item-price">{item.price} Kč</span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            + Přidat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
