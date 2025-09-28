import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/pages/WishlistContext";
import { ProductType } from "@/types/ProductTypes";

interface ProductCardProps {
  product: ProductType;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // ✅ wishlist hooks

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const isInWishlist = wishlist.some((p) => p.id === product._id); // ✅ check wishlist
  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening product page
    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast({ title: "Removed from wishlist", description: product.name });
    } else {
      addToWishlist(product);
      toast({ title: "Added to wishlist", description: product.name });
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      onClick={() => window.open(`/product/${product._id}`, "_blank")}
      className="card-product group overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button onClick={handleAddToCart} className="btn-hero px-6">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleWishlist} // ✅ toggle wishlist
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
            isInWishlist ? "bg-pink-100" : "bg-white/90 hover:bg-white"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              isInWishlist
                ? "text-red-500 fill-current"
                : "text-muted-foreground"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{product.brand}</span>
          <span className="text-xs text-primary bg-primary-light px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-primary">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={!product.inStock}
          className="w-full btn-ghost group-hover:btn-hero transition-all duration-300"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
