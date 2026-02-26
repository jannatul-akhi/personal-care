export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: number;
  discountPrice: number;
  stock: number;
  sku: string;
  images: string[];
  featuredImage: string | null;
  isFeatured: boolean;
  isNewArrival: boolean;
  status: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
  _count: {
    reviews: number;
  };
  avgRating?: number;
  reviewCount?: number;
  totalReviews?: number;
  reviews?: Review[];
  ratingBreakdown?: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ProductApiResponse {
  success: boolean;
  message: string;
  meta: {
    requestId: string;
    timestamp: string;
    pagination?: Pagination;
  };
  data: Product[];
}
