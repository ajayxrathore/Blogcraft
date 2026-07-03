import React, { useState } from "react";
import authService from "../services/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const registerUser = async (data) => {
    setError("");
    try {
      const response = await authService.register(data);
      if (response) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 border border-neutral-100 shadow-md transition-all duration-300">
        <div className="mb-6 flex justify-center">
          <span className="inline-block transition-transform duration-200 hover:scale-105">
            <Logo width="80px" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold tracking-tight text-neutral-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-500">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-neutral-900 transition-colors duration-200 hover:text-neutral-700 hover:underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <div className="mt-6 p-3.5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(registerUser)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: true,
              })}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full py-3">
                Create Account
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
