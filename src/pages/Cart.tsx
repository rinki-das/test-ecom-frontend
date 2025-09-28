import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Minus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import Checkout from "./Checkout";
import { placeOrder } from "@/redux/slices/orders";
import { dispatch } from "@/redux/store";

const Cart: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handlePlaceOrder = async () => {
    if (!firstName || !lastName || !address || !phone) {
      alert("⚠ Please fill all required fields");
      return;
    }

    const payload = {
      firstName,
      lastName,
      address,
      phoneNumber: phone,
      subTotal: totalPrice,
      shipping: "free",
      tax: 8, //in percentage
      productIds: state.items.flatMap((item) =>
        Array(item.quantity).fill(item.product._id)
      ),
    };

    dispatch(placeOrder(payload));

    setLoading(true);
    try {
      // simulate API call
      await new Promise((res) => setTimeout(res, 1000));

      const newOrder = {
        id: Date.now(),
        name: `${firstName} ${lastName}`,
        address,
        phone,
        items: state.items,
        subtotal: totalPrice,
        tax: totalPrice * 0.08,
        total: totalPrice * 1.08,
      };

      setOrderDetails(newOrder);
      clearCart();
    } catch (err) {
      alert("❌ Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderDetails) {
    return <Checkout />;
  }

  // ✅ Empty Cart
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Default Cart
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🛒 Your Cart
          </h1>
          <p className="text-gray-500">
            {state.items.length} item{state.items.length !== 1 ? "s" : ""} in
            your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <motion.div
                key={item.product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-4 p-5 bg-white rounded-xl shadow-sm border"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.product.brand}</p>
                  <p className="text-sm text-gray-500">
                    {item.product.category}
                  </p>
                  <p className="mt-1 text-primary font-bold text-lg">
                    ₹{item.product.price}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity - 1)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="font-semibold text-gray-800 w-20 text-right">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
            <div className="flex justify-between items-center pt-4">
              <Link to="/products">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-500 hover:text-red-600"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-md border p-6 space-y-5 h-fit sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>₹{(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 font-bold text-lg flex justify-between">
                <span>Total</span>
                <span className="text-yellow-600">
                  ₹{(totalPrice * 1.08).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-3">
              <Input
                placeholder="First Name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last Name*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                placeholder="Phone Number*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Textarea
                placeholder="Address*"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
