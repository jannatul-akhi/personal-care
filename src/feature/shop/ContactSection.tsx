import { Phone, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function ContactSection() {
  return (
    <section className="pt-20 bg-white">
      <div className="max-w-[1400px] mx-auto ">
        <div className="relative rounded-[2rem] overflow-hidden bg-[#fafafa] min-h-[350px] flex items-center">
          {/* Abstract Patterns Background */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
            {/* Swirl Pattern Top-Left */}
            <div className="absolute top-[-15%] left-[32%] w-[450px] h-[450px]">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-[#d1dcc4] opacity-90"
              >
                <path
                  d="M40 100 Q 60 40 100 20 Q 140 40 160 100 Q 140 160 100 180 Q 60 160 40 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M60 100 Q 80 60 100 50 Q 120 60 140 100 Q 120 140 100 150 Q 80 140 60 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <path
                  d="M100 20 L 100 180"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            {/* Circular Lines Pattern Center-Top */}
            <div className="absolute top-[-5%] left-[51%] w-[240px] h-[240px]">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#3a4a27] opacity-70"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                {[...Array(20)].map((_, i) => (
                  <path
                    key={i}
                    d={`M ${50 + 48 * Math.cos(i * 0.3)} ${50 + 48 * Math.sin(i * 0.3)} Q 50 50 ${50 + 48 * Math.cos(i * 0.3 + 3)} ${50 + 48 * Math.sin(i * 0.3 + 3)}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                  />
                ))}
              </svg>
            </div>

            {/* Floral Pattern Bottom-Center */}
            <div className="absolute bottom-[-15%] left-[53%] w-[180px] h-[180px]">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#fbbf24] opacity-70"
              >
                {[...Array(12)].map((_, i) => (
                  <ellipse
                    key={i}
                    cx="50"
                    cy="50"
                    rx="12"
                    ry="46"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    transform={`rotate(${i * 15} 50 50)`}
                  />
                ))}
                <circle
                  cx="50"
                  cy="50"
                  r="10"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Stars */}
            <div className="absolute top-[40%] left-[48.5%] w-8 h-8 text-[#5c723d]">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </div>
            <div className="absolute bottom-[20%] right-[7%] w-10 h-10 text-[#5c723d]">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="p-10 lg:pl-16 lg:pr-8">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1a1a1a] mb-5 leading-tight">
                Shop Your Perfect Skin Match
              </h2>
              <p className="text-gray-500 text-sm md:text-base mb-10 max-w-lg leading-relaxed">
                Choose personal care made with thoughtful ingredients for daily
                comfort and protection Choose personal care made with
                thoughtful.
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#5c723d] text-white rounded-xl font-semibold hover:bg-[#4a5c31] transition-all group">
                  All Product{" "}
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      Make A Call
                    </span>
                    <span className="text-lg font-bold text-[#1a1a1a]">
                      +880 123 456 789
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Model & Branding */}
            <div className="relative h-full flex justify-end items-center pr-10 lg:pr-10">
              <div className="relative w-full h-[350px] md:h-[400px]">
                {/* Branding Text Overlay */}
                <div className="absolute right-0 top-[20%] z-20 flex flex-col items-end mr-4">
                  <span className="text-[#fbbf24]/60 text-lg md:text-xl font-bold tracking-[0.4em] uppercase leading-none">
                    Organic
                  </span>
                  <span className="text-[#3a4a27] text-6xl md:text-8xl font-serif font-black uppercase leading-[0.8] tracking-tighter">
                    Skin
                  </span>
                </div>

                {/* CTA Image Overlay */}
                <div className="absolute inset-0 z-10">
                  <Image
                    src="/images/cta.png"
                    alt="Skincare Model Overlay"
                    fill
                    className="object-contain object-right-bottom scale-110 translate-x-4"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
