/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "http://localhost:3000",
        "https://cantcheatwiththis.tech"
      ]
    }
  }
};

export default nextConfig;
