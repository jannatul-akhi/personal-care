"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Camera, Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/redux/api/profile/profileApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user/userSlice";

// ─── Schemas ────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(6, "Phone number is required"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileValues = z.infer<typeof profileSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

// ─── Main Client Component ───────────────────────────────────────────────────

export default function AccountDetailsClient() {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── API hooks ────────────────────────────────────────────────────────────
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(
    {},
  );
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const user = profileData?.data;

  // ── Profile form ─────────────────────────────────────────────────────────
  const {
    register: regProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: "", lastName: "", phone: "" },
  });

  useEffect(() => {
    if (user) {
      resetProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
      });
      if (user.avatarUrl) setAvatarPreview(user.avatarUrl);
    }
  }, [user, resetProfile]);

  // ── Password form ────────────────────────────────────────────────────────
  const {
    register: regPass,
    handleSubmit: handlePassSubmit,
    formState: { errors: passErrors },
    reset: resetPass,
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
  });

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const onProfileSubmit = async (data: ProfileValues) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await updateProfile(formData).unwrap();
      if (res.success) {
        dispatch(setUser({ user: res.data }));
        toast.success("Profile updated successfully!");
        setAvatarFile(null);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  const onPasswordSubmit = async (data: PasswordValues) => {
    try {
      const res = await changePassword(data).unwrap();
      if (res.success) {
        toast.success(res.message || "Password changed successfully!");
        resetPass();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password.");
    }
  };

  // ── Loading state ────────────────────────────────────────────────────────
  if (isProfileLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const avatarLetter = (
    user?.firstName?.[0] ||
    user?.username?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <section className="rounded-3xl bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 space-y-10">
      <h1 className="text-xl font-semibold text-slate-900">Account Details</h1>

      {/* ── Personal Information Form ── */}
      <form
        onSubmit={handleProfileSubmit(onProfileSubmit)}
        className="space-y-6"
      >
        <h2 className="text-sm font-semibold text-slate-900">
          Personal Information
        </h2>

        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-primary flex items-center justify-center ring-2 ring-primary/20">
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {avatarLetter}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Change Photo
            </button>
            <p className="text-xs text-slate-400 mt-0.5">
              JPG, PNG or WEBP · Max 2MB
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Name */}
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Field
            label="First Name"
            placeholder="Your first name"
            error={profileErrors.firstName?.message}
            {...regProfile("firstName")}
          />
          <Field
            label="Last Name"
            placeholder="Your last name"
            error={profileErrors.lastName?.message}
            {...regProfile("lastName")}
          />
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Field
            label="Phone Number"
            placeholder="+880..."
            error={profileErrors.phone?.message}
            {...regProfile("phone")}
          />
          {/* Email — read-only, not part of form */}
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-700">
            <span>Email Address</span>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="h-10 rounded-full border border-slate-200 bg-slate-50 px-4 text-xs text-slate-500 outline-none cursor-not-allowed"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex items-center gap-2 justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <hr className="border-slate-100" />

      {/* ── Security / Password Form ── */}
      <form onSubmit={handlePassSubmit(onPasswordSubmit)} className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Security Options
        </h2>

        <PasswordField
          label="Current Password"
          placeholder="Enter current password"
          show={showCurrent}
          onToggle={() => setShowCurrent((v) => !v)}
          error={passErrors.currentPassword?.message}
          {...regPass("currentPassword")}
        />

        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <PasswordField
            label="New Password"
            placeholder="Enter new password"
            show={showNew}
            onToggle={() => setShowNew((v) => !v)}
            error={passErrors.newPassword?.message}
            {...regPass("newPassword")}
          />
          <PasswordField
            label="Confirm Password"
            placeholder="Re-enter new password"
            show={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
            error={passErrors.confirmPassword?.message}
            {...regPass("confirmPassword")}
          />

          <div className="flex items-end justify-end max-md:justify-start">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="inline-flex items-center gap-2 justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(37,99,235,0.45)] hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {isChangingPassword && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {isChangingPassword ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

// ─── Field Components ────────────────────────────────────────────────────────

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, ...props }, ref) => (
    <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-slate-700">
      <span>{label}</span>
      <input
        ref={ref}
        className={`h-10 rounded-full border px-4 text-xs text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-[10px] mt-0.5">{error}</span>
      )}
    </label>
  ),
);
Field.displayName = "Field";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  show: boolean;
  onToggle: () => void;
  error?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, show, onToggle, error, ...props }, ref) => (
    <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-slate-700">
      <span>{label}</span>
      <div className="relative">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          className={`h-10 w-full rounded-full border px-4 pr-10 text-xs text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 ${
            error ? "border-red-400" : "border-slate-200"
          }`}
          {...props}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <span className="text-red-500 text-[10px] mt-0.5">{error}</span>
      )}
    </label>
  ),
);
PasswordField.displayName = "PasswordField";
