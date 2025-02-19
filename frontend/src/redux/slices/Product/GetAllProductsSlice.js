import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getProducts = createAsyncThunk(
    "getProducts",
    async (thunkAPI) => {
        const response = await axios.get(`${API_URL}/product/get-all-product`);
        try {
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: true,
        error: null,
        // resultPerPage: 0,
        // productsCount: 0,
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            // state.resultPerPage = action.payload.resultPerPage;
            // state.productsCount = action.payload.productsCount;

        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default productSlice.reducer;
