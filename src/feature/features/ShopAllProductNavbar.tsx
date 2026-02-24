"use client";

import { useState } from "react";
import { 
  Home, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  ChevronUp,
  Star 
} from "lucide-react";

const filters = [
  { id: "price", label: "Filter By Price" },
  { id: "category", label: "Category" },
  { id: "brands", label: "Brands" },
  { id: "type", label: "Products Type" },
  { id: "rating", label: "Rating" },
];

const categories = [
  { name: "Skin Care", count: 14 },
  { name: "Body Care", count: 8 },
  { name: "Fragrances", count: 8 },
  { name: "Make Up", count: 8 },
  { name: "Lip Care", count: 8 },
];

const brands = [
  { name: "L'Oréal Paris", count: 14 },
  { name: "Maybelline New York", count: 8 },
  { name: "MAC Cosmetics", count: 8 },
  { name: "Dior Beauty", count: 8 },
  { name: "Fenty Beauty", count: 8 },
  { name: "NYX Professional Makeup", count: 8 },
];

const productTypes = [
  { name: "Face Wash", count: 14 },
  { name: "Cleanser", count: 8 },
  { name: "Toner", count: 8 },
  { name: "Moisturizer", count: 8 },
  { name: "Face Serum", count: 8 },
];

export function ShopAllProductNavbar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const toggleTab = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  return (
    <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col gap-6">
        
        {/* Breadcrumbs & Top Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Home className="w-4 h-4" />
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Shop Page</span>
          </nav>

          {/* Product Info Bar */}
          <div className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3 bg-white shadow-sm flex-1 lg:max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">20 Products</span>
              <div className="h-4 w-[1px] bg-gray-200" />
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setView("grid")}
                  className={`p-1 rounded transition-colors ${view === "grid" ? "text-gray-900 bg-gray-100" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setView("list")}
                  className={`p-1 rounded transition-colors ${view === "list" ? "text-gray-900 bg-gray-100" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm bg-gray-50/50 px-3 py-1.5 rounded-md">
              <span className="text-gray-500 whitespace-nowrap">Sort By:</span>
              <button className="font-semibold text-gray-900 flex items-center gap-1 hover:text-gray-700 transition-colors">
                Popularity <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filters.map((filter) => (
            <div key={filter.id} className="relative">
              <button
                onClick={() => toggleTab(filter.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-300 font-serif font-bold text-[#1a1a1a] shadow-sm ${
                  activeTab === filter.id 
                    ? "bg-[#f3f4f0] border-[#4a6741] ring-2 ring-[#4a6741]/10" 
                    : "bg-[#f3f4f0] border-transparent hover:border-gray-300"
                }`}
              >
                <span className="text-[15px]">{filter.label}</span>
                {activeTab === filter.id ? (
                  <ChevronUp className="w-4 h-4 text-[#4a6741]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {/* Dropdown Content */}
              {activeTab === filter.id && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-30 p-5 min-w-[220px] animate-in fade-in slide-in-from-top-2 duration-200">
                  {filter.id === "price" && (
                    <div className="space-y-4">
                      <div className="px-1 py-3">
                        <div className="relative h-1.5 bg-gray-100 rounded-full">
                          <div className="absolute left-[20%] right-[30%] h-full bg-red-500 rounded-full" />
                          <div className="absolute left-[20%] -top-1.5 w-4.5 h-4.5 bg-red-600 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform" />
                          <div className="absolute right-[30%] -top-1.5 w-4.5 h-4.5 bg-red-600 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      <p className="text-[13px] font-bold text-gray-800">
                        Price: <span className="text-gray-900 font-extrabold ml-1">9,170 TK — 19,230 TK</span>
                      </p>
                    </div>
                  )}

                  {filter.id === "category" && (
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      {categories.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between group cursor-pointer py-1">
                          <span className="text-[14px] font-bold text-gray-600 group-hover:text-[#4a6741] transition-colors">{cat.name}</span>
                          <span className="text-[12px] font-semibold text-gray-400">({cat.count})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filter.id === "brands" && (
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      {brands.map((brand) => (
                        <div key={brand.name} className="flex items-center justify-between group cursor-pointer py-1">
                          <span className="text-[14px] font-bold text-gray-600 group-hover:text-[#4a6741] transition-colors">{brand.name}</span>
                          <span className="text-[12px] font-semibold text-gray-400">({brand.count})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filter.id === "type" && (
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      {productTypes.map((type) => (
                        <div key={type.name} className="flex items-center justify-between group cursor-pointer py-1">
                          <span className="text-[14px] font-bold text-gray-600 group-hover:text-[#4a6741] transition-colors">{type.name}</span>
                          <span className="text-[12px] font-semibold text-gray-400">({type.count})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filter.id === "rating" && (
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((r) => (
                        <div key={r} className="flex items-center justify-between group cursor-pointer py-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[14px] font-bold text-gray-600 group-hover:text-[#4a6741]">{r}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3.5 h-3.5 ${i < r ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-gray-200 text-gray-200"}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-[12px] font-semibold text-gray-400">({r * 3 + 4})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9f9f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d0d0d0;
        }
      `}</style>
    </div>
  );
}
