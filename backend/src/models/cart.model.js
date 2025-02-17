import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product"
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }
)

export const Cart = mongoose.model("Cart", cartSchema);