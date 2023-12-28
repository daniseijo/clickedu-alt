/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.clickedu.eu',
      },
    ],
  },
}

module.exports = nextConfig
