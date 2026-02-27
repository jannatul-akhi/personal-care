"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Loader2,
  MapPin,
  Phone,
  User,
  Trash2,
  CheckCircle2,
  Home,
  Building2,
  Pencil,
  Check,
  X,
} from "lucide-react";
import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  Address,
} from "@/redux/api/address/addressApi";

// ─── Divisions ───────────────────────────────────────────────────────────────

const DIVISIONS: Record<string, string[]> = {
  Dhaka: [
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Manikganj",
    "Narsingdi",
    "Munshiganj",
    "Rajbari",
    "Faridpur",
    "Gopalganj",
    "Madaripur",
    "Shariatpur",
  ],
  Chittagong: [
    "Chittagong",
    "Cox's Bazar",
    "Comilla",
    "Feni",
    "Noakhali",
    "Lakshmipur",
    "Chandpur",
    "Brahmanbaria",
  ],
  Rajshahi: [
    "Rajshahi",
    "Chapainawabganj",
    "Natore",
    "Naogaon",
    "Pabna",
    "Sirajganj",
    "Bogra",
    "Joypurhat",
  ],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Khulna: [
    "Khulna",
    "Jessore",
    "Satkhira",
    "Bagerhat",
    "Narail",
    "Magura",
    "Jhenaidah",
    "Chuadanga",
    "Meherpur",
    "Kushtia",
  ],
  Barisal: [
    "Barisal",
    "Bhola",
    "Patuakhali",
    "Pirojpur",
    "Jhalokati",
    "Barguna",
  ],
  Rangpur: [
    "Rangpur",
    "Dinajpur",
    "Kurigram",
    "Gaibandha",
    "Nilphamari",
    "Lalmonirhat",
    "Thakurgaon",
    "Panchagarh",
  ],
  Mymensingh: ["Mymensingh", "Jamalpur", "Sherpur", "Netrokona"],
};

const ADDRESS_TYPES = ["Home", "Office", "Other"];

// ─── Add form schema ──────────────────────────────────────────────────────────

