import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

export const clientGetCategoryWiseProductAsync = createAsyncThunk(
  "client/clientGetCategoryWiseProduct",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/categoryWiseProduct/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetCategoryWiseProductAsync Error - ", error.response);
    }
  }
);

export const clientAllListedProductsAsync = createAsyncThunk(
  "client/clientAllListedProducts",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/allListedProducts/`
      );
      return response.data;
    } catch (error) {
      console.log("clientAllListedProductsAsync Error - ", error.response);
    }
  }
);

export const clientGetSingleProductAsync = createAsyncThunk(
  "client/clientGetSingleProduct",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/singleProduct/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetSingleProductAsync Error - ", error.response);
    }
  }
);

export const clientGetProductFiltersAsync = createAsyncThunk(
  "client/clientGetProductFilters",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/productFilters/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetProductFiltersAsync Error - ", error.response);
    }
  }
);

export const clientGetMenuAsync = createAsyncThunk(
  "client/clientGetMenu",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/client/product/getMenu/`);
      return response.data;
    } catch (error) {
      console.log("clientGetMenuAsync Error - ", error.response);
    }
  }
);

export const clientGetSizesFiltersAsync = createAsyncThunk(
  "client/clientGetSizesFilters",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/sizesFilters/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetSizesFiltersAsync Error - ", error.response);
    }
  }
);

const initialState = {
  categoryWiseProducts: [],
  allProducts: [],
  singleProduct: [],
  productFilters: [],
  headerMenu: [],
  sizesFilters: [],
  isLoading: false,
  isError: false,
};

export const clientProductSlice = createSlice({
  name: "clientProduct",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(clientGetCategoryWiseProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetCategoryWiseProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryWiseProducts = action.payload;
      })
      .addCase(clientGetCategoryWiseProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(clientAllListedProductsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientAllListedProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(clientAllListedProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetSingleProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetSingleProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(clientGetSingleProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetProductFiltersAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetProductFiltersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productFilters = action.payload;
      })
      .addCase(clientGetProductFiltersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.headerMenu = action.payload;
      })
      .addCase(clientGetMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetSizesFiltersAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetSizesFiltersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sizesFilters = action.payload;
      })
      .addCase(clientGetSizesFiltersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default clientProductSlice.reducer;
