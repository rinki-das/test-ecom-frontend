import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useSelector } from "@/redux/store";
import { ProductType } from "@/types/ProductTypes";

const Header: React.FC = () => {
  const products = useSelector((state) => state.products.products);
  const { totalItems } = useCart();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setFilteredProducts(
      products?.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [products, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <h2 className="text-2xl font-bold text-gray-900">EliteStore</h2>
            </Link>

            <nav className="hidden lg:flex items-center space-x-10 ml-12">
              <Link
                to="/"
                className="font-serif font-semibold text-lg text-gray-700 hover:text-yellow-500 transition-all duration-300"
              >
                Home
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="font-serif font-semibold text-lg text-gray-700 hover:text-yellow-500 transition-all duration-300"
                >
                  Products
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                    >
                      <Link
                        to="/products/premium"
                        className="block px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
                        onClick={() => setShowDropdown(false)}
                      >
                        Premium Products
                      </Link>
                      <Link
                        to="/products/trending"
                        className="block px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
                        onClick={() => setShowDropdown(false)}
                      >
                        Trending Products
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/about"
                className={`font-serif font-semibold text-lg transition-all duration-300 hover:text-yellow-500 ${
                  isActive("/about") ? "text-yellow-600" : "text-gray-700"
                }`}
              >
                About
              </Link>
            </nav>

            <div className="hidden md:flex items-center max-w-md flex-1 mx-10 relative">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  className="pl-12 py-2 bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-400 rounded-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              {showResults && query && (
                <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                      <div
                        key={p._id}
                        onClick={() => {
                          window.open(
                            `${window.location.origin}/product/${p._id}`,
                            "_blank"
                          );
                          setQuery("");
                          setShowResults(false);
                        }}
                        className="flex items-center p-3 cursor-pointer hover:bg-gray-100 transition"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{p.name}</p>
                          <p className="text-sm text-gray-500">₹{p.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-gray-500">No products found</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-gray-700 hover:text-yellow-500"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-yellow-400 text-black text-xs font-bold flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </Link>
              </motion.div>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-700 hover:text-yellow-500"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
