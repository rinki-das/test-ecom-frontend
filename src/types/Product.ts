export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}
