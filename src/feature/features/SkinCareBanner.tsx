import { ArrowRight } from "lucide-react";

export function SkinCareBanner() {
  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Banner */}
        <div className="relative overflow-hidden">
          <img
            src="/images/lotion1.png"
            alt="Natural Skincare"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Banner */}
        <div className="relative overflow-hidden">
          <img
            src="/images/lotion2.png"
            alt="Skincare Solutions"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
