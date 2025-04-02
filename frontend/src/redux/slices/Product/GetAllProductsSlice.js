import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getProducts = createAsyncThunk(
    "getProducts",
    async ({ search, category, sort, page, minPrice, maxPrice }, thunkAPI) => {

        let url = ``;
        if (search !== "") {
            console.log("search", search);
            url += `?search=${search}`;
        }
        if (category !== "") {
            // console.log("category", category);
            if (url === "") {
                url += `?category=${category}`;
            }
            else {
                url += `&category=${category}`;
            }
        }
        if (sort !== "") {

            if (url === "") {
                url += `?sort=${sort}`;
            } else {

                url += `&sort=${sort}`;
            }
        }
        if (minPrice !== "") {
            console.log("minPrice", minPrice);
            if (url === "") {
                url += `?price[gte]=${minPrice}`;
            } else {
                url += `&price[gte]=${minPrice}`;
            }
        }
        if (maxPrice !== "") {
            console.log("maxPrice", maxPrice);
            if (url === "") {
                url += `?price[lte]=${maxPrice}`;
            } else {
                url += `&price[lte]=${maxPrice}`;
            }
        }



        if (url === "") {
            url += `?page=${page}`;
        }
        else {
            url += `&page=${page}`;
        }
        const response = await axios.get(`${API_URL}/product/get-all-product${url}`);
        // console.log(response);
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
        totalProducts: 0,
        currentPage: "1",
        totalPages: 0,
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.totalProducts = action.payload.totalProducts;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default productSlice.reducer;
