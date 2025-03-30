import mongoose from "mongoose";
import { ORDER_STATUS } from "../constants.js";

const orderSchema = new mongoose.Schema({
  paymentInfo: {},
  shippingInfo: {},
  shippingPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ORDER_STATUS,
    default: "Pending",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
