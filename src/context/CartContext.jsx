import { createContext, useContext, useReducer, useEffect } from "react";

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  SET_TABLE: "SET_TABLE",
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].qty += 1;
        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, qty: 1 }],
        };
      }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        )
        .filter((item) => item.qty > 0); // Odstraň položky s qty = 0

      return { ...state, items: updatedItems };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, items: [], selectedTable: null };
    }

    case CART_ACTIONS.SET_TABLE: {
      return { ...state, selectedTable: action.payload };
    }

    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: [],
  selectedTable: null,
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Automatické nastavení stolu z URL parametru
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tableFromUrl = urlParams.get('table');
    
    if (tableFromUrl && !state.selectedTable) {
      dispatch({ type: CART_ACTIONS.SET_TABLE, payload: parseInt(tableFromUrl) });
      // Odstraníme parametr z URL aby nebyl viditelný
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [state.selectedTable]);

  // Actions
  const addItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  };

  const updateQuantity = (id, qty) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, qty } });
  };

  const removeItem = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const setTable = (tableNumber) => {
    dispatch({ type: CART_ACTIONS.SET_TABLE, payload: tableNumber });
  };

  // Computed values
  const totalItems = state.items.reduce((total, item) => total + item.qty, 0);
  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const value = {
    items: state.items,
    selectedTable: state.selectedTable,
    totalItems,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    setTable,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
