import { Blog } from "../model/blog.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  deleteCloudinaryFile,
} from "../utils/cloudinary.js";

export const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }
  const imagePath = req.file?.path;
  if (!imagePath) {
    throw new ApiError(400, "Blog image is required");
  }
  const uploadedImage = await uploadOnCloudinary(imagePath);
  if (!uploadedImage) {
    throw new ApiError(500, "Failed to upload image");
  }
  let blog;
  try {
    blog = await Blog.create({
      title,
      content,
      image: uploadedImage.secure_url,
      author: req.user._id,
    });
  } catch (error) {
    await deleteCloudinaryFile(uploadedImage.secure_url);
    console.error(error);
    throw new ApiError(500, error.message || "Couldn't create Blog");
  }
  return res.status(201).json({
    message: "Blog was created",
    blog,
  });
});

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name email avatar")
    .sort({ createdAt: -1 });
  return res.status(200).json({
    message: "Blogs fetched successfully",
    blogs,
  });
});

export const blogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.blogId).populate(
    "author",
    "name email avatar",
  );
  if (!blog) {
    throw new ApiError(404, "No blog found");
  }
  return res.status(200).json({
    message: "blog fetched successfully",
    blog,
  });
});

export const getMyBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({
    author: req.user._id,
  }).sort({ createdAt: -1 });
  return res.status(200).json({
    message: "Blogs fetched successfully",
    blogs,
  });
});
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
  if (blog.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Forbidden");
  }
  const image = blog.image;
  await blog.deleteOne();
  if (image) {
    await deleteCloudinaryFile(image);
  }
  return res.status(200).json({
    message: "Blog was deleted",
  });
});
