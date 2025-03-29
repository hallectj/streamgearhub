/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com', 
      'pbs.twimg.com', 
      'static.wikia.nocookie.net', 
      'localhost',
      'm.media-amazon.com'  // Add Amazon's media domain
    ],
  }
}

export default nextConfig;