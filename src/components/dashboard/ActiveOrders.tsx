"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  CreditCard, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle,
  AlertCircle,
  X
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

const OrderStatusBadge = ({ status }: { status: string }) => {
  const configs: Record<string, { icon: any; label: string; bg: string; text: string }> = {
    "Order Placed": { icon: Clock, label: "Order Placed", bg: "bg-[#E6FFFA]", text: "text-[#38B2AC]" },
    "Order Confirmed": { icon: CheckCircle2, label: "Order Confirmed", bg: "bg-[#E6FFFA]", text: "text-[#38B2AC]" },
    "Packed": { icon: Package, label: "Packed", bg: "bg-[#E6FFFA]", text: "text-[#38B2AC]" },
    "Shipping": { icon: Truck, label: "Shipping", bg: "bg-[#E6FFFA]", text: "text-[#38B2AC]" },
    "Completed": { icon: CheckCircle2, label: "Completed", bg: "bg-[#E6FFFA]", text: "text-[#38B2AC]" },
  };

  const config = configs[status] || configs["Order Placed"];
  const Icon = config.icon;

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold", config.bg, config.text)}>
       <Icon className="w-3 h-3" />
       {config.label}
    </div>
  );
};

export default function ActiveOrders() {
  const [expandedId, setExpandedId] = useState<number | null>(253614); // Set first as expanded for demo
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellingOrder, setCancellingOrder] = useState<any>(null);

  const toggleAccordion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCancelClick = (order: any) => {
    setCancellingOrder(order);
    setShowCancelModal(true);
  };

  const orders = [
    { id: 253614, status: "Order Placed", date: "25 June, 2024" },
    { id: 253615, status: "Order Confirmed", date: "25 June, 2024" },
    { id: 253616, status: "Packed", date: "25 June, 2024" },
    { id: 253617, status: "Shipping", date: "25 June, 2024" },
    { id: 253618, status: "Completed", date: "25 June, 2024" },
  ];

  return (
    <div className="relative">
      <div className="bg-white rounded-[20px] p-8 shadow-sm border border-slate-100 min-h-full">
        <h1 className="text-xl font-bold text-slate-900 mb-8">Active Orders</h1>

        <div className="space-y-4 ">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col">
              <ZigzagSeparator />
              
              <div 
                className="flex items-center justify-between py-2 cursor-pointer group"
                onClick={() => toggleAccordion(order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-blue-500">
                    {expandedId === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-slate-900 leading-none">Order id: {order.id}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
                <span className="text-[11px] text-slate-500">Date: {order.date}</span>
              </div>

              {expandedId === order.id && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Products */}
                    <div className="lg:col-span-2 space-y-4">
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
                            {/* Using the same image for demo as in wishlist */}
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
                            <span className="text-slate-500">Sub Total</span>
                            <span className="font-bold text-slate-900">৳2,500.00</span>
                          </div>
                          <div className="flex justify-between w-64 text-[13px]">
                            <span className="text-slate-500">Discount</span>
                            <span className="font-bold text-slate-900">৳600.00</span>
                          </div>
                          <div className="flex justify-between w-64 text-[13px]">
                            <span className="text-slate-500">Tax</span>
                            <span className="font-bold text-slate-900">৳125.00</span>
                          </div>
                          <div className="flex justify-between w-64 text-[13px]">
                            <span className="text-slate-500">Delivery Charge</span>
                            <span className="font-bold text-slate-900">৳150.00</span>
                          </div>
                          <div className="flex justify-between w-64 text-[13px]">
                            <span className="text-slate-500">Express Delivery Charge</span>
                            <span className="font-bold text-slate-900">৳50.00</span>
                          </div>
                          <div className="flex justify-between w-64 mt-4 pt-4 border-t border-slate-100">
                            <span className="text-lg font-bold text-slate-900">Total</span>
                            <span className="text-lg font-bold text-slate-900">৳2,700.00</span>
                          </div>
                      </div>
                    </div>

                    {/* Right: Info Cards */}
                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-[#F8FAFC]/50 border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                        
                        <div className="space-y-6">
                          <div>
                            <h5 className="text-[13px] font-bold text-slate-900 mb-4">Billing to</h5>
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[13px] font-bold text-slate-600">MJ</div>
                              <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-slate-900">Mahmudul Jony</span>
                                <span className="text-[11px] text-slate-500">+8801738 552 616</span>
                                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">Kazipara H No.23, Road No. 12 - 19, Agargaon, Dhaka - North, Dhaka</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-[13px] font-bold text-slate-900 mb-4">Delivery to</h5>
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[13px] font-bold text-slate-600">ZK</div>
                              <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-slate-900">Zahir Khan</span>
                                <span className="text-[11px] text-slate-500">+8801738 552 616</span>
                                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">Kazipara H No.23, Road No. 12 - 19, Agargaon, Dhaka - North, Dhaka</p>
                              </div>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-slate-200 border-dashed">
                            <h5 className="text-[13px] font-bold text-slate-900 mb-4">Payment Details</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500">Payment Method</span>
                                <span className="font-bold text-slate-900">Online Payment</span>
                              </div>
                              <div className="flex justify-between text-[11px]">
                                <span className="text-slate-500">Payment Status</span>
                                <span className="flex items-center gap-1 font-bold text-[#38B2AC]">
                                  <CheckCircle2 className="w-3 h-3" /> Paid
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-6">
                              <button 
                                onClick={() => handleCancelClick(order)}
                                className="text-[12px] font-bold text-blue-600 hover:underline cursor-pointer"
                              >
                                Cancel Order
                              </button>
                              <p className="text-[10px] text-slate-400 mt-1">Checkout <span className="text-blue-500 underline cursor-pointer">cancelation policy</span> before order cancelation.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex gap-4 items-start max-w-sm w-full animate-in zoom-in-95 duration-200">
            <div className="bg-white rounded-[24px] p-8 shadow-2xl flex-1 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Confirm Cancelation</h2>
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[13px] font-bold text-slate-900"># Order id: {cancellingOrder?.id}</p>
                  <p className="text-[11px] text-slate-500">Date: {cancellingOrder?.date}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Payment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Payment Method</span>
                      <span className="font-bold text-slate-900">Online Payment</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Payment Status</span>
                      <span className="flex items-center gap-1 font-bold text-[#10B981]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full py-3.5 rounded-2xl bg-blue-50/60 text-blue-600 text-[13px] font-bold transition-all hover:bg-blue-100 active:scale-[0.98]"
                >
                  Cancel Order
                </button>
              </div>
            </div>

            {/* Close Button Box */}
            <button 
              onClick={() => setShowCancelModal(false)}
              className="mt-2 w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-lg border border-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
