"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignInMutation, useSignUpMutation } from "@/redux/api/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user/userSlice";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Zod schemas
const loginSchema = z.object({
  identifier: z.string().min(1, "Email or Phone Number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(11, "Include your phone number"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  // RTK Query hooks
  const [signIn, { isLoading: isLoggingIn }] = useSignInMutation();
  const [signUp, { isLoading: isRegistering }] = useSignUpMutation();

  // Forms
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const {
    register: registerFormRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: LoginValues) => {
    try {
      const response = await signIn(data).unwrap();
      if (response?.success) {
        // Set cookie and Redux state
        Cookies.set("auth_token", response.data.token, { expires: data.rememberMe ? 30 : undefined });
        dispatch(setUser(response));

        toast.success(response.message || "Login successful");
        router.push("/"); // Redirect to home or intended page
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const onRegisterSubmit = async (data: RegisterValues) => {
    try {
      const { confirmPassword, ...payload } = data;
      const response = await signUp(payload).unwrap();
      if (response?.success) {
        toast.success(response.message || "Registration successful");
        if (response.data.requiresVerification) {
          router.push("/otp"); // Assuming verification is needed
        } else {
          setIsLogin(true); // Switch to login
        }
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isLogin
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Log in
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${!isLogin
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-1">
            <svg
              className="w-8 h-8 text-green-700"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">HP</span>
          </div>
        </div>

        {/* Login Form */}
        {isLogin && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-500 text-center text-sm mb-6">
              We're excited to welcome you, to our online shop.
              <br />
              Your arrival marks of something great.
            </p>

            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <input
                  {...loginRegister("identifier")}
                  type="text"
                  placeholder="E-mail or Phone Number"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${loginErrors.identifier ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {loginErrors.identifier && (
                  <p className="text-red-500 text-xs mt-1">{loginErrors.identifier.message}</p>
                )}
              </div>

              <div>
                <input
                  {...loginRegister("password")}
                  type="password"
                  placeholder="Password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${loginErrors.password ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {loginErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{loginErrors.password.message}</p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    {...loginRegister("rememberMe")}
                    type="checkbox"
                    className="rounded border-gray-300"
                  />
                  Remember me
                </label>
                <Link
                  href="/forget-password"
                  className="text-gray-600 underline hover:text-green-700"
                >
                  Lost your password?
                </Link>
              </div>

              <button
                disabled={isLoggingIn}
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors cursor-pointer disabled:bg-green-400"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </form>
          </>
        )}

        {/* Registration Form */}
        {!isLogin && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Create An Account
            </h2>
            <p className="text-gray-500 text-center text-sm mb-6">
              Your personal data will be used to support
              <br />
              your experience throughout this website{" "}
              <Link href="/privacy-policy" className="underline hover:text-green-700">
                privacy policy
              </Link>
              .
            </p>

            <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
              <div>
                <input
                  {...registerFormRegister("name")}
                  type="text"
                  placeholder="Name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${registerErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {registerErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{registerErrors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  {...registerFormRegister("phone")}
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${registerErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {registerErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{registerErrors.phone.message}</p>
                )}
              </div>

              <div>
                <input
                  {...registerFormRegister("email")}
                  type="email"
                  placeholder="Email Address"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${registerErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {registerErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{registerErrors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  {...registerFormRegister("password")}
                  type="password"
                  placeholder="Password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${registerErrors.password ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {registerErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{registerErrors.password.message}</p>
                )}
              </div>

              <div>
                <input
                  {...registerFormRegister("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${registerErrors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {registerErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{registerErrors.confirmPassword.message}</p>
                )}
              </div>

              <button
                disabled={isRegistering}
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:bg-green-400"
              >
                {isRegistering ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

