import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product"
                }
            }
        ]
    }
);

export const Wishlist = mongoose.model("wishlist", wishlistSchema);
