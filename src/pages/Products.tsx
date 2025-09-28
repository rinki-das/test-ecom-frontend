import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { useSearchParams, useParams } from "react-router-dom";
import { dispatch, useSelector } from "@/redux/store";
import { getAllProducts } from "@/redux/slices/products";
import { getAllCategories } from "@/redux/slices/categories";

const Products: React.FC = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);

  const { categorySlug } = useParams<{ categorySlug?: string }>(); // ✅ read from URL
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, []);

  // ✅ highlighted product id from URL
  const highlightedId = searchParams.get("highlight");

  // ✅ Auto-select category if URL has one
  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
  }, [categorySlug]);

  const filteredProducts = products
    .filter((product) => {
      const categorySlug =
        categories.find((c) => c.name === product.category)?.slug || "";

      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" ||
          categorySlug.toLowerCase() === selectedCategory.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

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
            Discover Premium Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Explore our curated collection of premium products designed for the
            modern lifestyle
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Filters & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-surface-elevated rounded-xl border border-border"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "space-y-6"
          }
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              className={`rounded-xl transition shadow-sm ${
                product._id === highlightedId
                  ? "border-4 border-yellow-500 shadow-lg scale-105"
                  : ""
              }`}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-semibold mb-4">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all categories
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="btn-hero"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
