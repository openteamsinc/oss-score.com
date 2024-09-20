/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx";

const nextConfig = {
  serverExternalPackages: ["duckdb"],
  pageExtensions: ["mdx", "tsx", "ts"],
  experimental: {
    outputFileTracingIncludes: {
      "/**": ["./public/**"],
    },
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
