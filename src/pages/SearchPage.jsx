import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MENU_ITEMS, MENU_CATEGORIES } from "../data/menuData";
import MenuItem from "../components/MenuItem";
import ProductDetailModal from "../components/ProductDetailModal";
import { useCart } from "../context/CartContext";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Načíst historii vyhledávání z localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history.slice(0, 5)); // Pouze posledních 5
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() && !searchHistory.includes(term.trim())) {
      const newHistory = [term.trim(), ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const removeHistoryItem = (item) => {
    const newHistory = searchHistory.filter((h) => h !== item);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

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

  const handleCategoryClick = (categoryId) => {
    navigate("/", { state: { selectedCategory: categoryId } });
  };

  // Filtrované položky
  const filteredItems = searchTerm.trim()
    ? MENU_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  // Populární položky (náhodný výběr 6 položek)
  const popularItems = MENU_ITEMS.sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <div className="search-page">
      {/* Vyhledávací pole */}
      <div className="search-header">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Hledat jídlo, nápoj..."
            className="search-input-main"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="search-content">
        {/* Pokud není vyhledáváno, zobraz historii */}
        {!searchTerm.trim() ? (
          <>
            {/* Historie vyhledávání */}
            {searchHistory.length > 0 && (
              <section className="search-section">
                <div className="search-section-header">
                  <h3 className="search-section-title">Nedávné hledání</h3>
                  <button className="clear-history-btn" onClick={clearHistory}>
                    Vymazat
                  </button>
                </div>
                <div className="search-history">
                  {searchHistory.map((item, index) => (
                    <div key={index} className="history-item">
                      <button
                        className="history-item-text"
                        onClick={() => setSearchTerm(item)}
                      >
                        <svg
                          className="history-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {item}
                      </button>
                      <button
                        className="remove-history-btn"
                        onClick={() => removeHistoryItem(item)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Populární položky */}
            <section className="search-section">
              <h3 className="search-section-title">Populární</h3>
              <div className="popular-items">
                {popularItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onShowDetail={handleShowProductDetail}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Výsledky vyhledávání */}
            {filteredItems.length > 0 ? (
              <section className="search-section">
                <h3 className="search-section-title">
                  Výsledky ({filteredItems.length})
                </h3>
                <div className="search-results">
                  {filteredItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      onShowDetail={handleShowProductDetail}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <div className="search-no-results">
                <div className="no-results-icon">🔍</div>
                <h3>Nic jsme nenašli</h3>
                <p>Zkuste hledat jiný výraz</p>
              </div>
            )}
          </>
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

export default SearchPage;
