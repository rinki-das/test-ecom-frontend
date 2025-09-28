import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/Product";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