const schema = z.object({
  fullName: z.string().min(1, "Name is required"),
  phone: z.string().min(6, "Phone number is required"),
  division: z.string().min(1, "Province / Region is required"),
  city: z.string().min(1, "City is required"),
  town: z.string().optional(),
  addressLine1: z.string().min(5, "Address is required"),
  postalCode: z.string().optional(),
  isDefault: z.boolean().optional(),
  addressType: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

// ─── Inline editable field ────────────────────────────────────────────────────

type EditableFieldProps = {
  value: string;
  onSave: (val: string) => Promise<void>;
  isSaving: boolean;
  as?: "input" | "select";
  options?: string[];
  className?: string;
};

function EditableField({
  value,
  onSave,
  isSaving,
  as = "input",
  options = [],
  className = "",
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const inputRef = useRef<HTMLInputElement & HTMLSelectElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);
  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleSave = async () => {
    if (val.trim() === value) {
      setEditing(false);
      return;
    }
    await onSave(val.trim());
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setVal(value);
      setEditing(false);
    }
  };

  if (!editing) {
    return (
      <span
        onClick={() => setEditing(true)}
        className={`cursor-pointer group/edit inline-flex items-center gap-1 hover:text-primary transition-colors ${className}`}
        title="Click to edit"
      >
        {value}
        <Pencil className="w-2.5 h-2.5 opacity-0 group-hover/edit:opacity-60 transition-opacity shrink-0" />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1">
      {as === "select" ? (
        <select
          ref={inputRef as any}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-xs border border-blue-400 rounded-md px-1.5 py-0.5 outline-none bg-white text-slate-900 focus:ring-1 focus:ring-blue-200"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          ref={inputRef as any}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-xs border border-blue-400 rounded-md px-1.5 py-0.5 outline-none text-slate-900 focus:ring-1 focus:ring-blue-200 w-32"
        />
      )}
      {isSaving ? (
        <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
      ) : (
        <>
          <button
            type="button"
            onClick={handleSave}
            className="text-emerald-500 hover:text-emerald-700"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => {
              setVal(value);
              setEditing(false);
            }}
            className="text-red-400 hover:text-red-600"
          >
            <X className="w-3 h-3" />
          </button>
        </>
      )}
    </span>
  );
}

// ─── Address Card ─────────────────────────────────────────────────────────────

function AddressCard({ addr }: { addr: Address }) {
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const update = async (field: string, value: string) => {
    try {
      await updateAddress({ id: addr.id, body: { [field]: value } }).unwrap();
      toast.success("Updated!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed.");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAddress(addr.id).unwrap();
      toast.success("Address deleted.");
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  const typeIcon =
    addr.addressType === "Home" ? (
      <Home className="w-2.5 h-2.5" />
    ) : addr.addressType === "Office" ? (
      <Building2 className="w-2.5 h-2.5" />
    ) : (
      <MapPin className="w-2.5 h-2.5" />
    );

  const typeBadgeCls =
    addr.addressType === "Home"
      ? "bg-emerald-50 text-emerald-700"
      : addr.addressType === "Office"
        ? "bg-blue-50 text-blue-700"
        : "bg-slate-100 text-slate-600";

  return (
    <div
      className={`relative rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        addr.isDefault
          ? "border-primary/40 ring-1 ring-primary/20"
          : "border-slate-100"
      }`}
    >
      {/* Top badges */}
      <div className="flex items-center justify-between mb-3">
        {/* Address type — editable */}
        <EditableField
          value={addr.addressType || "Home"}
          onSave={(v) => update("addressType", v)}
          isSaving={isUpdating}
          as="select"
          options={ADDRESS_TYPES}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${typeBadgeCls}`}
        />
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${typeBadgeCls} pointer-events-none`}
        >
          {typeIcon}
          {addr.addressType}
        </span>
        {addr.isDefault && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
            <CheckCircle2 className="w-2.5 h-2.5" /> Default
          </span>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-2">
        {/* Full Name */}
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <EditableField
            value={addr.fullName}
            onSave={(v) => update("fullName", v)}
            isSaving={isUpdating}
            className="text-xs font-semibold text-slate-800"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <EditableField
            value={addr.phone}
            onSave={(v) => update("phone", v)}
            isSaving={isUpdating}
            className="text-xs text-slate-600"
          />
        </div>

        {/* Address Line */}
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-xs text-slate-600">
            <EditableField
              value={addr.addressLine1}
              onSave={(v) => update("addressLine1", v)}
              isSaving={isUpdating}
              className="text-xs text-slate-600"
            />
            {/* City */}
            <span className="text-slate-400 text-[10px]">
              City:{" "}
              <EditableField
                value={addr.city}
                onSave={(v) => update("city", v)}
                isSaving={isUpdating}
                className="text-[10px] text-slate-600"
              />
            </span>
            {/* Division */}
            <span className="text-slate-400 text-[10px]">
              Division:{" "}
              <EditableField
                value={addr.division || ""}
                onSave={(v) => update("division", v)}
                isSaving={isUpdating}
                as="select"
                options={Object.keys(DIVISIONS)}
                className="text-[10px] text-slate-600"
              />
            </span>
            {/* Postal */}
            <span className="text-slate-400 text-[10px]">
              Postal:{" "}
              <EditableField
                value={addr.postalCode || ""}
                onSave={(v) => update("postalCode", v)}
                isSaving={isUpdating}
                className="text-[10px] text-slate-600"
              />
            </span>
            {addr.country && (
              <span className="text-[10px] text-slate-400">{addr.country}</span>
            )}
          </div>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
      >
        {isDeleting ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Trash2 className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Saving indicator */}
      {isUpdating && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] text-blue-500">
          <Loader2 className="w-2.5 h-2.5 animate-spin" /> saving...
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AddressClient() {
  const { data: addressData, isLoading: isLoadingAddresses } =
    useGetAddressesQuery();
  const [createAddress, { isLoading: isAdding }] = useCreateAddressMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { isDefault: false, addressType: "Home" },
  });

  const watchDivision = watch("division");

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await createAddress({
        fullName: data.fullName,
        phone: data.phone,
        addressLine1: data.addressLine1,
        city: data.city,
        division: data.division,
        postalCode: data.postalCode || "",
        isDefault: data.isDefault || false,
        addressType: data.addressType || "Home",
      }).unwrap();
      if (res.success) {
        toast.success("Address added successfully!");
        reset();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add address.");
    }
  };

  const addresses = addressData?.data || [];

  return (
    <div className="space-y-6">
      {/* Add Form */}
      <div className="rounded-3xl bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
        <h1 className="text-xl font-semibold text-slate-900 mb-6">
          Add New Address
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <FormField label="Name" error={errors.fullName?.message}>
              <input
                {...register("fullName")}
                placeholder="Enter name"
                className={inputCls(!!errors.fullName)}
              />
            </FormField>
            <FormField label="Phone Number" error={errors.phone?.message}>
              <input
                {...register("phone")}
                placeholder="Enter phone number"
                className={inputCls(!!errors.phone)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            <FormField
              label="Province / Region"
              error={errors.division?.message}
            >
              <select
                {...register("division")}
                onChange={(e) => {
                  setValue("division", e.target.value);
                  setValue("city", "");
                }}
                className={selectCls(!!errors.division)}
              >
                <option value="">Select</option>
                {Object.keys(DIVISIONS).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="City" error={errors.city?.message}>
              <select
                {...register("city")}
                disabled={!watchDivision}
                className={selectCls(!!errors.city)}
              >
                <option value="">Select</option>
                {(DIVISIONS[watchDivision] || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Town">
              <input
                {...register("town")}
                placeholder="Enter town (optional)"
                className={inputCls(false)}
              />
            </FormField>
          </div>

          <FormField label="Address" error={errors.addressLine1?.message}>
            <textarea
              {...register("addressLine1")}
              placeholder="Write here ..."
              rows={3}
              className={`w-full rounded-2xl border px-4 py-3 text-xs text-slate-900 outline-none resize-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 ${errors.addressLine1 ? "border-red-400" : "border-slate-200"}`}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <FormField label="Postal Code (optional)">
              <input
                {...register("postalCode")}
                placeholder="e.g. 1216"
                className={inputCls(false)}
              />
            </FormField>
            <FormField label="Address Type">
              <div className="flex gap-2 mt-1">
                {ADDRESS_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue("addressType", type)}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      watch("addressType") === type
                        ? "border-primary bg-primary text-white"
                        : "border-slate-200 text-slate-600 hover:border-primary/50"
                    }`}
                  >
                    {type === "Home" ? (
                      <Home className="w-3 h-3" />
                    ) : type === "Office" ? (
                      <Building2 className="w-3 h-3" />
                    ) : (
                      <MapPin className="w-3 h-3" />
                    )}
                    {type}
                  </button>
                ))}
              </div>
            </FormField>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                {...register("isDefault")}
                className="w-4 h-4 rounded border-slate-300 accent-primary"
              />
              Set as a default address
            </label>
            <button
              type="submit"
              disabled={isAdding}
              className="inline-flex items-center gap-2 justify-center rounded-full bg-blue-600 px-8 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {isAdding && <Loader2 className="w-4 h-4 animate-spin" />}
              {isAdding ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Saved Addresses */}
      {isLoadingAddresses ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-7 h-7 animate-spin text-primary" />
        </div>
      ) : addresses.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-sm font-semibold text-slate-700">
              Saved Addresses ({addresses.length})
            </h2>
            <span className="text-[10px] text-slate-400">
              — click any field to edit
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {addresses.map((addr) => (
              <AddressCard key={addr.id} addr={addr} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-700">{label}</label>
      {children}
      {error && (
        <span className="text-[10px] text-red-500 mt-0.5">{error}</span>
      )}
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  `h-10 w-full rounded-full border px-4 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 ${hasError ? "border-red-400" : "border-slate-200"}`;

const selectCls = (hasError: boolean) =>
  `h-10 w-full rounded-full border px-4 text-xs text-slate-900 outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 ${hasError ? "border-red-400" : "border-slate-200"}`;
