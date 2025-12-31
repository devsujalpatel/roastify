import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "https://confidently-audiometric-shana.ngrok-free.dev",
  ],
};

export default nextConfig;
