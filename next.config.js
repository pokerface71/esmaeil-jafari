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
  turbopack: {
    resolveAlias: {
      "@styles": "./styles",
    },
  },
};

module.exports = nextConfig;