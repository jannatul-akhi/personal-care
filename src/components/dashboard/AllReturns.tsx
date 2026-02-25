"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Plus, 
  Minus, 
  CheckCircle, 
  RotateCcw,
  ChevronDown,
  ChevronUp
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

const ReturnStatusBadge = ({ status }: { status: "Submitted" | "Returned" }) => {
  const isReturned = status === "Returned";
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold",
      isReturned ? "bg-[#E6FFFA] text-[#38B2AC]" : "bg-slate-50 text-slate-900"
    )}>
       {isReturned ? <RotateCcw className="w-3 h-3" /> : <CheckCircle className="w-3" />}
       {status}
    </div>
  );
};

export default function AllReturns() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const returns = [
    { id: 1, returnId: "#RA56465-44471", status: "Submitted" as const, date: "25 June, 2024" },
    { id: 2, returnId: "#RA56465-44471", status: "Submitted" as const, date: "25 June, 2024" },
    { id: 3, returnId: "#RA56465-44471", status: "Submitted" as const, date: "25 June, 2024" },
    { id: 4, returnId: "#RA56465-44471", status: "Returned" as const, date: "25 June, 2024" },
    { id: 5, returnId: "#RA56465-44471", status: "Returned" as const, date: "25 June, 2024" },
  ];

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-sm border border-slate-100 min-h-full">
      <h1 className="text-xl font-bold text-slate-900 mb-8">All Returns</h1>

      <div className="space-y-4">
        {returns.map((item) => (
          <div key={item.id} className="flex flex-col">
            <ZigzagSeparator />
            
            <div 
              className="flex items-center justify-between py-2 cursor-pointer group"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-blue-500">
                  {expandedId === item.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-slate-900 leading-none">ID: {item.returnId}</span>
                  <ReturnStatusBadge status={item.status} />
                </div>
              </div>
              <span className="text-[11px] text-slate-500">Date: {item.date}</span>
            </div>

            {expandedId === item.id && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400 px-1">
                    <span>Total 4 Items</span>
                    <div className="flex gap-12">
                      <span>Discount</span>
                      <span>Sub Total</span>
                    </div>
                  </div>
                  
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="relative w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden">
                        <Image src="/images/hero1.png" alt="Product" fill className="object-contain p-2" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-[13px] font-bold text-slate-900 leading-tight">Infinix Hot 60i 50 MP 128GB storage</h4>
                        <span className="text-[11px] text-slate-500">Storage: 256GB Color: Blue</span>
                        <span className="mt-1 text-[13px] font-bold text-blue-600">৳625.00 <span className="text-slate-400 font-medium">x 2</span></span>
                      </div>
                      <div className="flex gap-14 text-[13px] font-bold text-slate-900 pr-2">
                         <span className="text-slate-400">৳0.00</span>
                         <span>৳625.00</span>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col items-end gap-1 px-2 pt-2 border-t border-slate-50">
                      <div className="flex justify-between w-64 text-[13px]">
                         <span className="text-slate-500 font-medium">Sub Total</span>
                         <span className="font-bold text-slate-900">৳2,500.00</span>
                      </div>
                      <div className="flex justify-between w-64 text-[13px]">
                         <span className="text-slate-500 font-medium">Shipping</span>
                         <span className="font-bold text-slate-900">৳150.00</span>
                      </div>
                      <div className="flex justify-between w-72 mt-4 pt-4 border-t border-slate-100 items-baseline">
                         <span className="text-lg font-bold text-slate-900">Refund Amount</span>
                         <span className="text-lg font-bold text-slate-900">৳2,700.00</span>
                      </div>
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
