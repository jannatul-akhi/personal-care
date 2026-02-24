"use client";

import { useState } from "react";
import {
  Star,
  Maximize2,
  Truck,
  Zap,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ProductReview from "./ProductReview";
import { ContactSection } from "../features/ContactSection";

const AccordionItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200/60 rounded-xl mb-3 overflow-hidden last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-slate-700 transition-colors"
      >
        <span className="text-[1rem] tracking-tight">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-slate-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-[0.95rem] leading-relaxed text-slate-500">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SingleShop = () => {
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [quantity, setQuantity] = useState(2);
  const [deliveryType, setDeliveryType] = useState("normal");

  const productImages = [
    "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/master/us/products/foaming-facial-cleanser/700x700/cerave_foaming_facial_cleanser_12oz_front-700x700-v2.jpg",
    "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/master/us/products/foaming-facial-cleanser/700x700/cerave_foaming_facial_cleanser_12oz_back-700x700-v2.jpg",
    "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/master/us/products/foaming-facial-cleanser/700x700/cerave_foaming_facial_cleanser_12oz_ingredients-700x700-v2.jpg",
    "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/master/us/products/foaming-facial-cleanser/700x700/cerave_foaming_facial_cleanser_12oz_texture-700x700-v2.jpg",
  ];

  return (
    <div>
      <div className="mx-auto max-w-7xl bg-white p-4 md:p-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F8F8F8] p-8">
              <img
                src={productImages[0]}
                alt="CeraVe Foaming Facial Cleanser"
                className="h-full w-full object-contain mix-blend-multiply"
              />
              <button className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                <Maximize2 className="h-4 w-4 text-slate-600" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {productImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-[#F8F8F8] ring-1 ring-slate-100 hover:ring-indigo-500 transition-all"
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                  {idx === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
                        <div className="ml-0.5 h-0 w-0 border-y-4 border-l-6 border-y-transparent border-l-slate-800" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column: Product Details */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Healthy Glow Daily Face Cream
              </h1>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-orange-400">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-xl font-bold text-slate-900">4.6</span>
                </div>
                <span className="text-sm text-slate-500">(5k+ Reviews)</span>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                A top-rated choice for many kitchens, this model uses smart
                fuzzy logic technology to adjust cooking time and temperature
                automatically for perfectly cooked rice every time. It often
                includes multiple cooking settings (white rice, brown rice,
                steam, quick rice) and a keep warm function.
              </p>

              <p className="font-medium text-slate-900">
                Brand: <span className="text-slate-700">L'Oréal Paris</span>
              </p>

              {/* Promo Banner */}
              <div className="relative flex items-center justify-between overflow-hidden rounded-xl bg-[#b9326e] p-6 text-white shadow-lg">
                <div className="relative z-10">
                  <h3 className="text-[2.2rem] font-bold italic leading-none tracking-tight">
                    First Order?
                  </h3>
                  <p className="mt-2 text-[1.1rem] font-medium opacity-90">
                    Enjoy an Exclusive Discount!"
                  </p>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative flex h-24 w-24 flex-col items-center justify-center bg-[#ee2e24] shadow-2xl">
                    <span className="mb-0.5 text-[10px] font-black leading-none tracking-tighter uppercase">
                      GET UPTO
                    </span>
                    <div className="flex items-start gap-2">
                      <span className="text-[3.2rem] font-black leading-none -tracking-widest">
                        20
                      </span>
                      <div className="mt-2.5 flex flex-col -ml-0.5">
                        <span className="text-xl font-black leading-none">
                          %
                        </span>
                        <span className="text-[10px] font-black leading-none uppercase -mt-0.5">
                          Off
                        </span>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -left-2 -right-2 bg-[#ffc107] py-0.5 text-center text-[10px] font-black tracking-tight text-black shadow-sm">
                      SPECIAL OFFER
                    </div>
                  </div>
                </div>

                {/* Pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                ></div>
                <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-black/10 to-transparent"></div>
              </div>

              {/* Accordions */}
              <div className="mt-8 border-t border-gray-100">
                <AccordionItem
                  title="Product Description"
                  content="This is a detailed description of the Healthy Glow Daily Face Cream. Formulated with dermatologists, it contains 3 essential ceramides, hyaluronic acid, and niacinamide to help restore the skin barrier, attract hydration, and soothe skin."
                />
                <AccordionItem
                  title="How To Use"
                  content="Wet skin with lukewarm water. Massage cleanser into skin in a gentle, circular motion. Rinse."
                />
                <AccordionItem
                  title="Shipping Details"
                  content="Shipping is available nationwide. Orders placed before 2 PM are typically processed the same day. Estimated delivery time varies by location and shipping method."
                />
                <AccordionItem
                  title="Return Policy"
                  content="If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. The product must be unused and in its original packaging."
                />
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Sidebar */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100 ring-1 ring-slate-100">
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-[2.5rem] font-bold text-[#1e293b] leading-tight tracking-tight">
                  1450 TK
                </span>
                <span className="text-[1.1rem] text-[#94a3b8] line-through">
                  2500 TK.
                </span>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-sm font-medium text-slate-600">
                    Delivered to
                  </span>
                  <button className="text-[0.8rem] font-black text-[#15803d] hover:opacity-80">
                    Change
                  </button>
                </div>
                <div className="flex items-start gap-2.5 p-0.5 text-[0.92rem] text-slate-600">
                  <MapPin className="mt-1 h-[1.1rem] w-[1.1rem] shrink-0 text-slate-500" />
                  <span className="leading-snug">
                    2558 Hardman Road, Vermont, South Burlington, USA - 67452
                  </span>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <div
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg p-3.5 transition-all bg-[#f1f5f9]",
                    deliveryType === "normal" ? "ring-1 ring-[#15803d]" : "",
                  )}
                  onClick={() => setDeliveryType("normal")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-[1.1rem] w-[1.1rem] items-center justify-center rounded-full border bg-white",
                        deliveryType === "normal"
                          ? "border-[#15803d]"
                          : "border-slate-400",
                      )}
                    >
                      {deliveryType === "normal" && (
                        <div className="h-[0.55rem] w-[0.55rem] rounded-full bg-[#15803d]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[0.92rem] font-bold text-slate-700">
                        <Truck className="h-4 w-4 text-[#15803d]" />
                        Normal Delivery
                      </div>
                      <p className="text-[0.7rem] font-medium text-slate-400">
                        Within 2/3 Days
                      </p>
                    </div>
                  </div>
                  <span className="text-[0.92rem] font-bold text-slate-800">
                    ৳120
                  </span>
                </div>

                <div
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg p-3.5 transition-all bg-[#f1f5f9]",
                    deliveryType === "express" ? "ring-1 ring-[#15803d]" : "",
                  )}
                  onClick={() => setDeliveryType("express")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-[1.1rem] w-[1.1rem] items-center justify-center rounded-full border bg-white",
                        deliveryType === "express"
                          ? "border-[#15803d]"
                          : "border-slate-400",
                      )}
                    >
                      {deliveryType === "express" && (
                        <div className="h-[0.55rem] w-[0.55rem] rounded-full bg-[#15803d]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[0.92rem] font-bold text-slate-700">
                        <Zap className="h-4 w-4 text-[#15803d]" />
                        Express Delivery
                      </div>
                      <p className="text-[0.7rem] font-medium text-slate-400">
                        Within 12 Hours
                      </p>
                    </div>
                  </div>
                  <span className="text-[0.92rem] font-bold text-slate-800">
                    ৳180
                  </span>
                </div>
              </div>

              <div className="mb-5 flex items-center gap-4">
                <label className="text-[0.92rem] font-bold text-slate-700 shrink-0 min-w-[50px]">
                  Size:
                </label>
                <div className="relative flex-1">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-5 py-3 pr-10 text-[0.92rem] font-medium text-slate-700 focus:outline-none"
                  >
                    <option>50ml</option>
                    <option>100ml</option>
                    <option>200ml</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none text-slate-500" />
                </div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-2.5 px-0.5">
                  <div className="h-[0.55rem] w-[0.55rem] rounded-full bg-[#22c55e]" />
                  <span className="text-[0.92rem] text-[#22c55e] font-bold">
                    13 in stock
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-[0.92rem] font-bold text-slate-700 shrink-0 min-w-[50px]">
                    Quantity:
                  </label>
                  <div className="relative flex-1">
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-5 py-3 pr-10 text-[0.92rem] font-bold text-slate-700 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 pointer-events-none text-slate-500" />
                  </div>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-3 rounded-full bg-[#0d1526] py-4.5 text-[1.1rem] font-black text-white shadow-xl transition-all hover:bg-black active:scale-[0.98]">
                Add To Cart
                <ShoppingCart className="h-[1.3rem] w-[1.3rem]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="bg-gray-100 text-gray-600 text-center text-2xl font-bold py-2">
        Products Review
      </h3>

      <div className="mx-auto max-w-7xl bg-white p-4 md:p-8">
        <ProductReview />
      </div>

      <ContactSection />
    </div>
  );
};

export default SingleShop;
