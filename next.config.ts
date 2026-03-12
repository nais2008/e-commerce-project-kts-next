import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "front-school.minio.ktsdev.ru",
      },
      {
        protocol: "https",
        hostname: "media.tenor.com",
      },
    ],
  },
}

export default nextConfig
