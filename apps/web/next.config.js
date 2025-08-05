/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ["@repo/ui"],
  images: {
    domains: [
      "localhost",
      "via.placeholder.com",
      "images.unsplash.com",
      "supabase.com",
      "amazonaws.com",
    ],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
