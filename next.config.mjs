/** @type {import('next').NextConfig} */
const nextConfig = {
   async headers() {
    return [
      {
        source: '/:path*',
        headers: [
         {
           key: 'Content-Security-Policy',
           value: "upgrade-insecure-requests"
         }
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
