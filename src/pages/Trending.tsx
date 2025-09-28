import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "@/redux/store";

const Trending: React.FC = () => {
  const products = useSelector((state) => state.products.products);

  const trendingProducts = products
    .filter((product) => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Trending Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover what's hot right now - our most popular and highest-rated
            products
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {trendingProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {trendingProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-semibold mb-4">
              No trending products found
            </h3>
            <p className="text-muted-foreground">
              Check back later for trending items
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Trending;
