import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/pages/WishlistContext"; // ✅ import
import Header from "@/components/Header";
import ShoppingCart from "@/components/ShoppingCart";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Premium from "./pages/Premium";
import Trending from "./pages/Trending";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WishlistProvider>
            {" "}
            {/* ✅ wrap here */}
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <Header />
                <ShoppingCart />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route
                    path="/products/:categorySlug"
                    element={<Products />}
                  />
                  <Route path="/products/premium" element={<Premium />} />
                  <Route path="/products/trending" element={<Trending />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/products/arrivals" element={<Trending />} />
                  <Route path="/about" element={<About />} />
                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
