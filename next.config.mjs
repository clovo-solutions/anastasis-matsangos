/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // PLACEHOLDER IMAGERY — see README.md.
    // Unsplash is referenced only so the build renders with real photography.
    // Replace with first-party assets (or your own CDN) before launch and
    // drop this remotePatterns entry.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
