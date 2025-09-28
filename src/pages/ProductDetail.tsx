import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "@/redux/store";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();

  const products = useSelector((state) => state.products.products);

  const product = products.find((p) => String(p._id) === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square overflow-hidden rounded-xl border border-border shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {product.brand}
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-primary">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="ml-2">
                    Save {discountPercentage}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-hero flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {product.inStock ? (
                <p className="text-sm text-green-600 font-medium">
                  ✓ In stock and ready to ship
                </p>
              ) : (
                <p className="text-sm text-red-500 font-medium">
                  ✗ Currently out of stock
                </p>
              )}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center space-x-2 text-sm">
                <Truck className="w-5 h-5 text-primary" />
                <span>Free shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-5 h-5 text-primary" />
                <span>2-year warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <RefreshCw className="w-5 h-5 text-primary" />
                <span>30-day returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
