export interface placeOrdersType {
  success: boolean;
  message: string;
  deliveryDetails: {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
  };
  priceDetails: {
    subTotal: number;
    taxAmount: number;
    shipping: string;
    total: number;
  };
  productsDetails: {
    _id: string;
    name: string;
    image: string;
    description: string;
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
  }[];
}

export interface productDetailsType {
  _id: string;
  name: string;
  image: string;
  description: string;
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
  quantity: number;
  __v: number;
}
