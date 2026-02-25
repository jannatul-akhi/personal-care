"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, X, Upload, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";

const ReviewStarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={cn(
            "w-3.5 h-3.5",
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
          )} 
        />
      ))}
    </div>
  );
};

const InteractiveStars = ({ rating, hoverRating, onRatingClick, onRatingHover }: any) => {
    return (
        <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
               <Star 
                 key={star}
                 className={cn(
                    "w-10 h-10 cursor-pointer transition-all duration-150",
                    star <= (hoverRating || rating) ? "fill-[#FFCC00] text-[#FFCC00]" : "text-slate-200"
                 )}
                 onMouseEnter={() => onRatingHover(star)}
                 onMouseLeave={() => onRatingHover(0)}
                 onClick={() => onRatingClick(star)}
               />
            ))}
        </div>
    );
};

export default function Reviews() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeProduct, setActiveProduct] = useState<any>(null);
  
  // Form State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const reviews = [
    {
      id: 1,
      name: "Infinix Hot 60i 50 MP 128GB storage",
      storage: "256GB",
      color: "Blue",
      date: "Fri, 12 June, 2024",
      rating: 4,
      title: "Excellent product",
      comment: "Breakfast was satisfactory. There were also some other good restaurants nearby.. Distance from beach is okay. Cleaning was not satisfactory",
      hasReview: true,
      image: "/images/hero1.png"
    },
    {
      id: 2,
      name: "Infinix Hot 60i 50 MP 128GB storage",
      storage: "256GB",
      color: "Blue",
      hasReview: false,
      image: "/images/hero1.png"
    },
    {
      id: 3,
      name: "Infinix Hot 60i 50 MP 128GB storage",
      storage: "256GB",
      color: "Blue",
      hasReview: false,
      image: "/images/hero1.png"
    }
  ];

  const handleWriteReview = (product: any) => {
    setActiveProduct(product);
    setRating(0);
    setReviewText("");
    setIsSubmitted(false);
    setShowModal(true);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-sm border border-slate-100 min-h-full relative">
      <h1 className="text-xl font-bold text-slate-900 mb-8">Reviews</h1>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 rounded-[20px] border border-slate-100 bg-white hover:border-slate-200 transition-all">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                <Image src={review.image} alt="Product" fill className="object-contain p-2" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[13px] font-bold text-slate-900 leading-tight mb-1">{review.name}</h4>
                    <p className="text-[11px] text-slate-500 mb-2">Storage: {review.storage} Color: {review.color}</p>
                    
                    {review.hasReview ? (
                      <div className="space-y-2 mt-3 animate-in fade-in duration-300">
                        <p className="text-[11px] text-slate-400 font-medium">{review.date}</p>
                        <ReviewStarRating rating={review.rating || 0} />
                        <div className="space-y-1">
                          <h5 className="text-[12px] font-bold text-slate-900">{review.title}</h5>
                          <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <button 
                    onClick={() => handleWriteReview(review)}
                    className={cn(
                        "px-6 py-2 rounded-xl text-[12px] font-bold transition-all active:scale-[0.98]",
                        review.hasReview 
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100" 
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100"
                    )}
                  >
                    {review.hasReview ? "Edit Review" : "Write Review"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" onClick={() => setShowModal(false)} />
          
          <div className="relative w-full max-w-[480px] bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Close Button Inside but Floating */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
               /* Step 1: Form */
               <div className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Review</h2>
                  
                  {/* Product Header */}
                  {activeProduct && (
                    <div className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 bg-white mb-8">
                       <div className="relative w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                          <Image src={activeProduct.image} alt="Product" fill className="object-contain p-1.5" />
                       </div>
                       <div>
                          <h4 className="text-[13px] font-bold text-slate-900 leading-tight truncate max-w-[280px]">{activeProduct.name}</h4>
                          <p className="text-[11px] text-slate-500">Storage: {activeProduct.storage}  Color: {activeProduct.color}</p>
                       </div>
                    </div>
                  )}

                  {/* Rating Section */}
                  <div className="flex flex-col items-center gap-3 mb-8">
                     <p className="text-[14px] font-bold text-slate-700">How do you rate the product?</p>
                     <InteractiveStars 
                       rating={rating} 
                       hoverRating={hoverRating} 
                       onRatingClick={setRating} 
                       onRatingHover={setHoverRating} 
                     />
                  </div>

                  {/* Review Area */}
                  <div className="space-y-2 mb-6">
                     <label className="text-[13px] font-bold text-slate-800">Write Your Review</label>
                     <textarea 
                        className="w-full h-24 p-4 rounded-2xl border border-slate-100 bg-white text-[13px] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                        placeholder="Please share your opinion about the product..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                     />
                  </div>

                  {/* Upload Section */}
                  <div className="space-y-4 mb-8">
                     <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleImageChange}
                     />
                     <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-6 border-2 border-dashed border-slate-100 rounded-[20px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-slate-200 transition-colors group"
                     >
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                           <Upload className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-[12px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Click here to add photos & videos</p>
                     </div>

                     {/* Image Previews */}
                     {images.length > 0 && (
                        <div className="flex gap-2.5 overflow-hidden">
                           {images.map((img, idx) => (
                             <div key={idx} className="relative w-12 h-12 rounded-lg border border-slate-100 overflow-hidden shrink-0 group">
                                <Image src={img} alt="Preview" fill className="object-cover" />
                                <button 
                                  onClick={() => removeImage(idx)}
                                  className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-bl-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-2.5 h-2.5" />
                                </button>
                             </div>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-2xl bg-blue-600 text-white text-[14px] font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98]"
                  >
                    Submit Review
                  </button>
               </div>
            ) : (
               /* Step 2: Thank You */
               <div className="relative p-12 flex flex-col items-center text-center overflow-hidden min-h-[380px] justify-center">
                  {/* Confetti Background Placeholder (using a radial gradient pattern) */}
                  <div className="absolute inset-0 opacity-40 pointer-events-none" 
                    style={{ 
                      backgroundImage: "radial-gradient(circle, #fecaca 1px, transparent 1px), radial-gradient(circle, #bfdbfe 1px, transparent 1px), radial-gradient(circle, #bbf7d0 1px, transparent 1px)", 
                      backgroundSize: "20px 20px, 30px 30px, 25px 25px" 
                    }} 
                  />
                  
                  {/* Emoji Icon */}
                  <div className="relative w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-8 animate-bounce duration-1000">
                     <div className="w-14 h-14 relative">
                        {/* Simplified smiley using svg */}
                        <svg viewBox="0 0 24 24" fill="none" className="text-blue-600 w-full h-full stroke-[2]">
                           <rect x="3" y="3" width="18" height="18" rx="5" />
                           <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none" />
                           <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none" />
                           <path d="M8 15C8.82843 16.1716 10.3284 17 12 17C13.6716 17 15.1716 16.1716 16 15" stroke="currentColor" strokeLinecap="round" />
                        </svg>
                     </div>
                  </div>

                  <h3 className="text-[44px] font-bold text-blue-600 mb-4 tracking-tight leading-none" style={{ fontFamily: "serif", fontStyle: "italic" }}>Thank You</h3>
                  
                  <p className="text-[13px] font-bold text-blue-600 max-w-[280px] leading-relaxed">
                    We're glad you had a positive experience. We're always looking to improve
                  </p>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
