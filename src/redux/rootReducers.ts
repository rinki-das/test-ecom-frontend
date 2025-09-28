import { combineReducers } from "redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import products from "./slices/products";
import orders from "./slices/orders";
import categories from "./slices/categories";

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  keyPrefix: "redux-",
  blacklist: [],
  // whitelist: [],
};

const rootReducer = combineReducers({
  // Slice
  products: products,
  orders: orders,
  categories: categories,
});

export { rootReducer, rootPersistConfig };
