/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github-readme-stats-eight-theta.vercel.app",
        pathname: "/api/**",
      },
    ],
    dangerouslyAllowSVG: true,
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
