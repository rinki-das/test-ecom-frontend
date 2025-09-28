import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "@/redux/store";

const Header: React.FC = () => {
  const products = useSelector((state) => state.products.products);

  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setFilteredProducts(
      products?.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [products, query]);

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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="font-serif font-semibold text-lg text-gray-700 hover:text-yellow-500 p-0 h-auto flex items-center transition-all duration-300"
                  >
                    Products
                    <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  className="w-56 bg-white text-gray-700 border border-gray-200 shadow-xl"
                >
                  {[
                    { path: "/products/premium", label: "Premium Products" },
                    { path: "/products/trending", label: "Trending Products" },
                  ].map((item) => (
                    <DropdownMenuItem asChild key={item.path}>
                      <Link
                        to={item.path}
                        className="w-full px-3 py-2 rounded-md hover:bg-gray-100 hover:text-yellow-600 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {[
                { path: "/about", label: "About" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-serif font-semibold text-lg transition-all duration-300 hover:text-yellow-500 ${
                    isActive(item.path) ? "text-yellow-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
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
                      <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs bg-yellow-400 text-black font-bold">
                        {totalItems}
                      </Badge>
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
