import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.aggregate([
    {
      $match: { owner: req.user._id },
    },
    {
      $lookup: {
        from: "products",
        localField: "products.product",
        foreignField: "_id",
        as: "products_detail",
        pipeline: [
          {
            $project: {
              _id: 1,
              farmName: 1,
              description: 1,
              price: 1,
              size: 1,
              unitOfSize: 1,
              images: 1,
            }
          }
        ]
      },
    },
  ]);

  if (!cart || cart.length === 0) {
    cart = await Cart.create({ owner: req.user._id });
  }

  cart = cart[0];


  cart.products.map((product, i) => {
    product.farmName = cart.products_detail[i].farmName;
    product.images = cart.products_detail[i].images;
    product.description = cart.products_detail[i].description;
    product.price = cart.products_detail[i].price;
    product.size = cart.products_detail[i].size;
    product.unitOfSize = cart.products_detail[i].unitOfSize;
  })

  cart.products_detail = undefined;

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: cart,
      message: "Cart fetched successfully",
    })
  );
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    throw new ApiError(400, "productId and quantity are required");
  }

  let cart = await Cart.findOne({ owner: req.user._id });

  if (!cart) {
    cart = await Cart.create({ owner: req.user._id });
  }

  let productExists = false;
  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].product.toString() === productId) {
      productExists = true;
      const product = await Product.findById(productId);
      if (cart.products[i].quantity + quantity > product.quantity) {
        throw new ApiError(400, `Only ${product.quantity} items are available`);
      }
      cart.products[i].quantity += quantity;
    }
  }

  if (!productExists) {
    const product = await Product.findById(productId);
    if (quantity > product.quantity) {
      throw new ApiError(400, `Only ${product.quantity} items are available`);
    }
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: cart,
      message: "Product added to cart successfully",
    })
  );
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

  cart.products = cart.products.filter(
    (product) => product.product.toString() !== productId
  );
  await cart.save();

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: cart,
      message: "Product removed from cart successfully",
    })
  );
});

const updateQuantityOfProduct = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    throw new ApiError(400, "productId and quantity are required");
  }

  let cart = await Cart.findOne({ owner: req.user._id });

  if (!cart) {
    cart = await Cart.create({ owner: req.user._id });
  }

  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].product.toString() === productId) {
      const product = await Product.findById(productId);
      if (quantity > product.quantity) {
        throw new ApiError(400, `Only ${product.quantity} items are available`);
      }
      cart.products[i].quantity = quantity;
    }
  }

  await cart.save();
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: cart,
      message: "Product quantity updated successfully",
    })
  );
});

export { getCart, addToCart, removeFromCart, updateQuantityOfProduct };
