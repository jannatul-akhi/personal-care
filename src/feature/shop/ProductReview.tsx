import React from "react";

const ProductReview = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Section: Ratings and Image Gallery */}
        <div className="space-y-8">
          {/* Rating Summary */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">4.6 out of 5</h2>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(5k+ Reviews)</span>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center space-x-2 transition-colors">
              <span>Write A Review</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {[
              { star: 5, count: 4000, percentage: 80 },
              { star: 4, count: 50, percentage: 1 },
              { star: 3, count: 800, percentage: 16 },
              { star: 2, count: 150, percentage: 3 },
              { star: 1, count: 0, percentage: 0 },
            ].map((item) => (
              <div key={item.star} className="flex items-center space-x-4">
                <div className="w-16 text-sm text-gray-600">
                  {item.star} Star
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.star >= 3 ? "bg-green-600" : "bg-gray-300"}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-gray-600 text-right">
                  {item.count.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Image Gallery
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((img) => (
                <div
                  key={img}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                >
                  <img
                    src={`https://picsum.photos/seed/${img}/300/300`}
                    alt={`Product image ${img}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Reviews */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
            <button className="text-gray-600 hover:text-gray-900 text-sm flex items-center space-x-1">
              <span>Top reviews</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Review Cards */}
          <div className="space-y-6">
            {[
              {
                name: "Eleanor Pena",
                avatar: "https://picsum.photos/seed/eleanor/100/100",
                rating: 4.5,
                date: "August 10, 2026",
                title: "Exactly as described",
                content:
                  "I'm really impressed with this cap. The fabric is soft yet durable, and the fit is adjustable, making it super comfortable. Highly recommended!",
                images: [1, 2],
              },
              {
                name: "Leslie Alexander",
                avatar: "https://picsum.photos/seed/leslie/100/100",
                rating: 4.5,
                date: "August 10, 2026",
                title: "Exactly as described",
                content:
                  "I'm really impressed with this cap. The fabric is soft yet durable, and the fit is adjustable, making it super comfortable. Highly recommended!",
                images: [],
              },
              {
                name: "Albert Flores",
                avatar: "https://picsum.photos/seed/albert/100/100",
                rating: 4.5,
                date: "August 10, 2026",
                title: "Exactly as described",
                content:
                  "I'm really impressed with this can. The fabric is soft vet durable, and the fit is",
                images: [],
              },
            ].map((review, index) => (
              <div key={index} className="border rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">
                          {review.name}
                        </span>
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <svg
                              key={star}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <div className="relative w-4 h-4">
                            <svg
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <div className="absolute top-0 left-0 w-2 h-4 bg-white"></div>
                          </div>
                          <span className="text-gray-600 text-sm">
                            ({review.rating})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{review.date}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{review.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{review.content}</p>
                </div>

                {review.images.length > 0 && (
                  <div className="flex space-x-2">
                    {review.images.map((img) => (
                      <div
                        key={img}
                        className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100"
                      >
                        <img
                          src={`https://picsum.photos/seed/review${img}/100/100`}
                          alt="Review image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
