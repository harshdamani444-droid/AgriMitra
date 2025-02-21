import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios
        .get(`${API_URL}/cart/get-cart`, {
          withCredentials: true,
        })
        .then((res) => res.data);

      return response?.data?.products || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/cart/add-to-cart`,
        { productId, quantity },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding to cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      console.log(productId);
      await axios.delete(`${API_URL}/cart/remove-from-cart`, {
        data: { productId },
        withCredentials: true,
      });

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error removing from cart"
      );
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await axios.patch(
        `${API_URL}/cart/update-quantity`,
        { productId, quantity },
        { withCredentials: true }
      );

      return { productId, quantity };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error updating quantity"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    // Get Cart
    builder.addCase(getCartProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getCartProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add to Cart
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    // Remove from Cart
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    });

    // Update Quantity
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((p) => p._id === productId);
      if (product) product.quantity = quantity;
    });
  },
});
export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
