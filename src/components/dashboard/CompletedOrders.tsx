"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus,
  CheckCircle2,
  FileText
} from "lucide-react";
import { cn } from "@/utils/cn";

export default function CompletedOrders() {
  const [refundMethod, setRefundMethod] = useState<"online" | "cash">("online");
  const [items, setItems] = useState([
    { id: 1, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625, qty: 99, image: "/images/hero1.png" },
    { id: 2, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625, qty: 99, image: "/images/hero1.png" },
    { id: 3, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625, qty: 99, image: "/images/hero1.png" },
  ]);

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 min-h-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Product Return</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Product List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all bg-white relative">
              <div className="relative w-20 h-20 rounded-xl bg-slate-50 border border-slate-50 overflow-hidden">
                <Image src={item.image} alt="Product" fill className="object-contain p-2" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 relative">
                     <Image src="https://www.apple.com/v/library/p/8/images/meta/apple_logo_96x96.png" alt="Brand" fill className="object-contain opacity-60" />
                  </div>
                  <h4 className="text-[13px] font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">Storage: {item.storage} Color: {item.color}</p>
                
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-blue-600">৳{item.price.toFixed(2)}</span>
                  <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg overflow-hidden h-8">
                    <button onClick={() => updateQty(item.id, -1)} className="px-2.5 hover:bg-white text-slate-400 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-[12px] font-bold text-slate-900 min-w-[32px] text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-2.5 hover:bg-white text-slate-400 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Delete Icon */}
              <button 
                onClick={() => removeItem(item.id)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Summary Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#f8fafc] rounded-[24px] p-6 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Summary</h2>
              <span className="text-[13px] font-bold text-slate-500">{items.length} Items</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500 font-medium">Refund Amount</span>
                <span className="font-bold text-slate-900">৳2,500.00</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500 font-medium">Shipping</span>
                <span className="font-bold text-slate-900">৳1,125.00</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 border-dashed mb-8">
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-slate-900">Refund Amount</span>
                <span className="text-lg font-black text-slate-900">৳2,500.00</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-[13px] font-bold text-slate-900 mb-1">Refund Method</h3>
                <p className="text-[10px] text-slate-400 mb-4 font-medium">All transactions are secure and encrypted.</p>
                
                <div className="space-y-3">
                  {/* Online Refund */}
                  <div 
                    onClick={() => setRefundMethod("online")}
                    className={cn(
                      "p-4 rounded-2xl border transition-all cursor-pointer",
                      refundMethod === "online" ? "bg-white border-blue-100 shadow-md ring-1 ring-blue-50" : "bg-white border-slate-100"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 mt-0.5",
                        refundMethod === "online" ? "border-blue-600 bg-blue-600" : "border-slate-200"
                      )}>
                        {refundMethod === "online" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="flex-1">
                        <span className="text-[12px] font-bold text-slate-900">Online Refund</span>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal font-medium max-w-[180px]">
                          After clicking "Place Order", you will be redirected to online payment to complete your purchase securely.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3 opacity-60 grayscale-[0.3]">
                           {/* Simplified placeholder icons for payment providers */}
                           {["Nagad", "Rocket", "bKash", "Upay", "Visa"].map(p => (
                             <div key={p} className="h-4 w-8 bg-slate-100 rounded text-[6px] flex items-center justify-center font-bold text-slate-400 uppercase tracking-tighter">{p}</div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cash on Refund */}
                  <div 
                    onClick={() => setRefundMethod("cash")}
                    className={cn(
                      "p-4 rounded-2xl border transition-all cursor-pointer",
                      refundMethod === "cash" ? "bg-white border-blue-100 shadow-md ring-1 ring-blue-50" : "bg-white border-slate-100"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 mt-0.5",
                        refundMethod === "cash" ? "border-blue-600 bg-blue-600" : "border-slate-200"
                      )}>
                        {refundMethod === "cash" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <span className="text-[12px] font-bold text-slate-900">Cash on Refund</span>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">We prioritizing frictionless refund</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 rounded-2xl bg-blue-600 text-white text-[13px] font-black transition-all hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-200 uppercase tracking-wide">
                Submit for Return
              </button>
            </div>
          </div>

          {/* Policy Card */}
          <div className="bg-[#f8fafc]/50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <FileText className="w-4 h-4 text-slate-400" />
             </div>
             <div>
                <p className="text-[11px] font-bold text-slate-900 leading-none">Return & Refund Policy:</p>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">Within 45 Days of Purchase</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
