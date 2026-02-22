import { Play, Star, ArrowRight } from "lucide-react";

const videos = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=400&fit=crop",
    title: "Traditional Skincare Routine",
    duration: "5:30",
    views: "12K views",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=400&fit=crop",
    title: "Natural Beauty Tips",
    duration: "8:15",
    views: "8.5K views",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=400&fit=crop",
    title: "Daily Skincare Guide",
    duration: "6:45",
    views: "15K views",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=300&h=400&fit=crop",
    title: "Organic Product Review",
    duration: "4:20",
    views: "6K views",
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=400&fit=crop",
    title: "Healthy Glow Secrets",
    duration: "7:10",
    views: "10K views",
  },
];

export function VideoSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Best Approach to Use Our Product
          </h2>
          <p className="text-gray-600">Watch our expert guides and tutorials</p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${
                index === 2 ? "md:col-span-1 lg:row-span-1" : ""
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-gray-800 ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {video.duration}
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white text-sm font-medium mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-white/70 text-xs">{video.views}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Product Below Videos */}
        <div className="mt-10 bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop"
              alt="Featured Product"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-gray-400">| 2K Sold</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Healthy Glow Daily Face Cream
            </h3>
            <p className="text-green-600 font-bold">৳1640</p>
          </div>
          <button className="px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
            Shop Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
