import { useState } from "react";
import "./ProductDetailModal.css";

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Definice možných variant pro různé typy jídel
  const getProductOptions = (product) => {
    if (!product || !product.name) return {};
    
    const options = {};
    const productName = product.name.toLowerCase();

    // Pokud je to maso/hlavní chod
    if (productName.includes('kuře') || 
        productName.includes('vepř') || 
        productName.includes('hovězí') ||
        productName.includes('steak') ||
        productName.includes('řízek')) {
      options.meat = {
        label: "Typ masa",
        required: true,
        choices: ["Kuřecí", "Vepřové", "Hovězí", "Krůtí"]
      };
      options.preparation = {
        label: "Způsob přípravy",
        required: true,
        choices: ["Grilované", "Smažené", "Pečené", "Na pánvi"]
      };
    }

    // Pokud je to pizza nebo jídlo s možností pálivosti
    if (productName.includes('pizza') || 
        productName.includes('mexick') ||
        productName.includes('curry') ||
        productName.includes('chili')) {
      options.spicy = {
        label: "Pálivost",
        required: true,
        choices: ["Nepalivo", "Mírně palivo", "Středně palivo", "Hodně palivo"]
      };
    }

    // Pokud je to pizza
    if (productName.includes('pizza')) {
      options.size = {
        label: "Velikost",
        required: true,
        choices: ["Malá (24cm)", "Střední (30cm)", "Velká (36cm)"]
      };
      options.crust = {
        label: "Těsto",
        required: false,
        choices: ["Klasické", "Tenké", "Silné", "Celozrnné"]
      };
    }

    // Pokud je to nápoj
    if (productName.includes('nápoj') || 
        productName.includes('cola') ||
        productName.includes('pivo') ||
        productName.includes('víno')) {
      options.size = {
        label: "Velikost",
        required: true,
        choices: ["0,33l", "0,5l", "1l"]
      };
    }

    // Pokud je to káva
    if (productName.includes('káva') || 
        productName.includes('coffee')) {
      options.milk = {
        label: "Mléko",
        required: false,
        choices: ["Bez mléka", "Klasické mléko", "Sójové mléko", "Ovesné mléko", "Kokosové mléko"]
      };
      options.sugar = {
        label: "Sladidlo",
        required: false,
        choices: ["Bez sladidla", "Cukr", "Med", "Stévie"]
      };
    }

    // Pokud je to salát
    if (productName.includes('salát')) {
      options.dressing = {
        label: "Dresink",
        required: true,
        choices: ["Vinaigrette", "Caesar", "Ranch", "Balsamic", "Olivový olej"]
      };
      options.protein = {
        label: "Přidat protein",
        required: false,
        choices: ["Žádný", "Kuřecí maso", "Tuňák", "Sýr feta", "Mozzarella"]
      };
    }

    return options;
  };

  const productOptions = getProductOptions(product || {});

  const handleOptionChange = (optionKey, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionKey]: value
    });
  };

  const validateSelection = () => {
    // Zkontroluj, zda jsou vyplněny všechny povinné volby
    for (const [key, option] of Object.entries(productOptions)) {
      if (option.required && !selectedOptions[key]) {
        return false;
      }
    }
    return true;
  };

  const calculateTotalPrice = () => {
    if (!product || !product.price) return "0.00";
    
    let basePrice = product.price;
    let multiplier = 1;

    // Úprava ceny podle velikosti
    if (selectedOptions.size) {
      if (selectedOptions.size.includes("Střední") || selectedOptions.size.includes("0,5l")) {
        multiplier = 1.3;
      } else if (selectedOptions.size.includes("Velká") || selectedOptions.size.includes("1l")) {
        multiplier = 1.6;
      }
    }

    return (basePrice * multiplier * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!validateSelection()) {
      alert("Prosím vyplňte všechny povinné volby");
      return;
    }

    const productToAdd = {
      ...product,
      id: `${product.id}_${Date.now()}`, // Jedinečné ID pro každou variantu
      originalId: product.id,
      selectedOptions,
      comment: comment.trim(),
      quantity,
      price: parseFloat(calculateTotalPrice()) / quantity // Cena za kus
    };

    onAddToCart(productToAdd);
    onClose();
    
    // Reset formuláře
    setSelectedOptions({});
    setComment("");
    setQuantity(1);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="product-modal-header">
          <img 
            src={product?.image || "/placeholder-food.jpg"} 
            alt={product?.name || "Produkt"}
            className="product-modal-image"
          />
          <div className="product-modal-info">
            <h2>{product?.name || "Neuvedeno"}</h2>
            <p className="product-description">{product?.description || "Popis není k dispozici"}</p>
            <p className="product-base-price">Základní cena: {product?.price || 0} Kč</p>
          </div>
        </div>

        <div className="product-options">
          {Object.entries(productOptions).map(([key, option]) => (
            <div key={key} className="option-group">
              <label className="option-label">
                {option.label} {option.required && <span className="required">*</span>}
              </label>
              <div className="option-choices">
                {option.choices.map((choice) => (
                  <button
                    key={choice}
                    className={`option-choice ${selectedOptions[key] === choice ? 'selected' : ''}`}
                    onClick={() => handleOptionChange(key, choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="comment-section">
            <label className="option-label">Poznámka pro kuchyň</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Speciální požadavky, alergie, apod..."
              className="comment-input"
              maxLength={200}
            />
            <span className="character-count">{comment.length}/200</span>
          </div>

          <div className="quantity-section">
            <label className="option-label">Množství</label>
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="product-modal-footer">
          <div className="total-price">
            Celkem: <strong>{calculateTotalPrice()} Kč</strong>
          </div>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onClose}>
              Zrušit
            </button>
            <button 
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              disabled={!validateSelection()}
            >
              Přidat do košíku
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
