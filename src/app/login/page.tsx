"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setMessage("");

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setMessage(res.error); // Error message from NextAuth
    } else if (res?.ok) {
      setMessage("Login successful!");
      window.location.href = "/dashboard"; // Redirect after success
    }

    setLoading(false);
  };

  return (
    <div className="my-10 w-[90%] mx-auto">
      <h1 className="text-center text-4xl mb-5 font-bold">
        Login <span className="text-teal-500">Here</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Illustration */}
        <div>
          <Image
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-auto"
          />
        </div>

        {/* Login Form */}
        <div className="w-[80%] mx-auto bg-white p-6 shadow-lg rounded-lg">
          {message && (
            <p
              className={`text-center mb-4 font-semibold ${message.toLowerCase().includes("successful") ? "text-green-600" : "text-red-600"
                }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
              {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
              {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-teal-500 hover:underline">
                Create an account
              </Link>
            </p>
          </form>

          {/* Social Login */}
          <p className="text-center mt-6 text-sm text-gray-500">Or Sign In Using</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
              onClick={() =>
                signIn("google", { callbackUrl: "/dashboard" })
              }
            >
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={30}
                height={30}
                alt="Google logo"
              />
            </button>

            <button
              className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
              onClick={() =>
                signIn("github", { callbackUrl: "/dashboard" })
              }
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

export default LoginPage;
