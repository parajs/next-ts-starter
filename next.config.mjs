/** @type {import('next').NextConfig} */

import NextBundleAnalyzer from "@next/bundle-analyzer";
const nextConfig = {
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/api",
  //         destination: "http://192.168.8.31:8080",
  //       },
  //     ];
  //   },
  output: "export",
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
};

export default process.env.ANALYZE === "true"
  ? NextBundleAnalyzer(nextConfig)
  : nextConfig;
