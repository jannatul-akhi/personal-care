"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, X, Camera, Loader2, CheckCircle2 } from "lucide-react";
import { useSubmitReviewMutation } from "@/redux/api/review/reviewApi";
import { toast } from "sonner";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: string;
        name: string;
        featuredImage?: string | null;
        storage?: string;
        color?: string;
    };
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, product }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitReview, { isLoading }] = useSubmitReviewMutation();

    if (!isOpen) return null;

    const handleStarClick = (num: number) => setRating(num);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setImages(prev => [...prev, ...newFiles].slice(0, 5)); // Limit to 5
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please select a rating.");
            return;
        }

        try {
            // Ideally we'd upload images to a storage service first and get URLs
            // For now, let's assume URLs or just text submit as image upload isn't fully mocked
            await submitReview({
                productId: product.id,
                rating,
                comment,
                images: [], // Placeholder for actual image URLs
            }).unwrap();
            setIsSubmitted(true);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to submit review.");
        }
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative p-8 text-center animate-in fade-in zoom-in duration-300">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-10 h-10 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                        <p className="text-gray-500 mb-8 max-w-[280px]">
                            We're glad you had a positive experience. We're always looking to improve.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                        >
                            Close
                        </button>
                    </div>
                    {/* Abstract background shapes could be added here for fidelity */}
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Review</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Product Summary */}
                    <div className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                            {product.featuredImage ? (
                                <Image src={product.featuredImage} alt={product.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-gray-900 truncate text-sm">{product.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Storage: {product.storage || "N/A"} &nbsp; Color: {product.color || "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-700 mb-4">How do you rate the product?</p>
                        <div className="flex items-center justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => handleStarClick(num)}
                                    className="p-1 transition-transform hover:scale-110 active:scale-95"
                                >
                                    <Star
                                        className={`w-8 h-8 ${num <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Write Your Review</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Please share your opinion about the product..."
                            className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all resize-none text-sm placeholder:text-gray-400"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-3">
                        <div
                            className="relative group border-2 border-dashed border-gray-200 rounded-2xl p-6 transition-all hover:bg-gray-50 hover:border-blue-400 cursor-pointer text-center"
                            onClick={() => document.getElementById('review-images')?.click()}
                        >
                            <input
                                id="review-images"
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <div className="flex flex-col items-center gap-1">
                                <Camera className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <span className="text-xs font-medium text-gray-500">Click here to add photos & videos</span>
                            </div>
                        </div>

                        {/* Previews */}
                        {images.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {images.map((file, idx) => (
                                    <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-100 group">
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                            className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || rating === 0}
                        className="w-full py-4 bg-blue-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                    >
                        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
