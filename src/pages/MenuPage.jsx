import { useState, useEffect } from "react";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menuData";
import MenuItem from "../components/MenuItem";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("predkrmy");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (categoryId) => {
    if (categoryId !== selectedCategory) {
      setIsAnimating(true);

      setTimeout(() => {
        setSelectedCategory(categoryId);
        setIsAnimating(false);
      }, 100);
    }
  };

  useEffect(() => {
    setIsAnimating(false);
  }, [selectedCategory]);

  return (
    <div className="menu-page">
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
      <div className={`menu-items ${isAnimating ? "animating" : ""}`}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <MenuItem
              key={`${item.id}-${selectedCategory}`}
              item={item}
              index={index}
            />
          ))
        ) : (
          <div className="no-items">
            <p>Žádná jídla nenalezena</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
