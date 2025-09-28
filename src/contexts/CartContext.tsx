import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem, ProductType } from "@/types/ProductTypes";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: ProductType }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; isOpen: boolean };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.product._id === action.product._id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product._id === action.product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product._id !== action.productId
        ),
      };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product._id !== action.productId
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product._id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case "SET_CART_OPEN":
      return {
        ...state,
        isOpen: action.isOpen,
      };
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: ProductType) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: ProductType) =>
    dispatch({ type: "ADD_ITEM", product });
  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", productId });
  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });
  const setCartOpen = (isOpen: boolean) =>
    dispatch({ type: "SET_CART_OPEN", isOpen });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
