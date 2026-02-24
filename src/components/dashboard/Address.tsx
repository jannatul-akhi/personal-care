"use client";

import { FormEvent, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";

interface AddressFormPageProps {
  mode: "create" | "edit";
}

const Address = ({ mode }: AddressFormPageProps) => {
  const router = useRouter();
  const params = useParams();
  //const { getAddress, addAddress, updateAddress } = useAddressBook();

  //   const existing = useMemo(
  //     () =>
  //       mode === "edit" && params.id
  //         ? getAddress(params.id as string)
  //         : undefined,
  //     [getAddress, mode, params.id],
  //   );

  const heading = mode === "create" ? "Add New Address" : "Edit Address";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      region: String(formData.get("region") || ""),
      city: String(formData.get("city") || ""),
      town: String(formData.get("town") || ""),
      line1: String(formData.get("address") || ""),
      isDefault: Boolean(formData.get("isDefault")),
    };

    // if (mode === "edit" && existing) {
    //   updateAddress(existing.id, payload);
    // } else {
    //   addAddress(payload);
    // }

    router.push("/account/address");
  }

  return (
    <section className="rounded-3xl bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
      <h1 className="text-xl font-semibold text-slate-900">{heading}</h1>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <Field name="name" label="Name" />
          <Field
            name="phone"
            label="Phone Number"
            //defaultValue={existing?.phone}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <SelectField
            name="region"
            label="Province / Region"
            //defaultValue={existing?.region}
          />
          <SelectField name="city" label="City" />
          <SelectField name="town" label="Town" />
        </div>

        <div>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-700">
            <span>Address</span>
            <textarea
              name="address"
              //defaultValue={existing?.line1}
              placeholder="Write here ..."
              rows={3}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
            />
          </label>
        </div>

        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input
              type="checkbox"
              name="isDefault"
              //defaultChecked={existing?.isDefault}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Set as a default address</span>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-xs font-medium text-white shadow-[0_10px_30px_rgba(37,99,235,0.45)] hover:bg-blue-700"
          >
            {mode === "create" ? "Save" : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Address;

interface FieldProps {
  name: string;
  label: string;
  defaultValue?: string;
}

function Field({ name, label, defaultValue }: FieldProps) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate-700">
      <span>{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="h-10 rounded-full border border-slate-200 px-4 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
      />
    </label>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  defaultValue?: string;
}

function SelectField({ name, label, defaultValue }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate-700">
      <span>{label}</span>
      <select
        name={name}
        defaultValue={defaultValue || ""}
        className="h-10 rounded-full border border-slate-200 px-4 text-xs text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
      >
        <option value="" disabled>
          Select
        </option>
        <option value="Dhaka">Dhaka</option>
        <option value="Chattogram">Chattogram</option>
        <option value="Rajshahi">Rajshahi</option>
      </select>
    </label>
  );
}
