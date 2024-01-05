/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'rijytzcvtfszqvbxesej.supabase.co',
      'd1fdloi71mui9q.cloudfront.net',
      'i.ibb.co',
      'imagedelivery.net',
      'server.mylinx.cc',
      'photos.mylinx.cc',
      'localhost:3002'
    ],
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
