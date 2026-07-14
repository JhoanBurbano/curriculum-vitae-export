import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/projects/plataforma-growth-inmobiliario",
        destination: "/projects/million-real-estate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
