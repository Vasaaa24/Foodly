import { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import MenuItem from '../components/MenuItem';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('predkrmy');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrace položek podle kategorie a vyhledávání
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2>Naše menu</h2>
        
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
        {MENU_CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Seznam jídel */}
      <div className="menu-items">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MenuItem key={item.id} item={item} />
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
