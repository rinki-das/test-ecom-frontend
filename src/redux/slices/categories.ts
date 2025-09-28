import { axiosInstance } from "@/services/axios";
import { dispatch } from "../store";
import { Category } from "@/types/CategoryType";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosErrorResponse } from "@/types/errroHandleTypes";
import errorHandle from "@/services/errorHandle";

interface stateProps {
  isLoading: boolean;
  error: null | string;
  categories: Category[];
}

const initialState: stateProps = {
  isLoading: false,
  error: null,
  categories: [],
};

const slice = createSlice({
  name: "categories",
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
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload.data;
    },
  },
});

// Reducer
export default slice.reducer;

// Get all categories
export const getAllCategories = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance().get("/categories");
    // console.log(response?.data?.categories, "getAllCategories res hlo ===========");

    dispatch(
      slice.actions.getCategoriesSuccess({
        data: response?.data?.categories,
      })
    );
    return response?.data?.categories;
  } catch (error) {
    const axiosError = error as AxiosErrorResponse;
    errorHandle({ error: axiosError, label: "getAllCategories API Error:" });
    dispatch(
      slice.actions.hasError(axiosError.message || "Something went wrong")
    );
  }
};
