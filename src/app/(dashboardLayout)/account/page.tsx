import AccountDetailsClient from "@/components/dashboard/AccountDetailsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Details",
};

export default function AccountDetailsPage() {
  return <AccountDetailsClient />;
}
