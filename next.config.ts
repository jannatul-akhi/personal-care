import type { NextConfig } from "next";

const isProd = process.env.NEXT_PUBLIC_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames
      },
      {
        protocol: "http",
        hostname: "**", // Allows all hostnames
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      (isProd
        ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV) ||
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SOCKET_URL:
      (isProd
        ? process.env.NEXT_PUBLIC_SOCKET_URL
        : process.env.NEXT_PUBLIC_SOCKET_URL_DEV) ||
      process.env.NEXT_PUBLIC_SOCKET_URL,
    NEXT_PUBLIC_URL:
      (isProd
        ? process.env.NEXT_PUBLIC_URL
        : process.env.NEXT_PUBLIC_URL_DEV) || process.env.NEXT_PUBLIC_URL,
  },
};

export default nextConfig;
