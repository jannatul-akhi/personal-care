"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Plus, 
  Minus,
  Apple
} from "lucide-react";
import { cn } from "@/utils/cn";

const ZigzagSeparator = () => (
    <div className="w-full h-8 overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="10"
        viewBox="0 0 1200 10"
        preserveAspectRatio="none"
        className="text-slate-100 fill-current"
      >
        <path d="M0 10L10 0L20 10L30 0L40 10L50 0L60 10L70 0L80 10L90 0L100 10L110 0L120 10L130 0L140 10L150 0L160 10L170 0L180 10L190 0L200 10L210 0L220 10L230 0L240 10L250 0L260 10L270 0L280 10L290 0L300 10L310 0L320 10L330 0L340 10L350 0L360 10L370 0L380 10L390 0L400 10L410 0L420 10L430 0L440 10L450 0L460 10L470 0L480 10L490 0L500 10L510 0L520 10L530 0L540 10L550 0L560 10L570 0L580 10L590 0L600 10L610 0L620 10L630 0L640 10L650 0L660 10L670 0L680 10L690 0L700 10L710 0L720 10L730 0L740 10L750 0L760 10L770 0L780 10L790 0L800 10L810 0L820 10L830 0L840 10L850 0L860 10L870 0L880 10L890 0L900 10L910 0L920 10L930 0L940 10L950 0L960 10L970 0L980 10L990 0L1000 10L1010 0L1020 10L1030 0L1040 10L1050 0L1060 10L1070 0L1080 10L1090 0L1100 10L1110 0L1120 10L1130 0L1140 10L1150 0L1160 10L1170 0L1180 10L1190 0L1200 10V10H0V10Z" />
      </svg>
    </div>
  );

const TimerBadge = () => (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FFF5F5] text-[#FF4D4D] text-[10px] font-bold">
       <Clock className="w-3 h-3" />
       2hour 2 min left
    </div>
);

export default function InQueue() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [items, setItems] = useState([
    { id: 1, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625, qty: 99, image: "/images/hero1.png" },
    { id: 2, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625, qty: 99, image: "/images/hero1.png" },
    { id: 3, name: "Infinix Hot 60i 50 MP 128GB storage", storage: "256GB", color: "Blue", price: 625, qty: 99, image: "/images/hero1.png" },
  ]);

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-sm border border-slate-100 min-h-full">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-900">In Queue</h1>
        <p className="text-[11px] text-slate-400 mt-1">Invoices will be removed after 2 hours</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((orderId) => (
          <div key={orderId} className="flex flex-col">
            <ZigzagSeparator />
            
            <div 
              className="flex items-center justify-between py-2 cursor-pointer group"
              onClick={() => setExpandedId(expandedId === orderId ? null : orderId)}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-blue-500">
                  {expandedId === orderId ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold text-slate-900 leading-none">Total 4 Items</span>
                  <TimerBadge />
                </div>
              </div>
            </div>

            {expandedId === orderId && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-4">
                  <div className="flex items-center text-[11px] font-semibold text-slate-400 px-1">
                    <span className="flex-1">Items</span>
                    <div className="flex gap-16 mr-4">
                        <span className="w-20 text-right">Discount</span>
                        <span className="w-20 text-right">Sub Total</span>
                    </div>
                  </div>

                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="relative w-20 h-20 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden">
                        <Image src={item.image} alt="Product" fill className="object-contain p-2" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Apple className="w-4 h-4 text-slate-600 fill-slate-600" />
                            <h4 className="text-[13px] font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 mb-2">Storage: {item.storage} Color: {item.color}</p>
                        <div className="flex items-center gap-3">
                           <span className="text-[14px] font-bold text-blue-600">৳{item.price.toFixed(2)}</span>
                           <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg overflow-hidden">
                              <button onClick={(e) => { e.stopPropagation(); updateQty(item.id, -1); }} className="p-1 px-2 hover:bg-white text-slate-400 transition-colors">
                                 <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-[12px] font-bold text-slate-900 min-w-[30px] text-center">{item.qty}</span>
                              <button onClick={(e) => { e.stopPropagation(); updateQty(item.id, 1); }} className="p-1 px-2 hover:bg-white text-slate-400 transition-colors">
                                 <Plus className="w-3 h-3" />
                              </button>
                           </div>
                        </div>
                      </div>
                      <div className="flex gap-16 mr-4 text-[13px] font-bold">
                         <span className="w-20 text-right text-slate-400">৳0.00</span>
                         <span className="w-20 text-right text-slate-900">৳{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col items-end gap-1 px-2 mt-4">
                    <div className="space-y-1 w-64">
                        <div className="flex justify-between text-[13px]">
                           <span className="text-slate-500">Sub Total</span>
                           <span className="font-bold text-slate-900">৳2,500.00</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                           <span className="text-slate-500">Discount</span>
                           <span className="font-bold text-slate-900">৳600.00</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                           <span className="text-slate-500">Tax</span>
                           <span className="font-bold text-slate-900">৳125.00</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                           <span className="text-slate-500">Delivery Charge</span>
                           <span className="font-bold text-slate-900">৳150.00</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                           <span className="text-slate-500">Express Delivery Charge</span>
                           <span className="font-bold text-slate-900">৳50.00</span>
                        </div>
                        <div className="pt-4 mt-2 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-900 uppercase">Total</span>
                            <span className="text-lg font-bold text-slate-900">৳2,700.00</span>
                        </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-6 mt-6 pb-4">
                    <button className="text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors">Remove</button>
                    <button className="bg-[#2B6CB0] text-white px-8 py-3 rounded-xl text-[13px] font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-200">
                        Place Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
