/** @type {import('next').NextConfig} */


module.exports = {
  images: {
    remotePatterns: [
      { 
        protocol: 'https',
        hostname: 'cdn.sanity.io'
       },
    ],
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
}
