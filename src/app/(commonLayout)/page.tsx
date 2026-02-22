import { BestSellingProducts } from "@/feature/features/BestSellingProducts";
import { CareSection } from "@/feature/features/CareSection";
import { ComboPacks } from "@/feature/features/ComboPacks";
import { ContactSection } from "@/feature/features/ContactSection";
import { FeatureBanner } from "@/feature/features/FeatureBanner";
import { HeroSection } from "@/feature/features/HeroSection";
import { SkinCareBanner } from "@/feature/features/SkinCareBanner";
import { TopRatedProducts } from "@/feature/features/TopRatedProducts";
import { ShopNow } from "@/feature/features/ShopNow";
import BestApproach from "@/feature/features/BestApproach";

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <CareSection />
        <BestSellingProducts />
        <FeatureBanner />
        <TopRatedProducts />
        <SkinCareBanner />
        <ComboPacks />
        <ShopNow />
        <BestApproach />
        <ContactSection />
        
      </main>
    </div>
  );
};

export default page;
