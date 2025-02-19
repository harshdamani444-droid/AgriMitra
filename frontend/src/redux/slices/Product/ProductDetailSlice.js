import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;


export const getProductDetails = createAsyncThunk(
    "getProductDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/product/get-product-by-id/${id}`);
            return response.data.data;
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);


const getProductDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: {},
        loading: true,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload; // Correctly setting the product
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Show meaningful error messages
            });
    },
});

export default getProductDetailsSlice.reducer;

