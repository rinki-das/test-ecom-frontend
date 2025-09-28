import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import heroBanner from "@/assets/hero-banner.jpg";
import Footer from "../components/ui/Footer";
import { dispatch, useSelector } from "@/redux/store";
import { getAllProducts } from "@/redux/slices/products";
import { getAllCategories } from "@/redux/slices/categories";

const Index = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await dispatch(getAllProducts());
      setProducts(res);
      const data = await dispatch(getAllCategories());
      setCategories(data);
    }

    getData();
  }, []);

  const featuredProducts = products.slice(0, 4);
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />

        <div className="relative container mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                New Collection Available
              </Badge>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Elevate Your
                <span className="block text-gradient bg-gradient-to-r from-white to-white/60 bg-clip-text">
                  Lifestyle
                </span>
              </h1>

              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                Discover our curated collection of premium products designed for
                the modern lifestyle. Quality craftsmanship meets innovative
                design.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button className="btn-hero group">
                    Shop Collection
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full backdrop-blur-md hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-12 left-32 w-16 h-16 bg-white/10 rounded-full backdrop-blur-md hidden lg:block"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface-elevated">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                description: "Free shipping on all orders over $99",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                description: "Your payment information is safe with us",
              },
              {
                icon: RefreshCw,
                title: "Easy Returns",
                description: "30-day hassle-free return policy",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center p-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of premium products across different
              categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/products/${category.slug}`)} // ✅ go to products/:slug
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/80 mb-4">
                    {category.productCount} products
                  </p>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${category.slug}`); // ✅ button also navigates
                    }}
                    className="glass-effect border-white/30 text-black hover:bg-white/10"
                  >
                    Explore
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-surface-elevated">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our premium collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product._id}
                onClick={() => window.open(`/product/${product._id}`, "_blank")}
                className="cursor-pointer"
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Link to="/products">
              <Button className="btn-hero">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
