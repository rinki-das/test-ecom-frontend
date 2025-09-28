export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  originalPrice: number;
  price: number;
  category: string;
  brand: string;
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  product: ProductType;
  quantity: number;
}
