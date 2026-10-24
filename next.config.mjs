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
  async redirects() {
    return [
      // The "Partners" page was renamed to "Digital Businessbook".
      { source: "/partners", destination: "/digital_businessbook", permanent: true },
      { source: "/partner/:slug", destination: "/digital_businessbook/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
