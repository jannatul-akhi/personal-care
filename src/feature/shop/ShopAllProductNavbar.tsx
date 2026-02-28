"use client";

import { useState, useEffect } from "react";
import {
  Home,
  ChevronRight,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { useGetCategoryTreeQuery } from "@/redux/api/category/categoryApi";

interface ShopAllProductNavbarProps {
  filters: {
    category?: string;
    categoryId?: string;
    subCategoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy: string;
    order: "asc" | "desc";
  };
  onFilterChange: (newFilters: any) => void;
  totalProducts?: number;
}

const filterOptions = [
  { id: "price", label: "Filter By Price" },
  { id: "category", label: "Category" },
  { id: "type", label: "Products Type" },
  { id: "rating", label: "Rating" },
];

const sortOptions = [
  { label: "Popularity", sortBy: "rating", order: "desc" },
  { label: "Newest", sortBy: "createdAt", order: "desc" },
  { label: "Price: Low to High", sortBy: "price", order: "asc" },
  { label: "Price: High to Low", sortBy: "price", order: "desc" },
];

export function ShopAllProductNavbar({
  filters,
  onFilterChange,
  totalProducts = 0,
}: ShopAllProductNavbarProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const { data: categoryResponse } = useGetCategoryTreeQuery();
  const categoryTree = categoryResponse?.data || [];

  const toggleTab = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  const handleSortChange = (option: (typeof sortOptions)[0]) => {
    onFilterChange({ sortBy: option.sortBy, order: option.order });
  };

  const currentSortLabel =
    sortOptions.find(
      (opt) => opt.sortBy === filters.sortBy && opt.order === filters.order,
    )?.label || "Popularity";

  const selectedCategory = Array.isArray(categoryTree)
    ? categoryTree.find((c: any) => c.id === filters.categoryId || c.slug === filters.category)
    : undefined;
  const productTypes = selectedCategory?.children || [];

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
              <span className="text-sm text-gray-600 font-medium">
                {totalProducts} Products
              </span>
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

            <div className="flex items-center gap-1 text-sm bg-gray-50/50 px-3 py-1.5 rounded-md relative group">
              <span className="text-gray-500 whitespace-nowrap">Sort By:</span>
              <button className="font-semibold text-gray-900 flex items-center gap-1 hover:text-gray-700 transition-colors">
                {currentSortLabel} <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-40 hidden group-hover:block p-2 min-w-[180px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSortChange(opt)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors font-medium text-gray-700"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {filterOptions.map((filter) => (
            <div key={filter.id} className="relative">
              <button
                onClick={() => toggleTab(filter.id)}
                disabled={filter.id === "type" && !filters.categoryId}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-300 font-serif font-bold text-[#1a1a1a] shadow-sm ${(filter.id === "type" && !filters.categoryId && !filters.category) ? "opacity-50 cursor-not-allowed bg-gray-50" :
                  activeTab === filter.id ||
                    (filter.id === "category" && (filters.categoryId || filters.category)) ||
                    (filter.id === "type" && filters.subCategoryId) ||
                    (filter.id === "rating" && filters.minRating)
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
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
                          value={filters.minPrice || ""}
                          onChange={(e) => {
                            onFilterChange({
                              minPrice: e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            });
                            setActiveTab(null);
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#4a6741]"
                          value={filters.maxPrice || ""}
                          onChange={(e) => {
                            onFilterChange({
                              maxPrice: e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            });
                            setActiveTab(null);
                          }}
                        />
                      </div>
                      <p className="text-[11px] font-bold text-gray-500">
                        Price Range: {filters.minPrice || 0} TK —{" "}
                        {filters.maxPrice || "Max"} TK
                      </p>
                    </div>
                  )}

                  {filter.id === "category" && (
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      <div
                        onClick={() => {
                          onFilterChange({ categoryId: undefined, category: undefined, subCategoryId: undefined });
                          setActiveTab(null);
                        }}
                        className={`flex items-center justify-between group cursor-pointer py-1 ${(!filters.categoryId && !filters.category) ? "text-[#4a6741]" : ""}`}
                      >
                        <span className="text-[14px] font-bold transition-colors">
                          All Categories
                        </span>
                      </div>
                      {categoryTree?.map((cat) => (
                        <div
                          key={cat.id}
                          onClick={() => {
                            onFilterChange({ categoryId: undefined, category: cat.slug, subCategoryId: undefined });
                            setActiveTab(null);
                          }}
                          className={`flex items-center justify-between group cursor-pointer py-1 ${filters.categoryId === cat.id || filters.category === cat.slug ? "text-[#4a6741]" : ""}`}
                        >
                          <span className="text-[14px] font-bold text-gray-600 group-hover:text-[#4a6741] transition-colors">
                            {cat.name}
                          </span>
                          <span className="text-[12px] font-semibold text-gray-400">
                            ({cat._count?.products || 0})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filter.id === "type" && (
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      <div
                        onClick={() => {
                          onFilterChange({ subCategoryId: undefined });
                          setActiveTab(null);
                        }}
                        className={`flex items-center justify-between group cursor-pointer py-1 ${!filters.subCategoryId ? "text-[#4a6741]" : ""}`}
                      >
                        <span className="text-[14px] font-bold transition-colors">
                          All Types
                        </span>
                      </div>
                      {productTypes.map((type) => (
                        <div
                          key={type.id}
                          onClick={() => {
                            onFilterChange({ subCategoryId: type.id });
                            setActiveTab(null);
                          }}
                          className={`flex items-center justify-between group cursor-pointer py-1 ${filters.subCategoryId === type.id ? "text-[#4a6741]" : ""}`}
                        >
                          <span className="text-[14px] font-bold text-gray-600 group-hover:text-[#4a6741] transition-colors">
                            {type.name}
                          </span>
                          {/* Subcategory counts might not be available in tree, but we'll show if they are */}
                        </div>
                      ))}
                    </div>
                  )}

                  {filter.id === "rating" && (
                    <div className="space-y-3">
                      <div
                        onClick={() => {
                          onFilterChange({ minRating: undefined });
                          setActiveTab(null);
                        }}
                        className={`flex items-center justify-between group cursor-pointer py-1 ${!filters.minRating ? "text-[#4a6741]" : ""}`}
                      >
                        <span className="text-[14px] font-bold transition-colors">
                          All Ratings
                        </span>
                      </div>
                      {[5, 4, 3, 2, 1].map((r) => (
                        <div
                          key={r}
                          onClick={() => {
                            onFilterChange({ minRating: r });
                            setActiveTab(null);
                          }}
                          className={`flex items-center justify-between group cursor-pointer py-1 ${filters.minRating === r ? "text-[#4a6741]" : ""}`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[14px] font-bold text-gray-600 group-hover:text-[#4a6741]">
                              {r}+
                            </span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${i < r ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-gray-200 text-gray-200"}`}
                                />
                              ))}
                            </div>
                          </div>
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
