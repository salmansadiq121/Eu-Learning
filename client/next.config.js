/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

module.exports = nextConfig;
