// app/(dashboard)/account/page.tsx
export default function AccountDetailsPage() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
      <h1 className="text-xl font-semibold text-slate-900">Account Details</h1>

      <div className="mt-6 grid gap-8">
        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Field label="Full Name" placeholder="Write your full name" />
            <div className="flex gap-4 max-md:flex-col">
              <Field label="Phone Number" placeholder="+8801738552161" />
              <Field label="Email Address" placeholder="Enter email address" />
            </div>
          </div>
        </div>

        {/* Security Options */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Security Options
          </h2>
          <div className="grid gap-4">
            <Field
              label="Current password"
              placeholder="Type your current password"
              type="password"
            />
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              <Field
                label="Type Password"
                placeholder="Type new password"
                type="password"
              />
              <Field
                label="Re-Type Password"
                placeholder="Re-type new password"
                type="password"
              />
              <div className="flex items-end justify-end max-md:justify-start">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow-[0_10px_30px_rgba(37,99,235,0.45)] hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
};

function Field({ label, placeholder, type = "text" }: FieldProps) {
  return (
    <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-slate-700">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 rounded-full border border-slate-200 px-4 text-xs text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
      />
    </label>
  );
}
