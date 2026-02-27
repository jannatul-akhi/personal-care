import AddressClient from "@/components/dashboard/AddressClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Addresses",
};

export default function AddressPage() {
  return <AddressClient />;
}

// import Address from "@/components/dashboard/Address";

// const AddressFormPage = () => {
//   return <Address mode="create" />;
// };

// export default AddressFormPage;
