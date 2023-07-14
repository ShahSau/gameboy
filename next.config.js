/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
    domains: ['upload.wikimedia.org'],
  }
}

module.exports = nextConfig
