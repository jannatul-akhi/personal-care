"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
   const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button 
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                isLogin
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                !isLogin
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

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="E-mail or Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-gray-600 underline hover:text-green-700"
                >
                  Lost your password?
                </a>
              </div>

              <button
                onClick={() => router.push("/account")}
                type="button"
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors cursor-pointer"
              >
                Login
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
              <a href="#" className="underline hover:text-green-700">
                privacy policy
              </a>
              .
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-gray-600 underline hover:text-green-700"
                >
                  Lost your password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Create Account
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
