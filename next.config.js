/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Important for Render.com deployment
  output: 'standalone',
  
  // Image optimization settings
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true
  },

  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
}

module.exports = nextConfig
