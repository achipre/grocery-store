/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: '192.168.100.6'
    }]
  }
};

export default nextConfig;
