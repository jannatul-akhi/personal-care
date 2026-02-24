import { ContactSection } from "@/feature/features/ContactSection";
import { ShopAllProduct } from "@/feature/shop/ShopAllProduct";
import { ShopAllProductBanner } from "@/feature/shop/ShopAllProductBanner";
import { ShopAllProductNavbar } from "@/feature/shop/ShopAllProductNavbar";


const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
          <ShopAllProductBanner />    
          <ShopAllProductNavbar />
          <ShopAllProduct />
          <ContactSection />
      </main>
    </div>
  );
};

export default page;
