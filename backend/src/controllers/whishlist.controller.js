import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Wishlist } from "../models/wishlist.model.js";
import { Product } from "../models/product.model.js";

const getWishlist = asyncHandler(async (req, res) => {
    let wishlist = await Wishlist.aggregate([
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

    if (!wishlist || wishlist.length === 0) {
        wishlist = await Wishlist.create({ owner: req.user._id });
    }

    wishlist = wishlist[0];

    wishlist.products.map((product, i) => {
        product.farmName = wishlist.products_detail[i].farmName;
        product.images = wishlist.products_detail[i].images;
        product.description = wishlist.products_detail[i].description;
        product.price = wishlist.products_detail[i].price;
        product.size = wishlist.products_detail[i].size;
        product.unitOfSize = wishlist.products_detail[i].unitOfSize;
    }
    )

    wishlist.products_detail = undefined;

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            data: wishlist,
            message: "Wishlist fetched successfully",
        })
    );
}
);

const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }
    
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let wishlist = await Wishlist.findOne({ owner: req.user._id });

    if (!wishlist) {
        wishlist = await Wishlist.create({ owner: req.user._id });
    }

    if (wishlist.products.find((p) => p.product == productId)) {
        throw new ApiError(400, "Product already in wishlist");
    }

    wishlist.products.push({ product: productId });

    await wishlist.save();

    return res.status(200).json(
        new ApiResponse({
        statusCode: 200,
        data: wishlist,
        message: "Product added to wishlist",
        })
    );
}
);

const removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }

    let wishlist = await Wishlist.findOne({ owner: req.user._id });

    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    wishlist.products = wishlist.products.filter((p) => p.product != productId);

    await wishlist.save();

    return res.status(200).json(
        new ApiResponse({
        statusCode: 200,
        data: wishlist,
        message: "Product removed from wishlist",
        })
    );
}
);


export { getWishlist, addToWishlist, removeFromWishlist };