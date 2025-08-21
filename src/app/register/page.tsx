/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export type UserData = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: UserData) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/register", data);
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="my-10 w-[90%] mx-auto">
      <h1 className="text-center text-4xl font-bold mb-5">
        Register <span className="text-teal-500">Now</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Illustration */}
        <div>
          <Image
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg"
            alt="register illustration"
            width={500}
            height={300}
            className="w-full h-[85%] object-cover rounded-lg shadow"
          />
        </div>

        {/* Form */}
        <div className="w-[80%] mx-auto bg-white p-6 shadow-lg rounded-lg">
          {message && (
            <p
              className={`text-center mb-4 font-semibold ${message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("username", { required: "Full Name is required" })}
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.username && (
                <p className="text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                placeholder="example@mail.com"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="********"
                className="w-full p-3 border border-gray-300 rounded"
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-500 hover:underline">
                Login
              </Link>
            </p>
          </form>

          {/* Social Login */}
          <p className="text-center mt-6 text-sm text-gray-500">Or Register Using</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => handleSocialRegister("google")}
              className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
            >
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={30}
                height={30}
                alt="Google logo"
              />
            </button>
            <button
              onClick={() => handleSocialRegister("github")}
              className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={25}
                height={25}
                alt="GitHub logo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
