import { useState, useEffect } from "react";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menuData";
import MenuItem from "../components/MenuItem";
import ProductDetailModal from "../components/ProductDetailModal";
import { useCart } from "../context/CartContext";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("predkrmy");
  const [searchTerm, setSearchTerm] = useState("");
  const [animationState, setAnimationState] = useState("idle"); // idle, changing, entering
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const { addItem, selectedTable } = useCart();

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShowProductDetail = (product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleCloseProductDetail = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (productWithOptions) => {
    addItem(productWithOptions);
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  const handleCategoryChange = (categoryId) => {
    if (categoryId !== selectedCategory) {
      setAnimationState("changing");

      setTimeout(() => {
        setSelectedCategory(categoryId);
        setAnimationState("entering");

        setTimeout(() => {
          setAnimationState("idle");
        }, 500);
      }, 200);
    }
  };

  const getMenuItemsClassName = () => {
    switch (animationState) {
      case "changing":
        return "menu-items changing";
      case "entering":
        return "menu-items entering";
      default:
        return "menu-items";
    }
  };

  return (
    <div className="menu-page">
      {/* Zobrazení čísla stolu */}
      {selectedTable && (
        <div className="table-info">
          <div className="table-number-display">
            <span className="table-icon">🍴</span>
            <span className="table-text">Stůl {selectedTable}</span>
          </div>
        </div>
      )}

      <div className="menu-header">
        {/* Vyhledávací pole */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Hledat jídlo..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Kategorie tabs */}
      <div className="category-tabs">
        {MENU_CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${
              selectedCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Seznam jídel */}
      <div className={getMenuItemsClassName()}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <MenuItem
              key={`${item.id}-${selectedCategory}`}
              item={item}
              index={index}
              onShowDetail={handleShowProductDetail}
            />
          ))
        ) : (
          <div className="no-items">
            <p>Žádná jídla nenalezena</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={showProductDetail}
        onClose={handleCloseProductDetail}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default MenuPage;
