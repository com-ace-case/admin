/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "community.akamai.steamstatic.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "community.cloudflare.steamstatic.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
