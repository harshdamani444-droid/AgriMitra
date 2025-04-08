import mongoose from "mongoose";
import { CROP_CATEGORY, UNIT_OF_SIZE } from "../constants.js";

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    farmName: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      required: true,
    },
    unitOfSize: {
      type: String,
      enum: UNIT_OF_SIZE,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: CROP_CATEGORY,
      required: true,
    },
    address: {
      houseNo: {
        type: String,
        trim: true,
      },
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      pinCode: {
        type: String,
        trim: true,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
      select: false // hide by default when querying
    },
  },
  {
    timestamps: true,
  }
);

// GLOBAL QUERY FILTER MIDDLEWARE FOR SOFT DELETE
function autoExcludeDeleted(next) {
  if (!this.getFilter().hasOwnProperty("isDeleted")) {
    this.where({ isDeleted: false });
  }
  next();
}

productSchema.pre("find", autoExcludeDeleted);
productSchema.pre("findOne", autoExcludeDeleted);
productSchema.pre("findOneAndUpdate", autoExcludeDeleted);
productSchema.pre("countDocuments", autoExcludeDeleted);
productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
});

export const Product = mongoose.model("Product", productSchema);
