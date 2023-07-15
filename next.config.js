/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
    domains: ['upload.wikimedia.org','www.freetogame.com'],
  }
}

module.exports = nextConfig
