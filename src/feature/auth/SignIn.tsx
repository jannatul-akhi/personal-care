/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import Container from "@/lib/Container";
import { useSignInMutation } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/user/userSlice";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [signIn, { isLoading }] = useSignInMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signIn(data).unwrap();
      if (response?.success) {
        if (response.data.verify) {
          Cookies.set("token", response.data.accessToken);
          dispatch(
            setUser({
              token: response.data.accessToken,
            })
          );
          toast.success("Login successful");
          router.push("/");
        } else {
          router.push("/otp");
        }
      }
    } catch (error: any) {
      console.log("Error during sign-in:", error);
      return toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 mb-20">
        
        {/* Toggle Login/Register */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-full flex items-center w-full max-w-[320px]">
            <button 
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-all ${
                activeTab === "login" 
                  ? "bg-white text-[#4a6741] shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Log in
            </button>
            <button 
              onClick={() => router.push("/signUp")}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-all ${
                activeTab === "register" 
                  ? "bg-white text-[#4a6741] shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Logo and Welcome Text */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/Logo.png"
              alt="Healthy Plus"
              width={140}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-3">
            Welcome Back!
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed px-4">
            We're excited to welcome you, to our online shop. Your arrival marks of something great.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1">
            <input
              id="email"
              type="email"
              placeholder="E-mail or Phone Number"
              {...register("email")}
              className={`w-full px-5 py-4 bg-white border rounded-xl outline-none transition-all text-[15px] ${
                errors.email ? "border-red-500" : "border-gray-100 focus:border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full px-5 py-4 bg-white border rounded-xl outline-none transition-all text-[15px] ${
                errors.password ? "border-red-500" : "border-gray-100 focus:border-gray-300"
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>}
          </div>

          {/* Remember Me and Lost Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 rounded border-gray-300 text-[#4a6741] focus:ring-[#4a6741]"
              />
              <span className="text-sm text-gray-400 font-medium group-hover:text-gray-600 transition-colors">
                Remember me
              </span>
            </label>
            <Link
              href="/forget-password"
              className="text-sm text-gray-400 font-bold hover:text-gray-600 transition-colors border-b border-gray-300 hover:border-gray-600"
            >
              Lost your password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5c723d] hover:bg-[#4a5c31] text-white py-4 rounded-full font-bold text-lg mt-8 transition-all transform active:scale-[0.98] shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
