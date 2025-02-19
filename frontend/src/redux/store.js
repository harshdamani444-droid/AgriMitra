import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/Product/GetAllProductsSlice';
import getProductDetailsreducer from './slices/Product/ProductDetailSlice';
import cartReducer from './slices/Cart/GetCart';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        productDetails: getProductDetailsreducer,
        cartItems: cartReducer,

    },
});

export default store;
