import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow mobile testing on local network
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '192.168.15.6:3000', '192.168.*.*:3000']
    }
  }
};

export default nextConfig;
