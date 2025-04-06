/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["github-readme-stats-eight-theta.vercel.app"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": require("path").resolve(__dirname, "styles"),
    };
    return config;
  },
};

module.exports = nextConfig;
