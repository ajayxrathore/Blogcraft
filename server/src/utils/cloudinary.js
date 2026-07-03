import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { env } from "../config/env.js";
import ApiError from "./apiError.js";
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localpath) => {
  try {
    if (!localpath) return null;
    const response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localpath);
    return response;
  } catch (error) {
    if (fs.existsSync(localpath)) {
      fs.unlinkSync(localpath);
    }
    console.error(error);
    return null;
  }
};
const deleteCloudinaryFile = async (fileId) => {
  try {
    const url = new URL(fileId)
    const path = url.pathname;
    const publicId = path
      .split("/upload/")[1]
      .replace(/^v\d+\//, "")
      .replace(/\.[^.]+$/, "");
    return await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
    return response;
  } catch (error) {
    throw new ApiError(500, "Could not delete old file");
  }
};
export { uploadOnCloudinary, deleteCloudinaryFile };
