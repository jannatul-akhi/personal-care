/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useSignUpMutation } from "@/redux/api/auth/authApi";
import { useMergeCartMutation } from "@/redux/api/cart/cartApi";
import { resetGuestCart } from "@/redux/features/cart/cartSlice";
import { setUser } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

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
  const [signUp, { isLoading }] = useSignUpMutation();
  const [mergeCart] = useMergeCartMutation();
  const dispatch = useDispatch();
  const guestCartId = useSelector((state: RootState) => state.cart?.guestCartId);
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
    console.log("Form Data:", data);

    // Add role to the payload
    const payload = {
      ...data,
      role: "INDIVIDUAL",
    };

    try {
      const response = await signUp(payload).unwrap();
      if (response?.success) {
        toast.success(response.message || "Registration successful");

        // Auto-login logic
        if (response.data?.token && response.data?.user) {
          Cookies.set("auth_token", response.data.token);
          dispatch(setUser(response));

          // Merge guest cart if exists
          if (guestCartId) {
            try {
              await mergeCart({ guestCartId }).unwrap();
              dispatch(resetGuestCart());
            } catch (mergeError) {
              console.error("Cart merge during registration failed:", mergeError);
            }
          }

          router.push("/");
        } else {
          router.push("/login");
        }
      }
    } catch (error: any) {
      console.error("Error during sign up:", error);
      toast(error?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="w-full lg:min-w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="flex items-center gap-4">
          {/* First Name Input */}
          <CustomInput
            id="firstName"
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          {/* Last Name Input */}
          <CustomInput
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        {/* Company Email Input */}
        <CustomInput
          id="email"
          type="email"
          label="Email Address"
          placeholder="example@company.com"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password Input */}
        <CustomInput
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••••"
          showPasswordToggle={true}
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Confirm Password Input */}
        <CustomInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••••"
          showPasswordToggle={true}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* Sign Up Button */}
        <PrimaryButton type="submit" loading={isLoading} text="Sign Up" />
      </form>

      {/* Login Link */}
      <div className="text-center mb-3 mt-3 text-sm text-gray-600">
        Are you an individual?{" "}
        <Link href="/signIn" className="text-primary hover:underline">
          Sign In as an Individual!
        </Link>
      </div>
    </div>
  );
}
