import { Footer } from "@/components/shared/footer/Footer";
import { Header } from "@/components/shared/Navbar/Header";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
