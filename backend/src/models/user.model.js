import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ["farmer", "buyer", "admin"],
      default: "buyer",
    },
    avatar: {
      type: String,
    },
    tokens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "discountToken",
      },
    ],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    googleVerificationStatus: {
      type: String,
      enum: ["notVerified", "profileIncomplete", "completed"],
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Middleware to hash resetPasswordToken before saving and set expiry
userSchema.pre("save", async function (next) {
  if (!this.isModified("resetPasswordToken")) return next();

  if (!this.resetPasswordToken) {
    next();
  }

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(this.resetPasswordToken)
    .digest("hex");

  this.resetPasswordTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Method to generate resetPasswordToken
userSchema.methods.generateResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
