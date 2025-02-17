import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";

const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ owner: req.user._id });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    return res.status(200).json(new ApiResponse({
        statusCode: 200,
        data: cart,
        message: "Cart fetched successfully"
    }));
});

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        throw new ApiError(400, "productId and quantity are required");
    }

    const cart = await Cart.findOne({ owner: req.user._id });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    let productExists = false;
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].product.toString() === productId) {
            productExists = true;
            cart.products[i].quantity += quantity;
        }
    }

    if(!productExists) {
        cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    return res.status(200).json(new ApiResponse({
        statusCode: 200,
        data: cart,
        message: "Product added to cart successfully"
    }));
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        throw new ApiError(400, "productId is required");
    }

    const cart = await Cart.findOne({ owner: req.user._id });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.products = cart.products.filter(product => product.product.toString() !== productId);
    await cart.save();

    return res.status(200).json(new ApiResponse({
        statusCode: 200,
        data: cart,
        message: "Product removed from cart successfully"
    }));
});

const updateQuantityOfProduct = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        throw new ApiError(400, "productId and quantity are required");
    }

    const cart = await Cart.findOne({ owner: req.user._id });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].product.toString() === productId) {
            cart.products[i].quantity = quantity;
        }
    }

    await cart.save();
    return res.status(200).json(new ApiResponse({
        statusCode: 200,
        data: cart,
        message: "Product quantity updated successfully"
    }));
});

export { getCart, addToCart, removeFromCart, updateQuantityOfProduct };