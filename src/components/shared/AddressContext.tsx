import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Address = {
  id: string;
  name: string;
  phone: string;
  region: string;
  city: string;
  town: string;
  line1: string;
  isDefault: boolean;
};

export type AddressInput = Omit<Address, "id">;

type AddressContextValue = {
  addresses: Address[];
  addAddress: (input: AddressInput) => string;
  updateAddress: (id: string, input: AddressInput) => void;
  getAddress: (id: string) => Address | undefined;
};

const AddressContext = createContext<AddressContextValue | undefined>(
  undefined,
);

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "1",
    name: "Mahmudul Jony",
    phone: "+8801738 552 616",
    region: "Dhaka",
    city: "Dhaka",
    town: "Agargaon",
    line1: "Kazipara H No.23, Road No. 12 - 19, Agargaon, Dhaka - North, Dhaka",
    isDefault: true,
  },
  {
    id: "2",
    name: "Zahir Khan",
    phone: "+8801738 552 616",
    region: "Dhaka",
    city: "Dhaka",
    town: "Agargaon",
    line1: "Kazipara H No.23, Road No. 12 - 19, Agargaon, Dhaka - North, Dhaka",
    isDefault: false,
  },
];

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);

  const value = useMemo<AddressContextValue>(
    () => ({
      addresses,
      addAddress: (input: AddressInput) => {
        const id = crypto.randomUUID();
        setAddresses((prev) => {
          const next = [...prev];
          if (input.isDefault) {
            for (const a of next) a.isDefault = false;
          }
          next.push({ id, ...input });
          return next;
        });
        return id;
      },
      updateAddress: (id, input) => {
        setAddresses((prev) => {
          const next = [...prev];
          const idx = next.findIndex((a) => a.id === id);
          if (idx === -1) return prev;

          if (input.isDefault) {
            for (const a of next) a.isDefault = false;
          }

          next[idx] = { id, ...input };
          return next;
        });
      },
      getAddress: (id) => addresses.find((a) => a.id === id),
    }),
    [addresses],
  );

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}

export function useAddressBook() {
  const ctx = useContext(AddressContext);
  if (!ctx)
    throw new Error("useAddressBook must be used within AddressProvider");
  return ctx;
}
