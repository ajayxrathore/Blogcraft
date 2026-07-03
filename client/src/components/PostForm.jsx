import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "./index";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await api.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.blog?._id) {
        navigate(`/post/${response.data.blog._id}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error creating the blog:",
        error.response?.data || error.message,
      );
      alert(
        error.response?.data?.message ||
          "Something went wrong while saving the post.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto py-6"
    >
      <div className="lg:col-span-2 space-y-6 bg-white border border-neutral-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div>
          <Input
            label="Post Title"
            placeholder="Enter an engaging title..."
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />
          {errors.title && (
            <p className="text-xs font-medium text-red-600 mt-1.5 pl-0.5">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="inline-block text-sm font-medium text-neutral-700 pl-0.5">
            Content
          </label>
          <textarea
            placeholder="Write your story here (Minimum 50 characters)..."
            rows="14"
            className="w-full px-4 py-3 rounded-lg bg-neutral-50/50 text-neutral-900 placeholder-neutral-400 border border-neutral-300 outline-none transition-all duration-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:bg-white text-base resize-y min-h-75"
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 50,
                message: "Content must be at least 50 characters",
              },
            })}
          />
          {errors.content && (
            <p className="text-xs font-medium text-red-600 mt-1.5 pl-0.5">
              {errors.content.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6 bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm sticky top-24">
        <div>
          <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer"
            {...register("image", { required: "Blog image is required" })}
          />
          {errors.image && (
            <p className="text-xs font-medium text-red-600 mt-1.5 pl-0.5">
              {errors.image.message}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-neutral-100">
          <Button
            type="submit"
            className="w-full py-3 shadow-sm text-sm font-semibold tracking-wide"
          >
            Publish Post
          </Button>
        </div>
      </div>
    </form>
  );
}
