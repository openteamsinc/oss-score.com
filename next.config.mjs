/** @type {import('next').NextConfig} */

const nextConfig = {
  serverExternalPackages: ["duckdb"],
  serverRuntimeConfig: {
    PROJECT_ROOT: process.cwd(),
  },
};

export default nextConfig;
