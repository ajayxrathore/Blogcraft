import { env } from "../config/env.js";
import { User } from "../model/user.model.js";
import { generateAccessAndRefreshToken } from "../service/token.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteCloudinaryFile,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email address already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(500, "we got a  error while creating user ");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );
  const options = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "none",
  };
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "User created Successfully", user: createdUser });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  const options = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "none",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User logged in successfully",
      user: loggedInUser,
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "none",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User is logged out",
    });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      env.JWT_REFRESH_SECRET,
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is either expired or used");
    }
    const options = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "none",
    };
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Access Token Refreshed",
        accessToken,
        refreshToken: refreshToken,
      });
  } catch (error) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Both passwords are required");
  }
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old Password is Wrong");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json("Password Changed Successfully");
});

export const updateAccount = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({
    email,
    _id: {
      $ne: req.user._id,
    },
  });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        name,
        email: email,
      },
    },
    {
      new: true,
    },
  ).select("-password");
  return res.status(200).json({
    message: "Account update successfully",
    user,
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});
