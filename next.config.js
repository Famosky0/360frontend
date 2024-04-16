/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;