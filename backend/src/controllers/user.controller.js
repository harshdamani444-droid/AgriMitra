import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { roles } from "../constants.js";

const generateAccessAndRefreshToken = async (user) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation failed", error);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from request body
  const { name, email, password, phoneNumber, role } = req.body;

  // validation - not empty
  if (!name || !email || !password || !phoneNumber || !role) {
    throw new ApiError(400, "All fields are required");
  }

  // check for valid role
  if (!roles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  // check if user already exists
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  // if avatar is present, upload it to cloudinary
  const avatarLocalPath = req?.files?.avatar?.[0]?.path || null;
  let avatarResponse;
  if (avatarLocalPath) {

    avatarResponse = await uploadOnCloudinary(avatarLocalPath);

  }

  // create user object and save it to database
  const user = await User.create({
    name,
    email,
    password,
    phoneNumber,
    avatar: avatarResponse?.secure_url || null,
  });

  // generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );

  // remove password from response
  const userResponse = {
    ...user.toJSON(),
    password: undefined,
    accessToken,
    refreshToken,
  };

  // set cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  // send response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, userResponse, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user details from request body
  const { email, password } = req.body;

  // validation - not empty
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // find user by email
  const user = await User.findOne({ email });

  // check if user exists
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // compare password
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  // generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );

  // set cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  // send response
  const userResponse = {
    ...user.toJSON(),
    password: undefined,
    accessToken,
    refreshToken,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, userResponse, "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  // get user from request
  const user = req.user;

  // remove access and refresh tokens
  user.accessToken = null;
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });

  // clear cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  // send response
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // get user from request
  const user = req.user;

  const userResponse = {
    ...user.toJSON(),
    password: undefined,
  };

  // send response
  return res
    .status(200)
    .json(
      new ApiResponse(200, userResponse, "User details fetched successfully")
    );
});

const updateAvatar = asyncHandler(async (req, res) => {
  // check if avatar is present
  if (!req?.files?.avatar?.[0]?.path) {
    throw new ApiError(400, "Avatar is required");
  }

  // get user from request
  const user = req.user;

  // upload avatar to cloudinary
  const avatarLocalPath = req?.files?.avatar?.[0]?.path;
  const avatarResponse = await uploadOnCloudinary(avatarLocalPath);

  // update user avatar
  user.avatar = avatarResponse.secure_url;
  await user.save({ validateBeforeSave: false });

  const userResponse = {
    ...user.toJSON(),
    password: undefined,
  };

  // send response
  return res
    .status(200)
    .json(new ApiResponse(200, userResponse, "Avatar updated successfully"));
});

export { registerUser, loginUser, logoutUser, getCurrentUser, updateAvatar };
