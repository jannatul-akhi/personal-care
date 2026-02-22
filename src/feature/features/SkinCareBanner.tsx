import { ArrowRight } from "lucide-react";

export function SkinCareBanner() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Banner */}
          <div className="relative rounded-2xl overflow-hidden h-[220px]">
            <img
              src="/images/lotion1.png"
              alt="Natural Skincare"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Banner */}
          <div className="relative rounded-2xl overflow-hidden h-[220px]">
            <img
              src="/images/lotion2.png"
              alt="Skincare Solutions"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
