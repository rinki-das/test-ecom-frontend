import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const ShoppingCart: React.FC = () => {
  const { state, removeItem, updateQuantity, setCartOpen, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <span className="text-sm text-muted-foreground">
                  ({state.items.length} items)
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Add some products to get started!
                  </p>
                  <Button
                    onClick={() => setCartOpen(false)}
                    className="btn-hero"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 border border-border rounded-lg"
                    >
                      {/* Product Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />

                      {/* Product Info */}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.product.brand}
                        </p>
                        <p className="font-semibold text-primary">
                          ${item.product.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full btn-hero">
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;