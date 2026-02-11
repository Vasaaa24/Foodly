import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menuData";
import MenuItem from "../components/MenuItem";
import ProductDetailModal from "../components/ProductDetailModal";
import { useCart } from "../context/CartContext";

const MenuPage = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || "predkrmy",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [animationState, setAnimationState] = useState("idle"); // idle, slide-out-left, slide-out-right, slide-in-left, slide-in-right
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { addItem, selectedTable } = useCart();

  // Minimální vzdálenost pro detekci swipe (v px)
  const minSwipeDistance = 50;

  // Reagovat na změnu kategorie z navigace
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

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

  const handleCategoryChange = (categoryId, direction = "next") => {
    if (categoryId !== selectedCategory) {
      // Animace odjezdu - doleva nebo doprava
      setAnimationState(
        direction === "next" ? "slide-out-left" : "slide-out-right",
      );

      setTimeout(() => {
        setSelectedCategory(categoryId);
        // Animace příjezdu - zprava nebo zleva
        setAnimationState(
          direction === "next" ? "slide-in-right" : "slide-in-left",
        );

        setTimeout(() => {
          setAnimationState("idle");
        }, 250);
      }, 200);
    }
  };

  // Funkce pro přechod na další/předchozí kategorii
  const navigateToCategory = (direction) => {
    const currentIndex = MENU_CATEGORIES.findIndex(
      (cat) => cat.id === selectedCategory,
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % MENU_CATEGORIES.length;
    } else {
      newIndex =
        (currentIndex - 1 + MENU_CATEGORIES.length) % MENU_CATEGORIES.length;
    }

    handleCategoryChange(MENU_CATEGORIES[newIndex].id, direction);
  };

  // Touch event handlers pro swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateToCategory("next");
    } else if (isRightSwipe) {
      navigateToCategory("prev");
    }
  };

  const getMenuItemsClassName = () => {
    return `menu-items ${animationState !== "idle" ? animationState : ""}`;
  };

  return (
    <div
      className="menu-page"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
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
