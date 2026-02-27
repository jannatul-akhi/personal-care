"use client";

import React from "react";
import Image from "next/image";
import { Star, Loader2, MessageSquare, Clock } from "lucide-react";
import { useGetMyReviewsQuery } from "@/redux/api/review/reviewApi";
import { format } from "date-fns";

const ReviewsPage = () => {
    const { data: reviewsData, isLoading, isError } = useGetMyReviewsQuery();

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#168B86]" />
            </div>
        );
    }

    if (isError || !reviewsData) {
        return (
            <div className="flex h-[400px] flex-col items-center justify-center gap-4 text-gray-500">
                <MessageSquare className="h-12 w-12 opacity-20" />
                <p>Failed to load reviews or you haven't written any yet.</p>
            </div>
        );
    }

    const reviews = reviewsData.data || [];

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
            </div>

            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                        You haven't submitted any reviews yet.
                    </div>
                ) : (
                    reviews.map((review: any) => (
                        <div key={review.id} className="flex gap-4 p-4 rounded-xl border border-gray-50 hover:border-gray-100 transition-all">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                {review.product?.featuredImage ? (
                                    <Image
                                        src={review.product.featuredImage}
                                        alt={review.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 italic text-[10px]">No Image</div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold text-gray-900 truncate">
                                        {review.product?.name || "Unknown Product"}
                                    </h3>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                        <Clock className="w-3 h-3" />
                                        {format(new Date(review.createdAt), "MMM dd, yyyy")}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                                        />
                                    ))}
                                    <span className="text-xs font-medium text-gray-500 ml-1">{review.rating}/5</span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 italic">
                                    "{review.comment || "No comment provided."}"
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${review.isApproved ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                                        {review.isApproved ? "Approved" : "Pending Approval"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;
