import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendMail } from "../utils/sendMail.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/product.model.js";
import { CROP_CATEGORY, UNIT_OF_SIZE } from "../constants.js";

const createProduct = asyncHandler(async (req, res) => {
  // get farmName, description, price, category, quantity, size, unitOfSize, address
  let {
    farmName,
    description,
    price,
    category,
    quantity,
    size,
    unitOfSize,
    address,
  } = req.body;

  // check if not empty
  if (
    !farmName ||
    !price ||
    !category ||
    !quantity ||
    !size ||
    !unitOfSize ||
    !address
  ) {
    throw new ApiError(400, "Please fill in all fields");
  }

  // check address
  address = JSON.parse(address);
  if (
    !address.houseNo ||
    !address.street ||
    !address.city ||
    !address.state ||
    !address.pinCode
  ) {
    throw new ApiError(400, "Please fill in all address fields");
  }

  // check if category is valid
  if (!CROP_CATEGORY.includes(category)) {
    throw new ApiError(400, "Invalid category");
  }

  // check if unitOfSize is valid
  if (!UNIT_OF_SIZE.includes(unitOfSize)) {
    throw new ApiError(400, "Invalid unit of size");
  }

  // get images from req.files
  const images = req.files.images;

  if (!images) {
    throw new ApiError(400, "Please upload images");
  }

  const imagePath = images.map((image) => image.path);

  // upload images to cloudinary
  const imageURL = await Promise.all(
    imagePath.map(async (image) => await uploadOnCloudinary(image))
  );

  if (!imageURL || imageURL.length === 0) {
    throw new ApiError(500, "Failed to upload images");
  }

  // create product
  const product = await Product.create({
    farmer: req.user._id,
    farmName,
    description: description || "",
    price,
    category,
    quantity,
    size,
    unitOfSize,
    address,
    images: imageURL.map((res) => res.url),
  });

  // return product
  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Product created successfully",
      data: product,
    })
  );
});

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "All products",
      data: products,
    })
  );
});

const getProductByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!CROP_CATEGORY.includes(category)) {
    throw new ApiError(400, "Invalid category");
  }

  const products = await Product.find({ category });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: `All products by ${category}`,
      data: products,
    })
  );
});

const getProductBetweenPriceRange = asyncHandler(async (req, res) => {
  const { min, max } = req.body;

  if (!min || !max) {
    throw new ApiError(400, "Please provide min and max price");
  }

  if (min > max) {
    throw new ApiError(400, "Invalid price range");
  }

  const products = await Product.find({ price: { $gte: min, $lte: max } });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: `All products between ${min} and ${max}`,
      data: products,
    })
  );
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Product",
      data: product,
    })
  );
});

const getProductByFarmer = asyncHandler(async (req, res) => {
  const { farmerId } = req.params;

  const products = await Product.find({ farmer: farmerId });

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Products by farmer",
      data: products,
    })
  );
});

const deleteProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.deleteOne({
    _id: id,
    farmer: req.user._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Product deleted successfully",
      data: null,
    })
  );
});

const updateProductById = asyncHandler(async (req, res) => {
  let {
    farmName,
    description,
    price,
    category,
    quantity,
    size,
    unitOfSize,
    address,
  } = req.body;

  // check address
  if (address) {
    address = JSON.parse(address);
    if (
      !address.houseNo ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pinCode
    ) {
      throw new ApiError(400, "Please fill in all address fields");
    }
  }

  // check if category is valid
  if (category && !CROP_CATEGORY.includes(category)) {
    throw new ApiError(400, "Invalid category");
  }

  // check if unitOfSize is valid
  if (unitOfSize && !UNIT_OF_SIZE.includes(unitOfSize)) {
    throw new ApiError(400, "Invalid unit of size");
  }

  // create product
  const product = await Product.create({
    farmer: req.user._id,
    farmName,
    description: description || "",
    price,
    category,
    quantity,
    size,
    unitOfSize,
    address,
    images: imageURL.map((res) => res.url),
  });

  // return product
  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Product created successfully",
      data: product,
    })
  );
});

export {
  createProduct,
  getAllProduct,
  getProductByCategory,
  getProductBetweenPriceRange,
  getProductById,
  getProductByFarmer,
  deleteProductById,
  updateProductById,
};
