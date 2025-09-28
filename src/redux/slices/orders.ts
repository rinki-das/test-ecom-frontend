import { axiosInstance } from "@/services/axios";
import { dispatch } from "../store";
import { placeOrdersType } from "@/types/ordersTypes";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosErrorResponse } from "@/types/errroHandleTypes";
import errorHandle from "@/services/errorHandle";

interface placeOrdersPayloadType {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  subTotal: number;
  shipping: string;
  tax: number;
  productIds: string[];
}

interface stateProps {
  isLoading: boolean;
  error: null | string;
  placeOrders: placeOrdersType;
}

const initialState: stateProps = {
  isLoading: false,
  error: null,
  placeOrders: {
    success: false,
    message: "",
    deliveryDetails: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    },
    priceDetails: {
      subTotal: 0,
      taxAmount: 0,
      shipping: "",
      total: 0,
    },
    productsDetails: [
      {
        _id: "",
        name: "",
        image: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
        features: [],
        rating: 0,
        reviewCount: 0,
        inStock: false,
        tags: [],
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
    ],
  },
};

const slice = createSlice({
  name: "orders",
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

    // PLACE ORDERS SUCCESS
    placeOrdersSuccess(state, action) {
      state.isLoading = false;
      state.placeOrders = action.payload.data;
    },
  },
});

// Reducer
export default slice.reducer;

// Get all orders
export const placeOrder = (bodyPayload: placeOrdersPayloadType) => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance().post("/place-orders", bodyPayload);
    // console.log(response?.data, "placeOrder res hlo ===========");

    dispatch(
      slice.actions.placeOrdersSuccess({
        data: response?.data,
      })
    );
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    errorHandle({ error: axiosError, label: "placeOrder API Error:" });
    dispatch(
      slice.actions.hasError(axiosError.message || "Something went wrong")
    );
  }
};
