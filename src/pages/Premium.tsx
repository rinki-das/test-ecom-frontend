import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "@/redux/store";

const Premium: React.FC = () => {
  const products = useSelector((state) => state.products.products);

  // Filter for premium products (price > 200)
  const premiumProducts = products.filter((product) => product.price > 200);

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
            Premium Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover our exclusive range of premium products crafted for
            excellence
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
          {premiumProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </motion.div>

        {/* No Results */}
        {premiumProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-semibold mb-4">
              No premium products found
            </h3>
            <p className="text-muted-foreground">
              Check back later for our premium collection
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Premium;
