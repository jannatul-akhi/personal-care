/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useSignUpMutation } from "@/redux/api/auth/authApi";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useState } from "react";

// Define Zod schema for validation
const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Please enter a valid company email address" })
      .min(1, { message: "Company email is required" }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long" })
      .min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    localStorage.setItem("email", data.email);
    const { confirmPassword, ...rest } = data;
    const payload = {
      ...rest,
      role: "INDIVIDUAL",
    };

    try {
      const response = await signUp(payload).unwrap();
      if (response?.success) {
        toast.success("Registration successful! Please verify your email.");
        router.push("/otp");
      }
    } catch (error: any) {
      console.error("Error during sign up:", error);
      toast.error(error?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 mb-20">
        
        {/* Toggle Login/Register */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1.5 rounded-full flex items-center w-full max-w-[320px]">
            <button 
              onClick={() => router.push("/signIn")}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-bold transition-all ${
                activeTab === "login" 
                  ? "bg-white text-[#4a6741] shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Log in
            </button>
            <button 
              onClick={() => setActiveTab("register")}
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

        {/* Logo and Header Text */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/Logo.png"
              alt="Healthy Plus"
              width={140}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-4">
            Create An Account
          </h1>
          <p className="text-[13px] text-gray-400 leading-relaxed max-w-[340px] mx-auto">
            Your personal data will be used to support your experience throughout this website <Link href="/privacy" className="underline hover:text-gray-600 transition-colors">privacy policy</Link>.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field (Combined for this design) */}
          <div className="space-y-1">
            <input
              id="name"
              type="text"
              placeholder="Name"
              {...register("firstName")}
              className={`w-full px-5 py-4 bg-white border rounded-xl outline-none transition-all text-[15px] ${
                errors.firstName ? "border-red-500" : "border-gray-100 focus:border-gray-300"
              }`}
            />
          </div>

          {/* Phone Number Field */}
          <div className="space-y-1">
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-gray-300 transition-all text-[15px]"
            />
          </div>

          {/* Email Address Field */}
          <div className="space-y-1">
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className={`w-full px-5 py-4 bg-white border rounded-xl outline-none transition-all text-[15px] ${
                errors.email ? "border-red-500" : "border-gray-100 focus:border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
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
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={`w-full px-5 py-4 bg-white border rounded-xl outline-none transition-all text-[15px] ${
                errors.confirmPassword ? "border-red-500" : "border-gray-100 focus:border-gray-300"
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-[10px] ml-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Remember Me and Lost Password (Matches design) */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
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

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5c723d] hover:bg-[#4a5c31] text-white py-4 rounded-full font-bold text-lg mt-8 transition-all transform active:scale-[0.98] shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
