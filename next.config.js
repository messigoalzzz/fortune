/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "game.cac.homes",
        pathname: "/game/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://game.cac.homes/api/:path*",
      },
    ]
    // Dev-only proxy to bypass CORS during local development.
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "https://game.cac.homes/api/:path*",
        },
      ]
    }
    return []
  },
}

module.exports = nextConfig
