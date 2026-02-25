"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, ShoppingCart, CheckCircle2, Package, Truck, CheckCircle, MapPin, User, X } from "lucide-react";
import { cn } from "@/utils/cn";

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, label: "Order Placed", date: "25 June, 2024", icon: ShoppingCart, color: "text-[#00B050]", bg: "bg-[#00B050]", sub: "" },
    { id: 2, label: "Order Confirmed", sub: "We will reach you soon.", icon: CheckCircle2, color: "text-[#2B6CB0]", bg: "bg-[#2B6CB0]", date: "" },
    { id: 3, label: "Packed", icon: Package, color: "text-slate-300", bg: "bg-white", sub: "" },
    { id: 4, label: "Shipping", icon: Truck, color: "text-slate-300", bg: "bg-white", sub: "" },
    { id: 5, label: "Completed", icon: CheckCircle, color: "text-slate-300", bg: "bg-white", sub: "" },
  ];

  return (
    <div className="relative flex justify-between items-start w-full px-12 mb-16 mt-4">
      {/* Connector Line Base */}
      <div className="absolute top-6 left-[15%] right-[15%] h-[1.5px] bg-slate-100 -z-10" />
      {/* Connector Line Active */}
      <div 
        className="absolute top-6 left-[15%] h-[1.5px] bg-[#00B050] -z-10 transition-all duration-700" 
        style={{ width: `${Math.max(0, (Math.min(currentStep, 1.5) - 1) * 35)}%` }} 
      />
      {/* I'll simplify the blue part for now or just use one green line for the image's "Confirmed" state which is blue */}
      <div 
        className="absolute top-6 left-[15%] h-[1.5px] bg-[#DEEAF6] -z-10" 
        style={{ width: `70%` }} 
      />
      <div 
        className="absolute top-6 left-[15%] h-[1.5px] bg-[#00B050]" 
        style={{ width: `17.5%` }} 
      />
      <div 
        className="absolute top-6 left-[32.5%] h-[1.5px] bg-[#2B6CB0]" 
        style={{ width: `17.5%` }} 
      />

      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = step.id <= currentStep;
        
        return (
          <div key={step.id} className="flex flex-col items-center flex-1 text-center group">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 relative",
              isActive ? step.bg : "bg-white border-[1.5px] border-slate-100 shadow-sm"
            )}>
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-200")} />
            </div>
            <div className="h-0 flex flex-col items-center">
                <h4 className={cn("text-[11px] font-bold mb-0.5 whitespace-nowrap", isActive ? step.color : "text-slate-300")}>
                {step.label}
                </h4>
                {step.date && <p className="text-[9px] text-slate-400 font-medium whitespace-nowrap">{step.date}</p>}
                {step.sub && <p className="text-[9px] text-slate-400 font-medium leading-[1.1] max-w-[80px]">{step.sub}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function TrackOrder() {
  const [invoiceId, setInvoiceId] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (invoiceId.trim()) {
      setShowResults(true);
    }
  };

  const orderItems = [
    { id: 1, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625.0, qty: 2, discount: 0, image: "/images/hero1.png" },
    { id: 2, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625.0, qty: 2, discount: 0, image: "/images/hero1.png" },
    { id: 3, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625.0, qty: 2, discount: 0, image: "/images/hero1.png" },
  ];

  return (
    <div className="bg-white rounded-[20px] p-10 shadow-sm border border-slate-100 min-h-full">
      <h1 className="text-xl font-bold text-slate-900 mb-8">Track Order</h1>

      <div className="flex flex-col items-center mb-16">
        <div className="flex flex-col items-center mb-6">
            {!showResults && (
                <div className="w-12 h-12 flex items-center justify-center mb-4 opacity-40">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-900">
                        <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8.5 15.5L15.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            )}
            <p className="text-[13px] font-medium text-slate-500">To track your order please enter your invoice ID.</p>
        </div>

        <div className="flex w-full max-w-lg gap-3 mb-12">
           <div className="flex-1">
             <input 
               type="text" 
               placeholder="Enter invoice ID"
               value={invoiceId}
               onChange={(e) => setInvoiceId(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
               className="w-full h-12 px-6 rounded-xl border border-slate-100 bg-white text-[13px] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
             />
           </div>
           <button 
             onClick={handleSearch}
             className="px-8 h-12 rounded-xl bg-[#2B6CB0] text-white text-[13px] font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
            >
              Search
           </button>
        </div>

        {showResults && (
            <div className="w-full animate-in fade-in slide-in-from-top-4 duration-500">
                <Stepper currentStep={2} />

                <div className="flex justify-between items-center mb-10 pt-4">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-bold text-slate-900 tracking-tight">Order id: {invoiceId}</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF9F1] text-[#00B050] text-[10px] font-bold tracking-tight">
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Order Placed
                        </span>
                    </div>
                    <span className="text-[12px] font-medium text-slate-400 font-mono">Date: 25 June, 2024</span>
                </div>

                <div className="grid grid-cols-[1fr,320px] gap-12">
                    {/* Left Side: Products */}
                    <div>
                        <div className="flex justify-between px-6 mb-6 text-[12px] font-bold text-slate-400">
                            <span>Total 4 Items</span>
                            <div className="flex gap-20 mr-12">
                                <span>Discount</span>
                                <span>Sub Total</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            {orderItems.map((item) => (
                                <div key={item.id} className="p-5 rounded-[20px] border border-slate-100 bg-white shadow-sm flex items-center gap-5">
                                    <div className="relative w-16 h-16 rounded-lg bg-slate-50 border border-slate-50 overflow-hidden shrink-0">
                                        <Image src={item.image} alt="Product" fill className="object-contain p-2" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[13px] font-bold text-slate-900 leading-tight mb-1 truncate tracking-tight">{item.name}</h4>
                                        <p className="text-[11px] text-slate-500 mb-2">Storage: {item.storage} Color: {item.color}</p>
                                        <p className="text-[14px] font-bold text-[#2B6CB0]">৳{item.price.toFixed(2)} <span className="text-slate-300 font-normal ml-1">x {item.qty}</span></p>
                                    </div>
                                    <div className="flex gap-20 mr-6">
                                        <span className="text-[13px] font-bold text-slate-900">৳{item.discount.toFixed(2)}</span>
                                        <span className="text-[13px] font-bold text-slate-900 min-w-[80px] text-right tracking-tight">৳{(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="flex flex-col items-end gap-3 pr-2 text-[13px] font-bold text-slate-900">
                            {[
                                { label: "Sub Total", val: "৳2,500.00" },
                                { label: "Discount", val: "৳00.00" },
                                { label: "Tax", val: "৳125.00" },
                                { label: "Delivery Charge", val: "৳150.00" },
                                { label: "Express Delivery Charge", val: "৳50.00" }
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between w-full max-w-[280px]">
                                    <span className="text-slate-500 font-medium">{row.label}</span>
                                    <span className="tracking-tight">{row.val}</span>
                                </div>
                            ))}
                            
                            <div className="w-full max-w-[280px] pt-4 mt-2 border-t border-dotted border-slate-200">
                                <div className="flex justify-between items-baseline text-lg">
                                    <span className="text-slate-900">Total</span>
                                    <span className="text-[20px] font-bold text-[#1A1A1A] tracking-tighter">৳2,700.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Details Sidebar */}
                    <div className="space-y-4">
                        <div className="p-8 rounded-[24px] border border-slate-100 bg-white shadow-sm space-y-8">
                            <div>
                                <h5 className="text-[13px] font-bold text-slate-900 mb-5 tracking-tight uppercase">Billing to</h5>
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-full bg-[#F8FAFC] flex items-center justify-center shrink-0 border border-slate-50">
                                        <span className="text-[13px] font-bold text-slate-900">MJ</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[14px] font-bold text-slate-900 leading-none mb-1">Mahmudul Jony</p>
                                        <p className="text-[12px] text-slate-500 font-medium mb-2 tracking-tight">+8801738 552 616</p>
                                        <p className="text-[11px] text-slate-400 font-medium leading-[1.6]">
                                            Kazipara H No.23, Road No. 12 - 19, Agargaon, Dhaka - North, Dhaka
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-[13px] font-bold text-slate-900 mb-5 tracking-tight uppercase">Delivery to</h5>
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-full bg-[#F8FAFC] flex items-center justify-center shrink-0 border border-slate-50">
                                        <span className="text-[13px] font-bold text-slate-900">ZK</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[14px] font-bold text-slate-900 leading-none mb-1">Zahir Khan</p>
                                        <p className="text-[12px] text-slate-500 font-medium mb-2 tracking-tight">+8801738 552 616</p>
                                        <p className="text-[11px] text-slate-400 font-medium leading-[1.6]">
                                            Kazipara H No.23, Road No. 12 - 19, Agargaon, Dhaka - North, Dhaka
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-dotted border-slate-100">
                                <h5 className="text-[14px] font-bold text-slate-900 mb-4 tracking-tight">Payment Details</h5>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[12px]">
                                        <span className="text-slate-500 font-medium">Payment Method</span>
                                        <span className="text-slate-900 font-bold tracking-tight">Online Payment</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[12px]">
                                        <span className="text-slate-500 font-medium">Payment Status</span>
                                        <span className="flex items-center gap-1.5 text-[#00B050] font-bold tracking-tight">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                                                <circle cx="7" cy="7" r="7" fill="currentColor" fillOpacity="0.1" />
                                                <path d="M4 7L6 9L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Paid
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 group">
                                <button className="text-[14px] font-bold text-[#2B6CB0] hover:text-blue-700 transition-colors mb-1">Cancel Order</button>
                                <p className="text-[11px] text-slate-400 font-medium leading-[1.6]">
                                    Checkout <span className="text-[#2B6CB0]/60 underline decoration-dotted underline-offset-4 cursor-pointer hover:text-[#2B6CB0]">cancelation policy</span> before order cancelation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
