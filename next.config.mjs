/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel's image optimizer returned 402 (quota exceeded), which broke every next/image.
    // Serve the original Supabase Storage URLs directly instead.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
