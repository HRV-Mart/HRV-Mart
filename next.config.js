/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.the-house.com",
      "couturepictures.com",
      "external-content.duckduckgo.com"
    ]
  }
}

module.exports = nextConfig
