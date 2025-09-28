import React from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "@/redux/store";
import { productDetailsType } from "@/types/ordersTypes";

const Checkout = () => {
  const placeOrders = useSelector((state) => state.orders.placeOrders);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center space-x-3"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">Order Placed</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {placeOrders.productsDetails.map(
                    (item: productDetailsType) => (
                      <div
                        key={item._id}
                        className="flex items-center space-x-4 border-b pb-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Delivery + Price */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Delivery & Price Details</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Delivery Info */}
                <div className="mb-6 space-y-2">
                  <p className="font-medium">
                    {placeOrders.deliveryDetails.firstName +
                      " " +
                      placeOrders.deliveryDetails.lastName}
                  </p>
                  <p className="text-gray-700">
                    {placeOrders.deliveryDetails.address}
                  </p>
                  <p className="text-gray-700">
                    {placeOrders.deliveryDetails.phoneNumber}
                  </p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>Delivery expected in 3–5 days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-gray-500" />
                    <span>Free Shipping</span>
                  </div>
                </div>

                {/* Price Info */}
                <div className="space-y-2 border-t pt-4 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{placeOrders.priceDetails.subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>
                      ₹{Number(placeOrders.priceDetails.taxAmount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total Amount</span>
                    <span className="text-yellow-600">
                      ₹{Number(placeOrders.priceDetails.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Back Button */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Secure & Encrypted Checkout</span>
                  </div>
                </div>
                <div className="pt-6">
                  <Link to="/products">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      Back to Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
