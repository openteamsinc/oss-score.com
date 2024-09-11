/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ["duckdb"],
  experimental: {
    outputFileTracingIncludes: {
      "/*+": "public",
    },
  },
};

export default nextConfig;
