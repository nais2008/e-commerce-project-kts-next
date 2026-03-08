import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "front-school-strapi.ktsdev.ru",
      },
    ],
  },
}

export default nextConfig
