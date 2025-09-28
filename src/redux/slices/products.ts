import { axiosInstance } from "@/services/axios";
import { dispatch } from "../store";
import { ProductType } from "@/types/ProductTypes";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosErrorResponse } from "@/types/errroHandleTypes";
import errorHandle from "@/services/errorHandle";

interface stateProps {
  isLoading: boolean;
  error: null | string;
  products: ProductType[];
}

const initialState: stateProps = {
  isLoading: false,
  error: null,
  products: [],
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload.data;
    },
  },
});

// Reducer
export default slice.reducer;

// Export the actions
// export const {updateUserBalance} = slice.actions;

// Get all products
export const getAllProducts = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance().get("/products");
    // console.log(response?.data?.products, "getAllProducts res hlo ===========");

    dispatch(
      slice.actions.getProductsSuccess({
        data: response?.data?.products,
      })
    );
    return response?.data?.products;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    errorHandle({ error: axiosError, label: "getAllProducts API Error:" });
    dispatch(
      slice.actions.hasError(axiosError.message || "Something went wrong")
    );
  }
};
