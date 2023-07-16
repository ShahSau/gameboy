/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['upload.wikimedia.org', 'www.freetogame.com', 'www.vhv.rs', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
